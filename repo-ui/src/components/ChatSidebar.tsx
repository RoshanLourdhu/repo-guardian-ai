import { Plus, MessageSquare, PanelLeftClose, PanelLeft, Github, Sparkles } from "lucide-react";
import { Chat } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  collapsed: boolean;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onToggleCollapse: () => void;
}

export function ChatSidebar({
  chats,
  activeChatId,
  collapsed,
  onSelectChat,
  onNewChat,
  onToggleCollapse,
}: ChatSidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-72"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm gradient-text">RepoChat</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          {collapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          onClick={onNewChat}
          className={cn(
            "w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity border-0",
            collapsed ? "px-0 justify-center" : "justify-start gap-2"
          )}
        >
          <Plus className="h-4 w-4" />
          {!collapsed && <span>New Chat</span>}
        </Button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 space-y-1">
        {chats.map((chat, i) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all text-left group",
              activeChatId === chat.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
            style={{ animation: `fade-up 0.3s ease-out ${i * 0.05}s both` }}
          >
            <div className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
              activeChatId === chat.id ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            )}>
              <Github className="h-3.5 w-3.5" />
            </div>
            {!collapsed && (
              <span className="truncate">{chat.repoName}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
