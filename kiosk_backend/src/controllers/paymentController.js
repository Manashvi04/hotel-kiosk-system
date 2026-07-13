import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isRequired } from "../utils/validators.js";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { PAYMENT_METHOD } from "../constants/paymentMethod.js";

export const createPayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod, transactionId } = req.body;

    const allowedMethods = Object.values(PAYMENT_METHOD);

    if (!allowedMethods.includes(paymentMethod)) {
      return errorResponse(res, 400, MESSAGES.INVALID_PAYMENT_METHOD);
    }

    // Required Fields
    if (!isRequired(bookingId, amount, paymentMethod)) {
      return errorResponse(
        res,
        400,
        "Booking ID, amount and payment method are required.",
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

    const reservation = await pool.query(
      `
  SELECT id
  FROM reservations
  WHERE booking_id = $1
  `,
      [bookingId],
    );

    if (reservation.rows.length === 0) {
      return errorResponse(res, 404, "Reservation not found.");
    }

    const reservationId = reservation.rows[0].id;

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

    await pool.query(
      `
  UPDATE reservations
  SET payment_status = 'Paid'
  WHERE id = $1
  `,
      [reservationId],
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
