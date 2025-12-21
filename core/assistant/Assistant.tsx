
import React, { useState, useRef, useEffect } from 'react';
import { Message, AppData, User } from '../../shared/types/index';
import { createChatSession, sendMessageToChat } from './assistant.service';
import { ChatBubbleIcon, CloseIcon, SendIcon } from '../../components/ui/icons/Icons';
import { Chat } from "@google/genai";

interface AssistantProps {
  appData: AppData;
  user: User;
}

const Assistant: React.FC<AssistantProps> = ({ appData, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! How can I help you manage your properties today?", sender: 'ai' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize or update chat session when appData or user changes.
  // This ensures that if the user logs out and a new user logs in, the session is recreated with the correct permissions.
  useEffect(() => {
    if (appData && user) {
        chatSessionRef.current = createChatSession(appData, user);
    }
  }, [appData, user]);

  // Handle scroll and focus on open
  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
        // Small delay to allow transition to finish before focusing
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }
  }, [isOpen]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (userInput.trim() === '' || isLoading) return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      text: userInput,
      sender: 'user',
    };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    // Ensure chat session exists before sending
    if (!chatSessionRef.current) {
         // Attempt one last re-init
         chatSessionRef.current = createChatSession(appData, user);
         
         if (!chatSessionRef.current) {
             const errorMessage: Message = {
                id: `ai-err-${Date.now()}`,
                text: "AI Assistant is currently unavailable. Please ensure the API_KEY environment variable is configured.",
                sender: 'ai',
             };
             setMessages(prev => [...prev, errorMessage]);
             setIsLoading(false);
             return;
         }
    }

    try {
      const aiResponseText = await sendMessageToChat(chatSessionRef.current, newUserMessage.text);
      const newAiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: aiResponseText,
        sender: 'ai',
      };
      setMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorMessage: Message = {
        id: `ai-error-${Date.now()}`,
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'ai',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50 z-50"
        aria-label="Open AI Assistant"
      >
        <ChatBubbleIcon className="h-8 w-8" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 w-full h-full md:w-96 md:h-[600px] bg-white dark:bg-gray-800 md:rounded-lg shadow-2xl flex flex-col z-50 transition-all duration-300 font-sans border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-900 text-white md:rounded-t-lg shrink-0">
        <div className="flex items-center space-x-2">
          <ChatBubbleIcon className="h-5 w-5" />
          <h3 className="text-lg font-semibold">AI Assistant</h3>
        </div>
        <button 
          onClick={() => setIsOpen(false)} 
          className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-4 py-2 rounded-2xl shadow-sm text-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start animate-pulse">
               <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 px-4 py-3 rounded-2xl shadow-sm rounded-bl-none">
                 <div className="flex items-center space-x-1">
                   <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                   <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 md:rounded-b-lg shrink-0">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your data..."
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className={`p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              isLoading || !userInput.trim()
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:scale-105'
            }`}
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 text-center">
           <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Powered by Gemini 2.5</p>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
