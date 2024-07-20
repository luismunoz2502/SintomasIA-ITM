import { useEffect } from 'react';
import './Welcome.css';
import { API_URL, IMAGE_URL } from '../../config';
import { useInteractiveActions } from '../logic/useInteractiveActions';

export default function Welcome() {
  const { user, messages, currentInput, isRecording, activateMicrophone, handleSubmit, deactivateMicrophone, setMessages, handleLogout, setCurrentInput } = useInteractiveActions();
 
  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/chatHistory/${user.username}`)
        .then(response => response.json())
        .then(data => {
          const messages = data.messages || [];
          const validatedMessages = messages.map((msg, index) => ({
            type: index % 2 === 0 ? 'user' : 'chatgpt',
            text: msg,
            timestamp: new Date().toISOString()
          }));
          setMessages(validatedMessages);
        })
        .catch(error => console.error('Error fetching chat history:', error));
    }
  }, [user, setMessages]);
  

  return (
    <div className="welcome-container">
      <nav className="navbar">
        <div className="logo">
          <img src={IMAGE_URL} alt="Logo DFX5" />
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
                <div key={index} className={`message ${msg.type}-message`}>
                  <p>{msg.text}</p>
                  <small>{new Date(msg.timestamp).toLocaleString()}</small>
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
                <small>{new Date(msg.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
