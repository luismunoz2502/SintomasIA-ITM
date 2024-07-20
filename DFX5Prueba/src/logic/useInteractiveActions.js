import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../config";

export const useInteractiveActions = () => {
    const [currentInput, setCurrentInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const socketRef = useRef(null);
    const mediaRecorderRef = useRef(null);

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
    
      const newMessage = { text: currentInput, type: 'user', timestamp: new Date().toISOString() };
    
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
        const chatGPTMessage = { text: data.response, type: 'chatgpt', timestamp: new Date().toISOString() };
    
        // Solo actualiza el estado después de obtener la respuesta del backend
        setMessages(prevMessages => [...prevMessages, newMessage, chatGPTMessage]);
    
        // Guardar historial de chat
        const saveResponse = await fetch(`${API_URL}/chatHistory/save`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: user.username,
            messages: [...messages.map(msg => msg.text), newMessage.text, chatGPTMessage.text]
          }),
        });
    
        if (!saveResponse.ok) {
          throw new Error('Error saving chat history');
        }
      } catch (error) {
        console.error('Error fetching ChatGPT response or saving chat history:', error);
      }
    
      setCurrentInput('');
    };
    

    return {
        currentInput,
        setCurrentInput,
        messages,
        setMessages,
        isRecording,
        activateMicrophone,
        deactivateMicrophone,
        handleLogout,
        handleSubmit,
        socketRef,
        mediaRecorderRef,
        user,  // Asegúrate de devolver el user
    }
};
