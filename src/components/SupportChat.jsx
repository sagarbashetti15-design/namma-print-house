import React, { useState, useEffect, useRef } from 'react';
import { IoChatbubbleOutline, IoCloseOutline, IoPersonOutline, IoHardwareChipOutline } from 'react-icons/io5';
import './SupportChat.css';

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi there! Welcome to Namma Print House support. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const faqOptions = [
    { id: 'delivery', label: '🚚 Delivery Times' },
    { id: 'custom', label: '👕 Custom Print Info' },
    { id: 'returns', label: '📦 Return Policy' },
    { id: 'contact', label: '💬 Direct Contact' }
  ];

  const handleOptionClick = (optionId, optionLabel) => {
    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: optionLabel,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate typing and reply
    setTimeout(() => {
      let replyText = "";
      switch (optionId) {
        case 'delivery':
          replyText = "⚡ Standard delivery takes 3-5 business days across India! Orders placed before 12 PM in Bengaluru are dispatched the very next morning.";
          break;
        case 'custom':
          replyText = "🎨 Custom designs can be uploaded using our online Visual Customizer, or you can send us high-res files directly on WhatsApp! We print on premium 240 GSM dense cotton fabric.";
          break;
        case 'returns':
          replyText = "🔄 We offer a hassle-free 7-day return and exchange policy on standard catalog products! Note: custom-printed garments cannot be returned unless they arrive damaged.";
          break;
        case 'contact':
          replyText = "💬 You can chat directly with our founder, Raghavendra Pujar, on WhatsApp at +91 8296437764 or email us at nammaprinthouse2k26@gmail.com! We reply within 1 hour.";
          break;
        default:
          replyText = "I'm not sure about that. Try selecting another topic!";
      }

      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="support-chat-wrapper">
      {/* Floating Chat Trigger Button */}
      <button 
        className={`chat-trigger-btn ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        title="Customer Support Chat"
      >
        {isOpen ? <IoCloseOutline size={24} /> : <IoChatbubbleOutline size={24} />}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="chat-window-panel">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="online-indicator"></span>
              <div>
                <h4>NPH Support Bot</h4>
                <p>Online Assistant</p>
              </div>
            </div>
            <button className="close-chat-btn" onClick={() => setIsOpen(false)}>
              <IoCloseOutline size={18} />
            </button>
          </div>

          <div className="chat-messages-area">
            {messages.map(msg => (
              <div key={msg.id} className={`message-bubble-row ${msg.sender}`}>
                <div className="message-icon">
                  {msg.sender === 'bot' ? <IoHardwareChipOutline size={14} /> : <IoPersonOutline size={14} />}
                </div>
                <div className="message-bubble-content">
                  <p>{msg.text}</p>
                  <span className="bubble-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message-bubble-row bot">
                <div className="message-icon">
                  <IoHardwareChipOutline size={14} />
                </div>
                <div className="message-bubble-content typing-bubble">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Option Chips */}
          <div className="chat-options-panel">
            <p className="options-title">Frequently Asked Questions:</p>
            <div className="chat-chips-grid">
              {faqOptions.map(opt => (
                <button 
                  key={opt.id} 
                  className="chat-option-chip"
                  onClick={() => handleOptionClick(opt.id, opt.label)}
                  disabled={isTyping}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
