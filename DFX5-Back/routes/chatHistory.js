const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/chatHistory');

// Ruta para guardar el historial de chat
router.post('/save', async (req, res) => {
  const { username, messages } = req.body;

  console.log('Datos recibidos para guardar:', { username, messages });

  try {
    let chatHistory = await ChatHistory.findOne({ username });

    if (chatHistory) {
      // Solo agregar mensajes nuevos
      const newMessages = messages.filter(
        msg => !chatHistory.messages.includes(msg)
      );
      chatHistory.messages.push(...newMessages); 
    } else {
      // Crea un nuevo historial de chat
      chatHistory = new ChatHistory({
        username,
        messages
      });
    }

    await chatHistory.save();
    res.status(200).json({ message: 'Historial de chat guardado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el historial de chat:', error);
    res.status(500).json({ error: 'Error al guardar el historial de chat' });
  }
});

// Ruta para obtener el historial de chat
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  console.log('Buscando historial de chat para el usuario:', username);

  try {
    const chatHistory = await ChatHistory.findOne({ username });

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
