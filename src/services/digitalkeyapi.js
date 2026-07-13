import api from "./api";

export const createDigitalKey = async (bookingId) => {
  const response = await api.post("/digital-keys", {
    bookingId,
  });

  return response.data;
};
