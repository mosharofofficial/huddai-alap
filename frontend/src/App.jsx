import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/use.AuthStore";
import PageLoader from "./components/PageLoader";
import {Toaster} from "react-hot-toast";

const App = () => {
    const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log(authUser);
  if(isCheckingAuth)
      return <PageLoader />

  return (
    <div className="min-h-screen bg-slate-800 relative flex items-center justify-center p-4 overflow-hidden">
    {/* background design here */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3232322d_1px,transparent_1px),linear-gradient(to_bottom,#3232322d_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 -left-4 size-96 bg-rose-500 opacity-20 blur-[100px]"></div>
      <div className="absolute bottom-0 -right-4 size-96 bg-emerald-400 opacity-20 blur-[100px]"></div>
      {/* background design end here*/}
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
