const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  messages: [String] // Mensajes almacenados como cadenas de texto
});

chatHistorySchema.index({ username: 1 });

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
