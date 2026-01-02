import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/use.AuthStore"; // Zustand auth store
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversation from "../components/NoConversation";
import AIChatRoomsList from "../components/AIChatRoomsList";
import AiChatContainer from "../components/AiChatContainer";
import { useAiChatStore } from "../store/useAiChatStore";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
  const { selectedRoom } = useAiChatStore();
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <div>Loading...</div>;

  const userEmail = authUser?.email;

  return (
    <div className="relative w-full h-screen max-w-7xl mx-auto">
      <BorderAnimatedContainer>
        <div className="flex h-full w-full overflow-hidden">
          {/* Sidebar */}
          <div
            className={`
              bg-slate-700/50 backdrop-blur-sm flex flex-col
              w-full sm:w-80
              ${selectedUser || selectedRoom ? "hidden sm:flex" : "flex"}
            `}
          >
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" && <ChatsList />}
              {activeTab === "contacts" && <ContactList />}
              {activeTab === "Ai Chat" && <AIChatRoomsList email={userEmail} />}
            </div>
          </div>

          {/* Chat area */}
          <div
            className={`
              flex-1 flex flex-col bg-slate-800/50 backdrop-blur-sm
              ${!(selectedUser || selectedRoom) ? "hidden sm:flex" : "flex"}
            `}
          >
            {activeTab !== "Ai Chat" &&
              (selectedUser ? <ChatContainer /> : <NoConversation />)}

            {activeTab === "Ai Chat" &&
              (selectedRoom ? <AiChatContainer /> : <NoConversation />)}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
