const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  messages: [{
    text: String,
    type: String,
    timestamp: Date
  }]
});
chatHistorySchema.index({ username: 1 });
module.exports = mongoose.model('ChatHistory', chatHistorySchema);