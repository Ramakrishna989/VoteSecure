const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/
  },
  voterId: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    minlength: 10,
  },
  age: {
    type: Number,
    required: true,
    min: 20,
    max: 100
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 15
  },
  faceEncoding: {
    type: [Number], // 128-length face encoding from Python
    default: []
  },
  votes: [
    {
      electionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
      candidateId: { type: String }
    }
  ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
