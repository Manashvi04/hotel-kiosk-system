import pool from "../database/db.js";

import { successResponse, errorResponse } from "../utils/response.js";

import { VERIFICATION_STATUS } from "../constants/identityverification.js";

export const verifyIdentity = async (req, res) => {
  try {
    const { bookingId, documentType } = req.body;

    if (!bookingId || !documentType) {
      return errorResponse(
        res,
        400,
        "Booking ID and document type are required.",
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

    const existingVerification = await pool.query(
      `
  SELECT id
  FROM identity_verifications
  WHERE reservation_id = $1
  `,
      [reservationId],
    );

    if (existingVerification.rows.length > 0) {
      return errorResponse(res, 409, "Identity has already been verified.");
    }

    const result = await pool.query(
      `
      INSERT INTO identity_verifications
      (
        reservation_id,
        document_type,
        verification_status
      )
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [reservationId, documentType, VERIFICATION_STATUS.VERIFIED],
    );

    return successResponse(
      res,
      201,
      "Identity verified successfully.",
      result.rows[0],
    );
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      return errorResponse(res, 404, "Reservation not found.");
    }

    return errorResponse(res, 500, "Failed to verify identity.");
  }
};
