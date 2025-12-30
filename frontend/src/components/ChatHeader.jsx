import { useEffect } from "react";
import { useAuthStore } from "../store/use.AuthStore";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center bg-slate-600/50 border-b
   border-slate-400/50 max-h-[84px] px-6 flex-1"
    >
      <div className="flex items-center space-x-3 sm:p-1 md:p-3 p-4">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div>
          <h2 className="text-slate-100 font-medium">
            {selectedUser.fullName}
          </h2>
          <p className="text-slate-300 text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-300 hover:text-slate-100 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
