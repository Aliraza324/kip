import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, CheckCheck } from "lucide-react";
import { classroomMock } from "@/mocks";

export const ClassroomChatPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("class");
  const [messages, setMessages] = useState(classroomMock.initialMessages);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "Alex (You)",
      initials: "AL",
      avatarColor: "bg-[#0080f6] text-white",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: inputText.trim(),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  return (
    <div className="w-full lg:w-80 xl:w-96 bg-white border border-slate-100 rounded-3xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between h-full min-h-[500px]">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900">
            <MessageSquare className="w-5 h-5 text-[#0080f6]" />
            <h3 className="font-bold text-base">Messages</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-tabs: Class Chat & Private */}
        <div className="flex items-center gap-2 mt-3 p-1 rounded-2xl bg-slate-100/70 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab("class")}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "class"
                ? "bg-white text-[#0080f6] shadow-2xs font-extrabold"
                : "hover:text-slate-900"
            }`}
          >
            Class Chat
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("private")}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "private"
                ? "bg-white text-[#0080f6] shadow-2xs font-extrabold"
                : "hover:text-slate-900"
            }`}
          >
            Private
          </button>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 my-3 overflow-y-auto space-y-3 pr-1 text-xs sm:text-sm max-h-[360px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}
          >
            {!msg.isMe && (
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${msg.avatarColor}`}
                >
                  {msg.initials}
                </div>
                <span className="font-bold text-slate-800 text-xs">
                  {msg.sender}
                </span>
                <span className="text-[10px] text-slate-400">{msg.time}</span>
              </div>
            )}

            <div
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                msg.isMe
                  ? "bg-[#0080f6] text-white rounded-br-xs"
                  : "bg-slate-100 text-slate-800 rounded-bl-xs"
              }`}
            >
              <p>{msg.text}</p>
            </div>

            {msg.isMe && (
              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-400 pr-1">
                <span>{msg.time}</span>
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSendMessage} className="relative mt-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="w-full bg-slate-50 border border-slate-200/80 rounded-full pl-4 pr-12 py-2.5 text-xs text-slate-800 outline-none focus:border-[#0080f6] focus:bg-white transition-all shadow-2xs"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0080f6] text-white flex items-center justify-center hover:bg-[#0060d0] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </form>
    </div>
  );
};

export default ClassroomChatPanel;

