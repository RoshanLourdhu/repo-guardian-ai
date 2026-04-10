import { useState } from "react";
import { Github, ArrowRight, Sparkles, Code2, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RepoUrlInputProps {
  onSubmit: (url: string) => void;
}

export function RepoUrlInput({ onSubmit }: RepoUrlInputProps) {
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    const trimmed = url.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" style={{ animation: "float 8s ease-in-out infinite" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" style={{ animation: "float 10s ease-in-out infinite 2s" }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-primary/5 blur-3xl" style={{ animation: "float 6s ease-in-out infinite 4s" }} />
      </div>

      <div className="w-full max-w-lg px-6 space-y-8 text-center relative z-10" style={{ animation: "fade-up 0.6s ease-out" }}>
        <div className="space-y-4">
          <div className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Github className="h-10 w-10 text-primary-foreground" />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-accent-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text">Analyze a Repository</h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Paste a GitHub repository URL to start asking questions about its code, architecture, and more.
          </p>
        </div>

        <div className={`flex gap-2 p-1 rounded-2xl transition-all duration-300 ${focused ? "bg-primary/10 glow-sm" : "bg-secondary/50"}`}>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="https://github.com/facebook/react"
            className="bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button onClick={handleSubmit} disabled={!url.trim()} className="shrink-0 rounded-xl bg-primary hover:bg-primary/90 glow-sm">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Feature hints */}
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Code2 className="h-3.5 w-3.5 text-primary/70" /> Code analysis</span>
          <span className="flex items-center gap-1.5"><GitBranch className="h-3.5 w-3.5 text-primary/70" /> Architecture</span>
          <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-primary/70" /> AI insights</span>
        </div>
      </div>
    </div>
  );
}
