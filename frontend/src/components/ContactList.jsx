import { useEffect } from "react";
import { useAuthStore } from "../store/use.AuthStore";
import { useChatStore } from "../store/useChatStore";
import UserLoadingUi from "./UserLoadingUi";

const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UserLoadingUi />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-green-600/10 p-4 rounded-lg cursor-pointer hover:bg-green-400/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
          {/* for live chat track socket */}
            <div
              className={`avatar ${
                onlineUsers.includes(contact._id) ? "online" : "offline"
              }`}
            >
              <div className="size-10 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-100 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
