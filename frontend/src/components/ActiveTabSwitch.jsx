import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="tabs tabs-boxed bg-transparent p-4 m-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab ${
          activeTab === "chats"
            ? "bg-green-600/20 text-green-400"
            : "text-slate-400"
        }`}
      >
        <span className="font-bold">Chats</span>
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab ${
          activeTab === "contacts"
            ? "bg-green-600/20 text-green-400"
            : "text-slate-400"
        }`}
      >
        <span className="font-bold">Available</span>
      </button>
      <button
        onClick={() => setActiveTab("Ai Chat")}
        className={`tab ${
          activeTab === "Ai Chat"
            ? "bg-green-600/20 text-green-400"
            : "text-slate-400"
        }`}
      >
        <span className="font-bold">Ai Chat</span>
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
