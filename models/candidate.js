const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  partyName: { 
    type: String, 
    required: true,
    validate: {
      validator: function(value) {
        return /^[A-Za-z\s]+$/.test(value);
      },
      message: 'Party name must contain only alphabetic characters and spaces.'
    }
  },
  age: { type: Number, required: true },
 
  partySymbol: { type: String, required: true },
  
    candidateId: { 
      type: String, 
      required: true, 
      unique: true,
      validate: {
        validator: function(value) {
          return /^\d{5}$/.test(value); // 5-digit validation
        },
        message: 'Candidate ID must be a 5-digit number.'
      }
    },
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;

