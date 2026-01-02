import { useState } from "react";

const CreateAiRoomPrompt = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-slate-700/50 rounded space-y-2"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Room Name"
        className="w-full p-2 rounded bg-slate-800 text-white"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full p-2 rounded bg-slate-800 text-white"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
      >
        Create Room
      </button>
    </form>
  );
};

export default CreateAiRoomPrompt;
