// MessageContext.ts
import React, { createContext, useState, ReactNode } from 'react';

// Define types for messages data
interface Message {
  sender_id: string;
  message_text: string;
}

// Type for messages object
type Messages = {
  [conversationId: number]: Message[];
};

// Type for the updateMessages function
type UpdateMessages = (conversationId: number, newMessages: Message[]) => void;

// Create the context
export const MessageContext = createContext<{ messages: Messages, updateMessages: UpdateMessages }>({
  messages: {},
  updateMessages: () => {}
});

// Create the provider component
export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to hold the messages data
  const [messages, setMessages] = useState<Messages>({});

  // Function to update messages
  const updateMessages: UpdateMessages = (conversationId, newMessages) => {
    // Update messages for the specified conversation
    setMessages(prevMessages => ({
      ...prevMessages,
      [conversationId]: newMessages
    }));
  };

  return (
    <MessageContext.Provider value={{ messages, updateMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
