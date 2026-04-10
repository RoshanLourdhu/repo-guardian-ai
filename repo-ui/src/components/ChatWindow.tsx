import { useEffect, useRef } from "react";
import { Chat } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { Github, Loader2 } from "lucide-react";

interface ChatWindowProps {
  chat: Chat;
  loading: boolean;
  onSendMessage: (content: string) => void;
}

export function ChatWindow({ chat, loading, onSendMessage }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, loading]);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="h-14 border-b border-border/50 flex items-center px-5 gap-3 shrink-0 bg-background/80 backdrop-blur-sm">
        <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
          <Github className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-foreground truncate">{chat.repoName}</span>
          <span className="text-xs text-muted-foreground truncate hidden sm:block">{chat.repoUrl}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6 space-y-6">
        {chat.messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3" style={{ animation: "fade-up 0.5s ease-out" }}>
            <div className="w-12 h-12 rounded-2xl bg-accent/30 flex items-center justify-center">
              <Github className="h-6 w-6 text-primary/60" />
            </div>
            <p className="text-muted-foreground text-sm">Start by asking a question about this repository.</p>
          </div>
        )}
        {chat.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {loading && (
          <div className="flex gap-3 max-w-3xl mx-auto" style={{ animation: "fade-up 0.3s ease-out" }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-muted flex items-center justify-center shrink-0">
              <Loader2 className="h-4 w-4 text-accent-foreground animate-spin" />
            </div>
            <div className="bg-chat-ai text-chat-ai-foreground px-4 py-3 rounded-2xl rounded-bl-md text-sm border border-border/50">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSendMessage} disabled={loading} />
    </div>
  );
}
