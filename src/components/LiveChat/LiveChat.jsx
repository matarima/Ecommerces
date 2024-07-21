import React, { useState } from 'react';
import './LiveChat.css';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ADMIN', text: 'Chào bạn' },
    { sender: 'ADMIN', text: 'Bạn có thể vào mục Shop để xem các sản phẩm' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const Image = {
    admin: require('../../assets/admin.png'),
    user: require('../../assets/man.png')
  }

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender: 'USER', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="live-chat">
      <div className="popup-icon" onClick={toggleChat}>
        <i className="fab fa-facebook-messenger"></i>
      </div>
      {isOpen && (
        <div className="chat-window card">
          <div className="card-header">
            <span>Customer Support</span>
            <button className="btn btn-link" onClick={toggleChat}>Close</button>
          </div>
          <div className="card-body">
            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender.toLowerCase()}`}>
                  {message.sender === 'ADMIN' ? (
                    <img
                      src={Image.admin}
                      alt="icon"
                      className="message-icon"
                    />
                  ) : null}
                  <span>{message.text}</span>
                  {message.sender === 'USER' ? (
                    <img
                      src={Image.user}
                      alt="icon"
                      className="message-icon user-icon"
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Message!"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" onClick={handleSendMessage}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
