import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isRequired } from "../utils/validators.js";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { PAYMENT_METHOD } from "../constants/paymentMethod.js";

export const createPayment = async (req, res) => {
  try {
    const { reservationId, amount, paymentMethod, transactionId } = req.body;

    const allowedMethods = Object.values(PAYMENT_METHOD);

    if (!allowedMethods.includes(paymentMethod)) {
      return errorResponse(res, 400, MESSAGES.INVALID_PAYMENT_METHOD);
    }

    // Required Fields
    if (!isRequired(reservationId, amount, paymentMethod)) {
      return errorResponse(
        res,
        400,
        "Reservation ID, amount and payment method are required.",
      );
    }

    // Amount Validation
    if (Number(amount) <= 0) {
      return errorResponse(
        res,
        400,
        "Payment amount must be greater than zero.",
      );
    }

    const result = await pool.query(
      `
      INSERT INTO payments
      (
        reservation_id,
        amount,
        payment_method,
        payment_status,
        transaction_id
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        reservationId,
        amount,
        paymentMethod,
        PAYMENT_STATUS.PAID,
        transactionId || null,
      ],
    );

    return successResponse(
      res,
      201,
      "Payment completed successfully.",
      result.rows[0],
    );
  } catch (error) {
    console.error(error);

    // Reservation doesn't exist
    if (error.code === "23503") {
      return errorResponse(res, 404, "Reservation not found.");
    }

    return errorResponse(res, 500, "Failed to process payment.");
  }
};
