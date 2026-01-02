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
  const { authUser, isCheckingAuth } = useAuthStore(); // get logged-in user

  if (isCheckingAuth) return <div>Loading...</div>; // show loading while checking auth

  const userEmail = authUser?.email; // <-- get email from authUser

  return (
    <div className="relative w-full max-w-6xl h-[900px]">
      <BorderAnimatedContainer>
        {/* Left sidebar */}
        <div className="w-80 bg-slate-700/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" && <ChatsList />}
            {activeTab === "contacts" && <ContactList />}
            {activeTab === "Ai Chat" && <AIChatRoomsList email={userEmail} />}
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 flex flex-col bg-slate-800/50 backdrop-blur-sm">
          {!(activeTab === "Ai Chat") &&
            (selectedUser ? <ChatContainer /> : <NoConversation />)}
          
          {activeTab === "Ai Chat" &&
            (selectedRoom ? <AiChatContainer /> : <NoConversation />)}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
