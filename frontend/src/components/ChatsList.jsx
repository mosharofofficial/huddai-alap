import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingUi from "./UserLoadingUi";
import NoChatFound from "./NoChatFound";
import { useAuthStore } from './../store/use.AuthStore';
const ChatsList = () => {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
    
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UserLoadingUi />;

  if (chats.length === 0) return <NoChatFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-green-600/10 p-4 rounded-lg cursor-pointer hover:bg-green-400/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            
            <div
              className={`avatar ${
                onlineUsers.includes(chat._id) ? "online" : "offline"
              }`}
            >
              <div className="size-10 rounded-full">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <h2 className="text-slate-100 font-medium truncate">
              {chat.fullName}
            </h2>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatsList;
