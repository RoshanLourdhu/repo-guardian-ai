export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  repoUrl: string;
  repoName: string;
  messages: Message[];
  createdAt: number;
}
