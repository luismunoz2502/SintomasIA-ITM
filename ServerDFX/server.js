require('dotenv').config();
const { Deepgram } = require('@deepgram/sdk');
const deepgram = new Deepgram(process.env.DG_KEY);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3008 });

wss.on('connection', (ws, req) => {
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const language = urlParams.get('language') || 'en'; 
  

  const deepgramLive = deepgram.transcription.live({
    interim_results: true,
    punctuate: false,
    endpointing: true,
    vad_turnoff: 200,
    language: language, // Usar el idioma seleccionado
  });

  deepgramLive.addListener('open', () => console.log('Deepgram connection opened'));

  deepgramLive.addListener('error', (error) => console.log({ error }));

  ws.onmessage = (event) => deepgramLive.send(event.data);

  ws.onclose = () => deepgramLive.finish();

  deepgramLive.addListener('transcriptReceived', (data) => ws.send(data));
});
