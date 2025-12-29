import { useAuthStore } from '../store/use.AuthStore';

const SignUpPage = () => {
    const {authUser, isLoggedIn, login} = useAuthStore();
    return (

        <div>
            signUp
        </div>
    );
};

export default SignUpPage;