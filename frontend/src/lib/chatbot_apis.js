import axios from "axios";

const CHATBOT_API_BASE = "http://localhost:8000/api";

export const cb_getRooms = (email) =>
  axios.get(`${CHATBOT_API_BASE}/ai/rooms`, { params: { email } });

export const cb_createRoom = (email, name, description) =>
  axios.post(`${CHATBOT_API_BASE}/ai/rooms`, { email, name, description });

export const cb_getRoomMessages = (roomId, email) =>
  axios.get(`${CHATBOT_API_BASE}/ai/rooms/${roomId}/messages`, {
    params: { email },
  });

export const cb_sendMessage = (email, roomId, messages) =>
  axios.post(`${CHATBOT_API_BASE}/chat/`, { email, chat_id: roomId, messages });
