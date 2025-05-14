import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["votingSystemuser"]
users = db["users"]

@app.route('/')
def index():
    return render_template("register.html")

def is_face_duplicate(new_encoding, existing_encodings):
    for enc in existing_encodings:
        known = np.array(enc)
        unknown = np.array(new_encoding)
        # Handle the case when the encoding array is empty
        if known.size == 0 or unknown.size == 0:
            continue
        distance = np.linalg.norm(known - unknown)
        if distance < 0.6:  # Threshold for face match (can adjust slightly)
            return True
    return False

@app.route('/register-face', methods=['POST'])
def register_face():
    data = request.get_json()
    user_id = data.get("userId")
    encoding = data.get("encoding")

    if not user_id or not encoding:
        return jsonify({"message": "Missing data"}), 400

    # Ensure encoding is of correct shape
    if len(encoding) != 128:
        return jsonify({"message": "Invalid face encoding data"}), 400

    try:
        # Get user and check if they already have a face encoding
        user = users.find_one({"_id": ObjectId(user_id)})

        if not user:
            return jsonify({"message": "User not found"}), 404

        existing_encoding = user.get("faceEncoding", [])

        # Check for duplicates if the user has no existing encoding
        if not existing_encoding:
            existing_users = users.find({"faceEncoding": {"$exists": True}})
            for existing_user in existing_users:
                # Compare the new face encoding with all existing ones
                known_encoding = np.array(existing_user["faceEncoding"])
                if known_encoding.size == 0:
                    continue
                distance = np.linalg.norm(known_encoding - np.array(encoding))
                if distance < 0.6:  # Threshold for matching faces
                    return jsonify({"message": "This face is already registered with another voter ID!"}), 409

            # No duplicates found, proceed with storing the face encoding
            result = users.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"faceEncoding": encoding}}
            )
        else:
            # If user already has a face encoding, compare with other users to check for duplicates
            existing_users = users.find({"faceEncoding": {"$exists": True}})
            for existing_user in existing_users:
                if str(existing_user["_id"]) != str(user_id):  # Skip checking the current user
                    known_encoding = np.array(existing_user["faceEncoding"])
                    if known_encoding.size == 0:
                        continue
                    distance = np.linalg.norm(known_encoding - np.array(encoding))
                    if distance < 0.6:  # Threshold for matching faces
                        return jsonify({"message": "This face is already registered with another voter ID!"}), 409

            # If no duplicate, update the existing user's face encoding
            result = users.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"faceEncoding": encoding}}
            )

        if result.matched_count == 0:
            return jsonify({"message": "User not found"}), 404

        return jsonify({"message": "Face encoding registered successfully!"})

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 400

@app.route('/verify-face')
def verify_page():
    return render_template("verify.html")

@app.route('/verify-face', methods=['POST'])
def verify_face():
    data = request.get_json()
    voter_id = data.get("voterId")
    election_id = data.get("electionId")
    encoding = data.get("encoding")

    if not voter_id or not election_id or not encoding:
        return jsonify({"success": False, "message": "Missing data"}), 400

    try:
        user = users.find_one({"voterId": voter_id})
        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404

        # Compare face encodings
        stored_encoding = user.get("faceEncoding", [])
        if not stored_encoding:
            return jsonify({"success": False, "message": "No face registered"}), 403

        if len(stored_encoding) == 0 or len(encoding) == 0:
            return jsonify({"success": False, "message": "Face encoding is invalid"}), 400

        distance = np.linalg.norm(np.array(encoding) - np.array(stored_encoding))
        if distance > 0.6:
            return jsonify({"success": False, "message": "Face does not match"}), 401

        # Check if already voted in this election
        votes = user.get("votes", [])
        already_voted = any(vote.get("electionId") == ObjectId(election_id) for vote in votes)

        if already_voted:
            return jsonify({"success": False, "message": "You have already voted in this election"}), 403

        # If all conditions are met, allow the user to vote
        return jsonify({"success": True, "message": "Verification successful"})

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
