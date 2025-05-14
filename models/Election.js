const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  electionName: {
    type: String,
    required: true,
  },
  electionType: {
    type: String,
    required: true,
    enum: ['PM', 'CM', 'MLA'], // Valid election types
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  candidates: [
    {
      candidateName: String,
      partyName: String,
      age: Number,
      partySymbol: String,
      candidateId: String,
    }
  ],
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming',
  },
});

const Election = mongoose.model('Election', electionSchema);
module.exports = Election;
