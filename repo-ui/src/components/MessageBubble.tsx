import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn("flex gap-3 max-w-3xl mx-auto", isUser ? "justify-end" : "justify-start")}
      style={{ animation: "fade-up 0.3s ease-out" }}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-muted flex items-center justify-center shrink-0 mt-1">
          <Bot className="h-4 w-4 text-accent-foreground" />
        </div>
      )}
      <div
        className={cn(
          "px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[75%] whitespace-pre-wrap shadow-sm",
          isUser
            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-md"
            : "bg-chat-ai text-chat-ai-foreground rounded-bl-md border border-border/50"
        )}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0 mt-1 glow-sm">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}
