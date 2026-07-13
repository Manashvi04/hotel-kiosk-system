import api from "./api";

export const verifyIdentity = async (bookingId, documentType) => {
  const response = await api.post("/identity/verify", {
    bookingId,
    documentType,
  });

  return response.data;
};
