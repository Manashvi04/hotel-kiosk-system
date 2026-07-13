import api from "./api";

export const createPayment = async (
  bookingId,
  amount,
  paymentMethod,
  transactionId,
) => {
  const response = await api.post("/payments", {
    bookingId,
    amount,
    paymentMethod,
    transactionId,
  });

  return response.data;
};
