import { OnboardingData } from "@/shared/types/common.types";
import { useState } from "react";
import { generateAIResponse } from "../utils/aiResponseGenerator";
import { Button } from "@/shared/components";

export const AIAssistant: React.FC<{
  data: OnboardingData;
  isOpen: boolean;
  onClose: () => void;
}> = ({ data, isOpen, onClose }) => {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text: "Hello! I'm your AI financial assistant. Ask me about your credit capacity, financial health, or any questions about your data.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user" as const, text: input };
    const aiResponse = generateAIResponse(input, data);
    const aiMsg = { role: "ai" as const, text: aiResponse };

    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  };

  const suggestedQuestions = [
    "Can I request a 50K loan?",
    "Why did my cashflow drop in May?",
    "What is my financial health score?",
    "What's my risk level?",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold">AI Financial Assistant</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg ${
              msg.role === "user" ? "bg-blue-100 ml-8" : "bg-gray-100 mr-8"
            }`}
          >
            <div className="text-xs text-gray-600 mb-1">
              {msg.role === "user" ? "You" : "AI Assistant"}
            </div>
            <div className="text-sm">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setInput(q)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <Button onClick={handleSend} className="text-sm">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
