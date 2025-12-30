import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/use.AuthStore";
import { useChatStore } from "../store/useChatStore";  //  Fixed line 3
import { useRef, useState } from "react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();  //  Fixed line 9
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };


  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* profile picture */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName || "User"}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-sm">Upload?</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* name and online offline */}
          <div>
            <h2 className="text-slate-200 font-bold text-base max-w-[190px] truncate">
              {authUser?.fullName}
            </h2>
            <p className="text-slate-300 text-xs">Online</p>
          </div>
        </div>
        {/* button for logout */}
        <div className="flex gap-4 items-center">
          {/* logout */}
          <button
            className="text-red-400 hover:text-red-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-6" />
          </button>

          {/* notification */}
          <button
            className="text-slate-300 hover:text-slate-100 transition-colors"
            onClick={() => {
              if (isSoundEnabled) {
                mouseClickSound.currentTime = 0;
                mouseClickSound
                  .play()
                  .catch((error) => console.log("Sound failed:", error));
              }
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-6" />
            ) : (
              <VolumeOffIcon className="size-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;