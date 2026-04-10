import { useState, useCallback } from "react";
import { Chat, Message } from "@/types/chat";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { RepoUrlInput } from "@/components/RepoUrlInput";

function extractRepoName(url: string): string {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
  if (match) {
    const parts = match[1].split("/");
    return parts[1] || match[1];
  }
  return url;
}

function createId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

const AI_RESPONSES = [
  "This repository has an interesting architecture. The main entry point initializes the core modules and sets up the dependency injection container.",
  "Looking at the codebase, I can see it follows a modular pattern with clear separation of concerns between the data layer, business logic, and presentation.",
  "The test coverage appears comprehensive. There are unit tests for core utilities and integration tests for the main workflows.",
  "Based on the repository structure, it uses a monorepo setup with shared packages for common utilities and type definitions.",
  "The build system is configured with optimizations for tree-shaking and code splitting, which helps keep the bundle size manageable.",
];

export default function Index() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  const handleNewChat = useCallback(() => {
    setActiveChatId(null);
    setShowNewChat(true);
  }, []);

  const handleRepoSubmit = useCallback((url: string) => {
    const newChat: Chat = {
      id: createId(),
      repoUrl: url,
      repoName: extractRepoName(url),
      messages: [],
      createdAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setShowNewChat(false);
  }, []);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!activeChatId) return;

      const userMsg: Message = {
        id: createId(),
        role: "user",
        content,
        timestamp: Date.now(),
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId ? { ...c, messages: [...c.messages, userMsg] } : c
        )
      );

      setLoading(true);
      setTimeout(() => {
        const aiMsg: Message = {
          id: createId(),
          role: "ai",
          content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
          timestamp: Date.now(),
        };
        setChats((prev) =>
          prev.map((c) =>
            c.id === activeChatId ? { ...c, messages: [...c.messages, aiMsg] } : c
          )
        );
        setLoading(false);
      }, 1200);
    },
    [activeChatId]
  );

  const showRepoInput = showNewChat || (!activeChat && chats.length === 0);

  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        collapsed={sidebarCollapsed}
        onSelectChat={(id) => {
          setActiveChatId(id);
          setShowNewChat(false);
        }}
        onNewChat={handleNewChat}
        onToggleCollapse={() => setSidebarCollapsed((p) => !p)}
      />

      {showRepoInput && <RepoUrlInput onSubmit={handleRepoSubmit} />}
      {activeChat && !showNewChat && (
        <ChatWindow chat={activeChat} loading={loading} onSendMessage={handleSendMessage} />
      )}
    </div>
  );
}
