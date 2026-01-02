import { useEffect, useRef, useState } from "react";
import { useAiChatStore } from "../store/useAiChatStore";
import AiChatHeader from "./AiChatHeader";
import NoChatHistoryCmp from "./NoChatHistoryCmp";
import AiMessageInput from "./AiMessageInput";
import MessagesLoadingCmp from "./MessagesLoadingCmp";
import axios from "axios";
import { useAuthStore } from "../store/use.AuthStore";

const AiChatContainer = () => {
  const { selectedRoom } = useAiChatStore();
  const { authUser } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch messages for the selected room
  const fetchRoomMessages = async () => {
    if (!selectedRoom) return;
    setIsMessagesLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/ai/rooms/${selectedRoom.id}/messages/`,
        { params: { email: authUser.email } }
      );
      setMessages(response.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setIsMessagesLoading(false);
    }
  };

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchRoomMessages();
  }, [selectedRoom]);

  useEffect(scrollToBottom, [messages]);

  // Send a message to AI
  const handleSendMessage = async (text) => {
    if (!selectedRoom || !text.trim()) return;

    const userMessage = { role: "user", content: text, createdAt: new Date() };

    // Optimistic update
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:8000/api/chat/", {
        email: authUser.email,
        chat_id: selectedRoom.id,
        messages: [...messages, userMessage], // send full message history
      });

      const aiReply = {
        role: "assistant",
        content: response.data.reply,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error("Failed to send message:", err);
      // Optionally, you can show a toast or retry logic here
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header showing room info */}
      <AiChatHeader roomName={selectedRoom?.name} />

      {/* Messages area */}
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {isMessagesLoading ? (
          <MessagesLoadingCmp />
        ) : messages.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat ${
                  msg.role === "user" ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.role === "user"
                      ? "bg-green-500 text-white"
                      : "bg-slate-700 text-slate-100"
                  }`}
                >
                  {msg.content && <p className="mt-2">{msg.content}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(
                      msg.created_at || msg.createdAt || Date.now()
                    ).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <NoChatHistoryCmp name={selectedRoom?.name || "AI Chat"} />
        )}
      </div>

      {/* Input box */}
      <AiMessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default AiChatContainer;
