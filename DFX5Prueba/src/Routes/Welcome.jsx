import { useEffect } from 'react';
import { API_URL } from '../../config';
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

  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  

  return (
    <div className="welcome-container">
      <nav className="navbar">
        <div className="user-info">
          <span>User: {capitalizeWord(user?.username)}</span>
          <p>Welcome. Start chatting!</p>
          <button className='logout-button' onClick={handleLogout}>
            Logout
          <i className="fas fa-sign-out-alt"></i>
          </button>
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
                <i className="fas fa-microphone"></i> Activate Microphone
              </button>
            ) : (
              <button onClick={deactivateMicrophone} className="microphone-button">
                <i className="fas fa-microphone-slash"></i> Disable Microphone
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
