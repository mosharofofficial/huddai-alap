import { useEffect } from "react";
import { XIcon } from "lucide-react";
import { useAiChatStore } from "../store/useAiChatStore";

const AIChatHeader = () => {
  const { selectedRoom, setSelectedRoom } = useAiChatStore();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedRoom(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedRoom]);

  if (!selectedRoom) return null;

  return (
    <div
      className="flex justify-between items-center bg-slate-600/50 border-b
   border-slate-400/50 max-h-[84px] px-6 flex-1"
    >
      <div className="flex items-center space-x-3 sm:p-1 md:p-3 p-4">
        {/* Optional icon/avatar for AI */}
        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-lg">
          AI
        </div>

        <div>
          <h2 className="text-slate-100 font-medium">{selectedRoom.name}</h2>
          <p className="text-slate-300 text-sm">
            {selectedRoom.description || "Ask anything"}
          </p>
        </div>
      </div>

      <button onClick={() => setSelectedRoom(null)}>
        <XIcon className="w-5 h-5 text-slate-300 hover:text-slate-100 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default AIChatHeader;
