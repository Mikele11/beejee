var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    match: /^.{1,200}$/
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  tasktext: String,
  maked: Boolean,
});

module.exports = mongoose.model('Task', TaskSchema);