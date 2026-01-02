// File: src/components/AIChatRoomsList.jsx
import { useEffect, useState } from "react";
import { useAiChatStore } from "../store/useAiChatStore";
import { useAuthStore } from "../store/use.AuthStore";
import UserLoadingUi from "./UserLoadingUi";
import CreateAiRoomPrompt from "./CreateAiRoomPrompt";

const AIChatRoomsList = () => {
  const { authUser } = useAuthStore(); // get logged-in user
  const email = authUser?.email;

  const {
    getAiRooms,
    rooms,
    isLoading,
    setSelectedRoom,
    createRoom,
    deleteRoom,
  } = useAiChatStore();
  const [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    if (email) getAiRooms(email); // fetch rooms when email is available
  }, [email, getAiRooms]);

  const handleCreateRoom = async (roomData) => {
    if (!email) return;
    await createRoom(email, roomData); // create room
    setIsCreating(false);
    // select the newly created room
    const newRoom = rooms[rooms.length - 1];
    if (newRoom) setSelectedRoom(newRoom);
  };

  if (isLoading) return <UserLoadingUi />;

  // If no rooms exist, show create room prompt
  if (rooms.length === 0)
    return <CreateAiRoomPrompt onCreate={handleCreateRoom} />;

  return (
    <div className="space-y-2">
      <button
        className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
        onClick={() => setIsCreating(true)}
      >
        + New Room
      </button>

      {isCreating && <CreateAiRoomPrompt onCreate={handleCreateRoom} />}

      {rooms.map((room) => (
        <div
          key={room.id}
          className="bg-green-600/10 p-4 rounded-lg cursor-pointer hover:bg-green-400/20 transition-colors flex flex-row items-center justify-between"
          onClick={() => setSelectedRoom(room)}
        >
          <h2 className="text-slate-100 font-medium truncate">{room.name}</h2>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent selecting
              deleteRoom(room.id);
            }}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AIChatRoomsList;
