import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SelectedConversationProviderProps {
  children: ReactNode;
}

export interface SelectedConversation {
  name: string;
  conversationId: number;
}

interface SelectedConversationContextType {
  selectedConversation: SelectedConversation | null;
  setSelectedConversation: React.Dispatch<React.SetStateAction<SelectedConversation | null>>;
}

const SelectedConversationContext = createContext<SelectedConversationContextType>({
  selectedConversation: null,
  setSelectedConversation: () => { }
});

export const useSelectedConversation = () => useContext(SelectedConversationContext);

export const SelectedConversationProvider: React.FC<SelectedConversationProviderProps> = ({ children }) => {
  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(null);

  return (
    <SelectedConversationContext.Provider value={{ selectedConversation, setSelectedConversation }}>
      {children}
    </SelectedConversationContext.Provider>
  );
};
