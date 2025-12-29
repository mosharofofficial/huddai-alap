import { useAuthStore } from "../store/use.AuthStore";

const ChatPage = () => {
    const {logout} = useAuthStore();
    return (
        <div className="z-10">
            chatpage
            <button className="p-4 text-blue-200" onClick={logout}>logout</button>
        </div>
    );
};

export default ChatPage;