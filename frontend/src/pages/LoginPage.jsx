import { useAuthStore } from '../store/use.AuthStore';

const LoginPage = () => {
    const {authUser, isLoggedIn, login} = useAuthStore();
    return (
        <div>
            login
        </div>
    );
};

export default LoginPage;