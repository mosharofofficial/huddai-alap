import { useState } from "react";
import { useAuthStore } from "../store/use.AuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { Link } from "react-router-dom";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  const handelSubmit = (e) => {
    e.preventDefault();
    signup(formData);
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
                    Create a Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>
                {/* form */}
                <form onSubmit={handelSubmit} className="space-y-6">
                  <div>
                    <label className="auth-input-label">Full Name</label>

                    <div className="relative">
                      <UserIcon className="auth-input-icon" />

                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your name here"
                      />
                    </div>
                  </div>
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
                      <LoaderIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your password here"
                      />
                    </div>
                  </div>
                  {/* button */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create a Account"
                    )}
                  </button>
                </form>
                {/* login check */}
                <div className="mt-6 text-center">
                  <Link to={"/login"} className="auth-link">
                    Already have an account ? Login
                  </Link>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/signup-01.png"
                  alt="signup"
                  className="w-full h-auto object-contain"
                />

                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-green-400">
                    Start Your Journey Today
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

export default SignUpPage;
