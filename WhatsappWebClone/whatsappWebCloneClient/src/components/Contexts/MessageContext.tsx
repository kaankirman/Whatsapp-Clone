import React, { createContext, useState, ReactNode } from 'react';

interface Message {
  sender_id: string;
  message_text: string;
  send_at: string;
}

type Messages = {
  [conversationId: number]: Message[];
};

type UpdateMessages = (conversationId: number, newMessages: Message[]) => void;

export const MessageContext = createContext<{ messages: Messages, updateMessages: UpdateMessages }>({
  messages: {},
  updateMessages: () => {}
});

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Messages>({});

  const updateMessages: UpdateMessages = (conversationId, newMessages) => {
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
