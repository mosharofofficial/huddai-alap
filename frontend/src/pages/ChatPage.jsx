import { useAuthStore } from '../store/use.AuthStore';

const ChatPage = () => {
    const {authUser, isLoggedIn, login} = useAuthStore();
    return (
        <div>
            chatpage
        </div>
    );
};

export default ChatPage;