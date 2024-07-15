// routes/transcribe.js
const express = require("express");
const router = express.Router();
const { createClient, LiveTranscriptionEvents } = require("@deepgram/sdk");
const dotenv = require("dotenv");

dotenv.config();

const deepgramClient = createClient(process.env.DEEPGRAM_API_KEY);
let deepgram;

const setupDeepgram = () => {
  if (!deepgram) {
    deepgram = deepgramClient.listen.live({
      language: "en",
      punctuate: true,
      smart_format: true,
      model: "nova",
    });

    deepgram.addListener(LiveTranscriptionEvents.Open, async () => {
      console.log("Deepgram connected");
    });

    deepgram.addListener(LiveTranscriptionEvents.Transcript, (data) => {
      console.log("Deepgram transcript:", data);
    });

    deepgram.addListener(LiveTranscriptionEvents.Close, async () => {
      console.log("Deepgram disconnected");
      deepgram.finish();
      deepgram = null;
    });

    deepgram.addListener(LiveTranscriptionEvents.Error, async (error) => {
      console.error("Deepgram error:", error);
    });

    deepgram.addListener(LiveTranscriptionEvents.Warning, async (warning) => {
      console.warn("Deepgram warning:", warning);
    });
  }

  return deepgram;
};

router.post("/start", async (req, res) => {
  const { ws } = req.body;

  if (!ws) {
    return res.status(400).json({ error: "WebSocket connection not provided" });
  }

  const client = setupDeepgram();
  client.send("start"); // Example: Sending a start signal to Deepgram

  res.status(200).json({ message: "Transcription started" });
});

router.post("/stop", async (req, res) => {
  const { ws } = req.body;

  if (!ws) {
    return res.status(400).json({ error: "WebSocket connection not provided" });
  }

  const client = setupDeepgram();
  client.send("stop"); // Example: Sending a stop signal to Deepgram

  res.status(200).json({ message: "Transcription stopped" });
});

module.exports = router;
