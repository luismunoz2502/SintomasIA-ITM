const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { submittedText } = req.body;

  // Verificación de la API Key
  const apiKey = process.env.CHATGPT_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key de OpenAI no encontrada. Verifica que la variable de entorno CHATGPT_API_KEY esté configurada.' });
  }

  // Validación de la entrada
  if (!submittedText || typeof submittedText !== 'string') {
    return res.status(400).json({ error: 'El texto enviado es inválido. Debe ser una cadena de texto.' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: submittedText }],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error en la solicitud a OpenAI: ${errorText}`);
      throw new Error(`Error en la solicitud a OpenAI: ${errorText}`);
    }

    const data = await response.json();

    // Verifica si la respuesta tiene el formato esperado
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      return res.status(500).json({ error: 'La respuesta de OpenAI no contiene el formato esperado.' });
    }

    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Error en la ruta /api/chatgpt:', error);

    const errorMessage = error.message.includes('insufficient_quota')
        ? 'Has excedido tu cuota actual de uso. Por favor, revisa tu plan y detalles de facturación en OpenAI.'
        : 'Hubo un error en la solicitud a OpenAI. Por favor, intenta de nuevo más tarde.';
    
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;