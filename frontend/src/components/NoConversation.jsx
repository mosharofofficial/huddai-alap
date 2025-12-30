import { MessageCircleIcon } from "lucide-react";
const NoConversation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-20 bg-green-400/20 rounded-full flex items-center justify-center mb-6">
        <MessageCircleIcon className="size-10 text-green-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2">
        Select a Friends
      </h3>
      <p className="text-slate-200 max-w-md">
        Choose a contact from the sidebar to start chatting or continue a
        previous conversation.
      </p>
    </div>
  );
};

export default NoConversation;
