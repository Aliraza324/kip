import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

export const MeetingChat = ({
  messages = [],
  onSend,
  onClose,
  currentUserId,
}) => {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-slate-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-white font-bold text-sm">Chat</h3>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 ? (
          <p className="text-white/40 text-xs text-center pt-8">
            No messages yet. Say hello! 👋
          </p>
        ) : (
          messages.map((msg, i) => {
            const isMe = msg.socketId === currentUserId;
            return (
              <div key={i} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <span className="text-white/40 text-[10px] mb-0.5 px-1">{msg.name}</span>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white/10 text-white rounded-bl-sm"
                  }`}
                >
                  {msg.message}
                </div>
                <span className="text-white/20 text-[9px] px-1 mt-0.5">
                  {new Date(msg.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none placeholder:text-white/30 focus:bg-white/15 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MeetingChat;
