import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";



const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      content: "Hi! Ask me about any plant 🌿",
      type: "answer",
      created: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      content: input,
      type: "question",
      created: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const accessToken = localStorage.getItem("plant_id_access_token");

    if (!accessToken) {
      const errorMsg = {
        content: "❌ Access token missing in localStorage!",
        type: "answer",
        created: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      return;
    }

    try {
      const res = await fetch(
        `https://plant.id/api/v3/identification/${accessToken}/conversation`,
        {
          method: "POST",
          headers: {
            "Api-Key": "Gav87Vg8AlYSNur4P7DDWhh6F67oe94wxr69yc1fEadPjQOcuc",
          // "Api-Key": "FUCDfjdqxe12Rf5s2vFjiVwDwyvOpMJCmcQteivuUhdcRQTOGX",
          // "Api-Key": "MK77aCoD76Tc8asN90SD2wA4S1C83f1qjP7GNxnSYRjNi3AD3Y",
          // "Api-Key": "xyliiwgJhSRJhXpC4VoWncl317M1cA1eZZXKZO6MUHRhsBRNkK",
          // "Api-Key": "gJTdPR9BGqDQAtl8X9FiNw6tAqSIs0Q8o51jDoIW5lCE1HkDPR",
          // "Api-Key": "A4ZHaV8eKRvCRMhTJ6dWtxNEjY766jRCJZq1szJXS7hFPkXdk9",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: input,
            prompt: "Give answer all lowercase.",
            temperature: 0.5,
            app_name: "MyAppBot",
          }),
        }
      );

      const data = await res.json();
      const latestBotMsg = data?.messages
        ?.reverse()
        .find((msg) => msg.type === "answer" && msg.content?.trim());

      if (latestBotMsg) {
        latestBotMsg.created = new Date().toISOString();
        setMessages((prev) => [...prev, latestBotMsg]);
      } else {
        const noResponse = {
          content: "❌ No valid response from bot. Please ask about a plant.",
          type: "answer",
          created: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, noResponse]);
      }
    } catch (error) {
      const errorMsg = {
        content: "❌ Failed to get response from bot.",
        type: "answer",
        created: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // ✅ Format message text into paragraphs and bullets
  const renderMessageContent = (content) => {
    // Split content into lines (preserving bullets)
    const lines = content.split("\n");
    const isBullet = (line) => line.trim().startsWith("- ") || line.trim().startsWith("* ");
  
    // Separate bullet items and normal lines
    const bulletItems = lines.filter(isBullet);
    const normalLines = lines.filter((line) => !isBullet(line) && line.trim() !== "");
  
    // Helper function to render bold text
    const renderBoldText = (text) => {
      // Split the text based on '**' and map through it
      const parts = text.split("**");
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // Apply bold for odd indexes (the bold text between **)
          return <span key={index} className="font-bold">{part}</span>;
        } else {
          // Normal text for even indexes
          return <span key={index}>{part}</span>;
        }
      });
    };
  
    return (
      <div className="space-y-1 text-sm">
        {/* Render normal lines */}
        {normalLines.map((line, i) => (
          <p key={i}>{renderBoldText(line)}</p> // Apply bold rendering to each line
        ))}
        
        {/* Render bullet points */}
        {bulletItems.length > 0 && (
          <ul className="list-disc list-inside space-y-1">
            {bulletItems.map((item, i) => (
              <li key={i}>{renderBoldText(item.replace(/^[-*]\s/, ""))}</li> // Apply bold rendering to each bullet item
            ))}
          </ul>
        )}
      </div>
    );
  };


  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-xl h-full flex flex-col bg-gray-800 shadow-lg text-white">
        {/* Header */}
        <div className="py-3 px-4 text-center font-bold text-2xl border-b border-gray-600 text-green-500">
  📚 GardenGuide
</div>


        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {messages
            .sort((a, b) => new Date(a.created) - new Date(b.created))
            .map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "question" ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl ${
                    msg.type === "question"
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-green-200"
                  }`}
                >
                  {renderMessageContent(msg.content)}
                  <div className="text-right text-xs text-gray-400 mt-1">
                    {new Date(msg.created).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div className="flex gap-2 p-4 border-t border-gray-600 bg-gray-800">
          <div className="flex items-center w-full rounded-full border border-gray-600 bg-gray-900 px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a plant..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <button onClick={sendMessage}>
              <PaperAirplaneIcon className="h-5 w-5 text-green-400 hover:text-green-500 rotate-30" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
