import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import './Welcome.css';

export default function Welcome() {
  const [currentInput, setCurrentInput] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const imageUrl = 'https://appian.com/adobe/dynamicmedia/deliver/dm-aid--e21c4555-e474-4ef6-bbb2-293bfb50eca0/logo-dfx5.png?preferwebp=true&width=1200&quality=85';

  const activateMicrophone = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        if (!MediaRecorder.isTypeSupported('audio/webm')) {
          return alert('Browser not supported');
        }

        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;

        const socket = new WebSocket('ws://localhost:3008');
        socket.onopen = () => {
          mediaRecorder.addEventListener('dataavailable', (event) => {
            if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
              socket.send(event.data);
            }
          });
          mediaRecorder.start(2000);
          setIsRecording(true);
        };

        socket.onmessage = (message) => {
          try {
            const received = JSON.parse(message.data);
            const transcripts = received.channel.alternatives;

            if (transcripts && transcripts.length > 0) {
              const bestTranscript = transcripts[0].transcript;
              setCurrentInput(bestTranscript);
            }
          } catch (error) {
            console.error('Error processing WebSocket message:', error);
          }
        };

        socket.onclose = () => {
          console.log('WebSocket connection closed');
          setIsRecording(false);
        };

        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          setIsRecording(false);
        };

        socketRef.current = socket;
      })
      .catch((error) => {
        console.error('Error accessing the microphone:', error);
      });
  };

  const deactivateMicrophone = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (socketRef.current) {
      socketRef.current.close();
    }
    setIsRecording(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedText(currentInput); // Muestra el texto en grande
    setCurrentInput(''); // Limpia el cuadro de texto
  };

  return (
    <div className="welcome-container">
      <nav className="navbar">
        <div className="logo">
          <img src={imageUrl} alt="Logo DFX5" />
        </div>
        <div className="user-info">
          <span>Bienvenido</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="container">
        <div className="chat">
          <div className="chat-header">
            <h2>Transcripciones</h2>
          </div>
          <div className="chat-body">
            <div className="input-box">
              <textarea
                className='journal-input'
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Di algo..."
                disabled={isRecording}
              />
              <button
                type='submit'
                className='submit-button'
                onClick={handleSubmit}
                disabled={!currentInput}
              >
                Submit
              </button>
            </div>
            {submittedText && (
              <div className="transcription-box">
                <h1 className="transcription-text">{submittedText}</h1>
              </div>
            )}
          </div>
          <div className="chat-footer">
            {!isRecording ? (
              <button onClick={activateMicrophone} className="microphone-button">
                Activar Micrófono
              </button>
            ) : (
              <button onClick={deactivateMicrophone} className="microphone-button">
                Desactivar Micrófono
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
