import api from "./api";

export const verifyReservation = async (bookingId) => {
  const response = await api.post("/reservations/verify", {
    bookingId,
  });

  return response.data;
};
