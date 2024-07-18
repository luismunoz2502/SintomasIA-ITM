import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import './Welcome.css';
import { API_URL } from '../../auth/constants';

export default function Welcome() {
  const [currentInput, setCurrentInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const imageUrl = 'https://appian.com/adobe/dynamicmedia/deliver/dm-aid--e21c4555-e474-4ef6-bbb2-293bfb50eca0/logo-dfx5.png?preferwebp=true&width=1200&quality=85';

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/chatHistory/${user.username}`)
        .then(response => response.json())
        .then(data => setMessages(data.messages || []))
        .catch(error => console.error('Error fetching chat history:', error));
    }
  }, [user]);

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
          console.log('Received WebSocket message:', message.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentInput.trim()) return;
  
    const newMessage = {
      text: currentInput,
      type: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
  
    setMessages(prevMessages => [...prevMessages, newMessage]);
  
    try {
      const response = await fetch(`${API_URL}/chatgpt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submittedText: currentInput }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const chatGPTMessage = {
        text: data.response,
        type: 'chatgpt',
        timestamp: new Date().toLocaleTimeString()
      };
  
      setMessages(prevMessages => [...prevMessages, chatGPTMessage]);
  
      await fetch(`${API_URL}/chatHistory/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, messages: [newMessage, chatGPTMessage] }),
      });
    } catch (error) {
      console.error('Error fetching ChatGPT response:', error);
    }
  
    setCurrentInput('');
  };
  
  return (
    <div className="welcome-container">
      <nav className="navbar">
        <div className="logo">
          <img src={imageUrl} alt="Logo DFX5" />
        </div>
        <div className="user-info">
          <span>Welcome, {user?.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="container">
        <div className="chat">
          <div className="chat-header">
            <h2>Transcripts</h2>
          </div>
          <div className="chat-body">
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.type}-message`}
                >
                  <p>{msg.text}</p>
                  <small>{msg.timestamp}</small>
                </div>
              ))}
            </div>
            <div className="input-box">
              <textarea
                className='journal-input'
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Say something..."
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
          </div>
          <div className="chat-footer">
            {!isRecording ? (
              <button onClick={activateMicrophone} className="microphone-button">
                Activate Microphone
              </button>
            ) : (
              <button onClick={deactivateMicrophone} className="microphone-button">
                Disable Microphone
              </button>
            )}
          </div>
        </div>
        <div className="sidebar">
          <h5>Chat History</h5>
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className={`message ${msg.type}-message`}>
                <p>{msg.text}</p>
                <small>{msg.timestamp}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
