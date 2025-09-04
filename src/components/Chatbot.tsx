
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
      setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const assistantMessage: Message = {
      role: "assistant",
      content: data.reply || "Bir cevap döndü...",
    };
    console.log(data.reply);

    setMessages((prev) => [...prev, assistantMessage]);
   
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Açma butonu */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 p-0 shadow-lg flex items-center justify-center"
        >
          <Bot size={42} className="text-foreground w-full h-full" />
        </Button>
      )}

      {isOpen && (
        <div className="w-80 h-[500px] bg-card border shadow-2xl rounded-2xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-3 py-2 border-b bg-muted">
            <span className="font-medium text-foreground">Ben ChatBot!</span>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full h-12 w-12 shadow-lg"
            >
              ✕
            </button>
          </div>

          {/* Mesajlar */}
          <div className="flex-1 overflow-y-auto space-y-3 p-3 font-sans text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-3xl shadow 
                    ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">
                    {msg.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>

          {/* Input alanı */}
          <div className="flex gap-2 border-t p-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Mesajınızı yazın..."
              className="flex-1 rounded-full"
            />
            <Button onClick={sendMessage} className="rounded-full">
              Gönder
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
