require('dotenv').config();
const { Deepgram } = require('@deepgram/sdk');
const WebSocket = require('ws');

const deepgram = new Deepgram(process.env.DG_KEY);
const wss = new WebSocket.Server({ port: 3008 });

wss.on('connection', (ws) => {
  const connection = deepgram.transcription.live({
    punctuate: true,
    interim_results: true,
    vad_turnoff: 200, // Ajuste recomendado para VAD
  });

  connection.on('open', () => {
    console.log('Deepgram connection opened');
  });

  connection.on('transcriptReceived', (data) => {
    if (data && data.channel && data.channel.alternatives[0]) {
      const transcript = data.channel.alternatives[0].transcript;
      if (transcript) {
        ws.send(JSON.stringify({ transcript }));
      }
    }
  });

  connection.on('error', (error) => {
    console.error('Deepgram connection error:', error);
  });

  ws.on('message', (message) => {
    connection.send(message);
  });

  ws.on('close', () => {
    connection.finish();
  });
});

console.log(`WebSocket server running on ws://localhost:3008`);
