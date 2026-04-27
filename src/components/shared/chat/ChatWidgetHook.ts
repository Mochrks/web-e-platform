'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleChat, closeChat } from '@/store/slices/chatSlice';

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
}

export const useChatHook = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.chat.isOpen);
  const { isOnboarded } = useAppSelector((state) => state.onboarding);

  const [activeTab, setActiveTab] = useState('ai');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [inputValue, setInputValue] = useState('');

  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your E-Platform assistant. How can I help you today?',
      senderId: 'bot',
      senderName: 'AI Assistant',
      timestamp: new Date(),
    },
  ]);

  const [contacts] = useState<Contact[]>([
    {
      id: 'u2',
      name: 'Sarah Jenkins',
      role: 'Senior Analyst',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      status: 'online',
      lastMessage: 'Has anyone finished the simulation?',
    },
    {
      id: 'u3',
      name: 'David Chen',
      role: 'Lead Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      status: 'online',
      lastMessage: 'The new update is live.',
    },
    {
      id: 'u4',
      name: 'Mia Wong',
      role: 'Product Designer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia',
      status: 'offline',
      lastMessage: 'Check the new UI mocks.',
    },
  ]);

  const [chatRooms, setChatRooms] = useState<Record<string, Message[]>>({
    u2: [
      {
        id: '1',
        text: 'Hi Sarah, did you see the report?',
        senderId: 'user',
        senderName: 'You',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: '2',
        text: 'Yes, just reviewing it now!',
        senderId: 'u2',
        senderName: 'Sarah Jenkins',
        timestamp: new Date(Date.now() - 1800000),
      },
    ],
    u3: [
      {
        id: '1',
        text: 'Hey David, is the server up?',
        senderId: 'user',
        senderName: 'You',
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: '2',
        text: 'All good on my side.',
        senderId: 'u3',
        senderName: 'David Chen',
        timestamp: new Date(Date.now() - 7100000),
      },
    ],
  });

  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRoomScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = activeTab === 'ai' ? scrollRef : chatRoomScrollRef;
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [aiMessages, chatRooms, isOpen, activeTab, selectedContact]);

  const getBotResponse = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('hello') || lowerText.includes('hi'))
      return 'Hello there! How is your progress today?';
    if (lowerText.includes('help'))
      return 'I can help you with simulations, leaderboard info, or platform navigation.';
    if (lowerText.includes('simulation'))
      return 'You have completed 8/10 scheduled sessions this week. Keep it up!';
    return "That's interesting! Tell me more about it or ask me anything about the platform.";
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      senderId: 'user',
      senderName: 'You',
      timestamp: new Date(),
    };

    if (activeTab === 'ai') {
      setAiMessages((prev) => [...prev, newMessage]);
      if (!text) setInputValue('');
      setIsTyping(true);

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(messageText),
          senderId: 'bot',
          senderName: 'AI Assistant',
          timestamp: new Date(),
        };
        setAiMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    } else if (selectedContact) {
      const contactId = selectedContact.id;
      setChatRooms((prev) => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), newMessage],
      }));
      if (!text) setInputValue('');

      setTimeout(() => {
        const replyMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: `Thanks for the message! I'll get back to you soon.`,
          senderId: contactId,
          senderName: selectedContact.name,
          timestamp: new Date(),
        };
        setChatRooms((prev) => ({
          ...prev,
          [contactId]: [...(prev[contactId] || []), replyMessage],
        }));
      }, 2000);
    }
  };

  const onToggleChat = () => dispatch(toggleChat());
  const onCloseChat = () => dispatch(closeChat());

  return {
    isOpen,
    isOnboarded,
    activeTab,
    setActiveTab,
    selectedContact,
    setSelectedContact,
    inputValue,
    setInputValue,
    aiMessages,
    contacts,
    chatRooms,
    isTyping,
    scrollRef,
    chatRoomScrollRef,
    handleSendMessage,
    onToggleChat,
    onCloseChat,
  };
};
