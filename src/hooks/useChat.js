import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '85bb397605a35ad475542cd5365de46b2ba004d1';
const API_URL = 'https://app.agentsupply.ai/en/chatbot/api/v1/message/';
const businessChatbotConfig = {
  leadconnectorhq: {
    instagram: {
      chatbot_uuid: '4cfa0b2d-0104-40d4-933f-ff6d6d0b59f9', // Use the UUID, not the numeric ID
    },
  },
  // Add more business/platform configs here
};

// Placeholder function - will be replaced with real API call for certain businesses
const sendMessage = async (userText, business, platform, userKey) => {
  // If business/platform is configured for real API, use it
  if (
    business &&
    platform &&
    businessChatbotConfig[business]?.[platform] &&
    businessChatbotConfig[business][platform].chatbot_uuid
  ) {
    const chatbot_uuid = businessChatbotConfig[business][platform].chatbot_uuid;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          chatbot_uuid,
          query: userText,
          user_key: userKey,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        return result.data?.answer || '...';
      } else {
        const errorData = await response.json().catch(() => ({}));
        return errorData.message || errorData.error || 'Sorry, there was an error.';
      }
    } catch (err) {
      return 'Sorry, there was a network error.';
    }
  }
  // Default: mock reply
  await new Promise(resolve => setTimeout(resolve, 1000));
  const responses = [
    "Thanks for your message! I'm here to help.",
    "That's interesting! Tell me more about that.",
    "I understand what you're saying. How can I assist you further?",
    "Great question! Let me think about that for a moment...",
    "I appreciate you reaching out. Is there anything specific you'd like to know?"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export const useChat = () => {
  const { business, platform } = useParams();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Use a random user key for the session
  const userKey = window.localStorage.getItem('chat_user_key') || (() => {
    const key = 'user_' + Math.random().toString(36).slice(2);
    window.localStorage.setItem('chat_user_key', key);
    return key;
  })();

  const sendUserMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get bot response
      const botResponse = await sendMessage(text, business, platform, userKey);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [business, platform, userKey]);

  return {
    messages,
    isLoading,
    sendUserMessage
  };
}; 