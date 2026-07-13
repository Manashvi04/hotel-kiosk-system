import api from "./api";

export const getAvailableRooms = async () => {
  const response = await api.get("/rooms");
  return response.data;
};
