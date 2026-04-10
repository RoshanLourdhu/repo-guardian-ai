import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSend = () => {
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setValue("");
    }
  };

  return (
    <div className="border-t border-border/50 p-4 bg-background/80 backdrop-blur-sm">
      <div className={`max-w-3xl mx-auto flex gap-2 p-1 rounded-2xl transition-all duration-300 ${focused ? "bg-secondary/80 glow-sm" : "bg-secondary/50"}`}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask anything about this repository..."
          rows={1}
          className="flex-1 resize-none bg-transparent border-0 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
        />
        <Button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          size="icon"
          className="rounded-xl h-11 w-11 shrink-0 bg-primary hover:bg-primary/90 transition-all glow-sm disabled:shadow-none"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
