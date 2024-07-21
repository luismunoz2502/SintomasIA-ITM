require('dotenv').config();
const { Deepgram } = require('@deepgram/sdk');
const deepgram = new Deepgram(process.env.DG_KEY);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3008 });

wss.on('connection', (ws, req) => {
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const language = urlParams.get('language') || 'es'; // Por defecto a español si no se especifica

  const deepgramLive = deepgram.transcription.live({
    interim_results: true,
    punctuate: false,
    endpointing: true,
    vad_turnoff: 200,
    language: language, // Usar el idioma seleccionado
  });

  let deepgramOpenPromise = new Promise((resolve) => {
    deepgramLive.addListener('open', () => {
      console.log('Deepgram connection opened');
      resolve();
    });
  });

  deepgramLive.addListener('error', (error) => console.log({ error }));

  ws.onmessage = (event) => {
    deepgramOpenPromise.then(() => {
      deepgramLive.send(event.data);
    }).catch(err => {
      console.error('Failed to send message:', err);
    });
  };

  ws.onclose = () => {
    deepgramOpenPromise.then(() => {
      deepgramLive.finish();
    }).catch(err => {
      console.error('Failed to finish Deepgram connection:', err);
    });
  };

  deepgramLive.addListener('transcriptReceived', (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    } else {
      console.error('Cannot send transcript, WebSocket connection is not open');
    }
  });
});
