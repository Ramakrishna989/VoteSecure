const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  eciId: { type: String, required: true, unique: true },
  aadharId: { type: String, required: true ,unique: true},
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
