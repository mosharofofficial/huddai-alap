import { useState } from "react";
import useKeyboardSound from "../Hooks/useKeybordSound";
import { SendIcon } from "lucide-react";

const AiMessageInput = ({ onSend, isSoundEnabled = true }) => {
  const { playRandomKeySound } = useKeyboardSound();
  const [text, setText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    if (isSoundEnabled) playRandomKeySound();

    // Call the parent container's send handler
    onSend(trimmedText);
    setText("");
  };

  return (
    <div className="p-4 border-t border-slate-600/50">
      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex space-x-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (isSoundEnabled) playRandomKeySound();
          }}
          className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-lg py-2 px-4 text-[whitesmoke]"
          placeholder="Ask the AI anything..."
        />

        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg px-4 py-2 font-medium hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default AiMessageInput;
