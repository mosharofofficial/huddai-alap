import { useState } from "react";
import { useAuthStore } from "../store/use.AuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { Link } from "react-router-dom";
import {
  MessageCircleIcon,
  MailIcon,
  LoaderIcon,
  LockIcon,
} from "lucide-react";

const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const { login, islogginIn } = useAuthStore();
      const handelSubmit = (e) => {
        e.preventDefault();
        login(formData);
      };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-800">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* form column -left side */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* form heading */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-600/30" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome Back!
                  </h2>
                  <p className="text-slate-400">Please Login and ready for gossip</p>
                </div>
                {/* form */}
                <form onSubmit={handelSubmit} className="space-y-6">
                  {/* email */}
                  <div>
                    <label className="auth-input-label">Email</label>

                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>
                  {/* password */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  {/* button */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={islogginIn}
                  >
                    {islogginIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Login Now"
                    )}
                  </button>
                </form>
                {/* login check */}
                <div className="mt-6 text-center">
                  <Link to={"/signup"} className="auth-link">
                    You don't have a account ? Sign Up
                  </Link>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="signup"
                  className="w-full h-auto object-contain"
                />

                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-green-400">
                    Stay writing , Chat together
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default LoginPage;
