const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define el esquema del historial de chat
const chatSchema = new mongoose.Schema({
  userId: String,
  messages: [{
    text: String,
    type: String, // 'user' o 'chatgpt'
    timestamp: { type: Date, default: Date.now }
  }]
});

const ChatHistory = mongoose.model('ChatHistory', chatSchema);

// Ruta para guardar el historial de chat
router.post('/save', async (req, res) => {
  const { userId, messages } = req.body;

  try {
    let chatHistory = await ChatHistory.findOne({ userId });

    if (chatHistory) {
      chatHistory.messages = [...chatHistory.messages, ...messages];
    } else {
      chatHistory = new ChatHistory({ userId, messages });
    }

    await chatHistory.save();
    res.status(200).json({ message: 'Historial de chat guardado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el historial de chat:', error);
    res.status(500).json({ error: 'Error al guardar el historial de chat' });
  }
});

// Ruta para obtener el historial de chat
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const chatHistory = await ChatHistory.findOne({ userId });

    if (!chatHistory) {
      return res.status(404).json({ error: 'Historial de chat no encontrado' });
    }

    res.status(200).json(chatHistory);
  } catch (error) {
    console.error('Error al obtener el historial de chat:', error);
    res.status(500).json({ error: 'Error al obtener el historial de chat' });
  }
});

module.exports = router;
