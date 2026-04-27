'use client';

import React from 'react';
import { MessageCircle, X, Send, Paperclip, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useChatHook } from './ChatWidgetHook';

export default function ChatWidgetUI() {
  const {
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
  } = useChatHook();

  if (!isOnboarded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={cn(
          'mb-4 w-[350px] md:w-[400px] transition-all duration-300 transform origin-bottom-right',
          isOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
        )}
      >
        <Card className="border-none shadow-2xl overflow-hidden bg-background/95 backdrop-blur-md flex flex-col h-[600px]">
          <CardHeader className="p-0 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
            <div className="p-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedContact && activeTab === 'messages' ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setSelectedContact(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                ) : null}
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage
                      src={
                        activeTab === 'ai' ? undefined : selectedContact?.avatar
                      }
                    />
                    <AvatarFallback className="bg-indigo-700 text-white">
                      {activeTab === 'ai'
                        ? 'AI'
                        : selectedContact
                          ? selectedContact.name.substring(0, 2)
                          : 'EM'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-indigo-600"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-none">
                    {activeTab === 'ai'
                      ? 'E-Platform Assistant'
                      : selectedContact
                        ? selectedContact.name
                        : 'Employee Messages'}
                  </h3>
                  <p className="text-[10px] text-white/80 mt-1">
                    {activeTab === 'ai'
                      ? 'Always online for you'
                      : selectedContact
                        ? selectedContact.role
                        : 'Select a colleague'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8"
                onClick={onCloseChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {!selectedContact || activeTab === 'ai' ? (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full bg-white/10 p-0 h-10 rounded-none border-t border-white/10">
                  <TabsTrigger
                    value="ai"
                    className="flex-1 rounded-none data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 text-xs font-bold transition-all"
                  >
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger
                    value="messages"
                    className="flex-1 rounded-none data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 text-xs font-bold transition-all"
                  >
                    Messages
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            ) : null}
          </CardHeader>

          <CardContent className="p-0 flex-1 overflow-hidden">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-full"
            >
              <TabsContent value="ai" className="h-full m-0">
                <ScrollArea className="h-full p-4" viewportRef={scrollRef}>
                  <div className="space-y-4 px-1 flex flex-col">
                    {/* Suggested Questions */}
                    {aiMessages.length <= 1 && (
                      <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-top-2 duration-500">
                        {[
                          'How to start simulation?',
                          'Check my leaderboard',
                          'Latest platform updates',
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => handleSendMessage(suggestion)}
                            className="text-[11px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 px-3 py-1.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    {aiMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          'flex w-fit max-w-[85%] flex-col gap-1 px-4 py-2.5 text-sm transition-all animate-in fade-in slide-in-from-bottom-2 break-words',
                          msg.senderId === 'user'
                            ? 'ml-auto bg-primary text-primary-foreground rounded-2xl rounded-tr-none shadow-md'
                            : 'bg-muted rounded-2xl rounded-tl-none shadow-sm'
                        )}
                      >
                        {msg.text}
                        <span className="text-[10px] opacity-50 self-end">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex w-max max-w-[80%] flex-col gap-1 px-3 py-2 text-sm bg-muted rounded-2xl rounded-tl-none animate-pulse">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce"></span>
                          <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                          <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="messages" className="h-full m-0">
                {!selectedContact ? (
                  <ScrollArea className="h-full">
                    <div className="p-2 space-y-1">
                      {contacts.map((contact) => (
                        <button
                          key={contact.id}
                          onClick={() => setSelectedContact(contact)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left group"
                        >
                          <div className="relative shrink-0">
                            <Avatar className="h-12 w-12 border">
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>
                                {contact.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            {contact.status === 'online' && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                            )}
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm truncate">
                                {contact.name}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                12:30 PM
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {contact.lastMessage}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <ScrollArea
                    className="h-full p-4"
                    viewportRef={chatRoomScrollRef}
                  >
                    <div className="space-y-4 px-1 flex flex-col">
                      {(chatRooms[selectedContact.id] || []).map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            'flex w-fit max-w-[85%] flex-col gap-1 px-4 py-2.5 text-sm transition-all animate-in fade-in slide-in-from-bottom-2 break-words shadow-sm',
                            msg.senderId === 'user'
                              ? 'ml-auto bg-primary text-primary-foreground rounded-2xl rounded-tr-none shadow-md'
                              : 'bg-white dark:bg-zinc-800 border rounded-2xl rounded-tl-none'
                          )}
                        >
                          {msg.text}
                          <span className="text-[10px] opacity-50 self-end mt-1">
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>

          {(activeTab === 'ai' || selectedContact) && (
            <CardFooter className="p-3 border-t bg-muted/30">
              <div className="flex w-full items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground shrink-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder={
                    activeTab === 'ai'
                      ? 'Ask AI Assistant...'
                      : `Message ${selectedContact?.name}...`
                  }
                  className="h-10 bg-background border-none focus-visible:ring-1 focus-visible:ring-primary shadow-inner"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  size="icon"
                  className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700 shrink-0 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                  onClick={() => handleSendMessage()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Floating Toggle Button */}
      <div className="relative flex items-center gap-3">
        {!isOpen && (
          <div className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg shadow-xl border text-[12px] font-medium animate-in fade-in slide-in-from-right-4 duration-1000 hidden md:block mb-2 mr-1">
            Need help? Ask me!
          </div>
        )}
        <Button
          size="icon"
          className={cn(
            'h-14 w-14 rounded-full shadow-2xl transition-all duration-300 active:scale-90 relative overflow-hidden group',
            isOpen
              ? 'bg-red-500 hover:bg-red-600 rotate-90 scale-90'
              : 'bg-gradient-to-tr from-violet-600 to-indigo-600 hover:shadow-indigo-500/40 hover:-translate-y-1'
          )}
          onClick={onToggleChat}
        >
          {/* Pulse Effect */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping duration-1000 opacity-20 group-hover:hidden"></span>
          )}

          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}

          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
              1
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
