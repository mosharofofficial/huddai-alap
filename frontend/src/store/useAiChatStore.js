import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "../config"; // <-- import backend URL

export const useAiChatStore = create((set, get) => ({
  rooms: [],
  selectedRoom: null,
  isLoading: false,
  error: null,

  // Fetch all AI chat rooms for a given email
  getAiRooms: async (email) => {
    if (!email) return;
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ai/rooms`, {
        params: { email },
        headers: { "X-Test-Header": "1" },
      });
      set({ rooms: response.data, isLoading: false });
    } catch (err) {
      console.error("Failed to fetch AI rooms:", err);
      set({ error: err, isLoading: false });
    }
  },

  // Select a room
  setSelectedRoom: (room) => {
    set({ selectedRoom: room });
  },

  // Create a new AI chat room
  createRoom: async (email, roomData) => {
  if (!email) return;
  set({ isLoading: true, error: null });
  try {
    const payload = {
      email,
      name: roomData.name || "AI Chat",
      description: roomData.description || "Ask anything",
    };
    const response = await axios.post(`${API_BASE_URL}/api/ai/rooms/`, payload);

    // Add the new room to the list and select it
    set((state) => ({
      rooms: [...state.rooms, response.data],
      selectedRoom: response.data,
      isLoading: false,
    }));
  } catch (err) {
    console.error("Failed to create AI room:", err);
    set({ error: err, isLoading: false });
  }
},
  deleteRoom: async (roomId) => {
    if (!roomId) return;
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_BASE_URL}/api/ai/rooms/${roomId}/`);
      set((state) => ({
        rooms: state.rooms.filter((r) => r.id !== roomId),
        selectedRoom:
          state.selectedRoom?.id === roomId ? null : state.selectedRoom,
        isLoading: false,
      }));
    } catch (err) {
      console.error("Failed to delete AI room:", err);
      set({ error: err, isLoading: false });
    }
  },
}));
