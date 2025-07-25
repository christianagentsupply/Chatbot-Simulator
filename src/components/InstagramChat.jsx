import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';

const businessConfigs = {
  leadconnectorhq: {
    // No chatbotEmbed here, just use API replies
  },
  // Add more businesses here
};

const InstagramChat = ({ client }) => {
  const { business } = useParams();
  const config = businessConfigs[business?.toLowerCase()] || {};
  const { messages, isLoading, sendUserMessage } = useChat();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      sendUserMessage(inputText);
      setInputText('');
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="border-b border-[#262626] px-4 py-3 flex items-center bg-black">
        <div className="flex-1">
          <h1 className="font-semibold text-base text-white">{client || 'Customer Support'}</h1>
          <p className="text-xs text-gray-400">Active now</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-black">
        {messages.map((message, idx) => (
          <div key={message.id}>
            {/* Timestamp above first message or if time gap (for demo, always show) */}
            {idx === 0 && (
              <div className="text-xs text-gray-500 text-center mb-2">
                {formatTime(message.timestamp)}
              </div>
            )}
            <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm font-medium break-words ${
                  message.sender === 'user'
                    ? 'bg-[#3797f0] text-white rounded-br-md'
                    : 'bg-[#262626] text-white rounded-bl-md'
                }`}
                style={{ boxShadow: 'none' }}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#262626] text-white px-4 py-2 rounded-2xl text-sm font-medium">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#262626] px-4 py-3 bg-black">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-[#262626] text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3797f0] focus:bg-black border-none"
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#18171b] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-none p-0"
            style={{ boxShadow: 'none' }}
          >
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#18171b" />
              <polygon points="13,10.5 23,16 13,21.5" fill="#8B5CF6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstagramChat; 