import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const ChatbotPage: React.FC = () => {
  const query = useQuery();
  const initialQuery = (query.get("query") || "").trim();

  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    initialQuery
      ? [
          {
            id: `${Date.now()}-user-initial`,
            role: "user",
            content: initialQuery,
          },
        ]
      : []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg: ChatMessage = { id: `${Date.now()}-user`, role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const apiBase = ""; // same origin; when using vercel dev this will work
      const res = await fetch(`${apiBase}/api/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: content }),
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`Request failed: ${res.status} ${errText}`);
      }
      const data: { answer: string } = await res.json();
      const assistantMsg: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: data.answer?.trim() || "I couldn't generate a response.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const assistantMsg: ChatMessage = {
        id: `${Date.now()}-assistant-error`,
        role: "assistant",
        content: `Sorry, I ran into an error fetching the answer. ${err?.message || ""}`.trim(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">AI Chatbot Assistant</h1>

        <Card className="mb-4">
          <CardContent className="p-4">
            <div
              ref={scrollRef}
              className="h-[60vh] overflow-y-auto pr-2 space-y-4 border-b border-border pb-4"
            >
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
                  <div
                    className={
                      m.role === "user"
                        ? "inline-block bg-primary text-primary-foreground rounded-xl px-3 py-2"
                        : "inline-block bg-muted text-foreground rounded-xl px-3 py-2"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {!messages.length && (
                <div className="text-sm text-muted-foreground">
                  Ask any farming question to get instant assistance.
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
              />
              <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatbotPage;


