import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isRequired } from "../utils/validators.js";
import { DIGITAL_KEY_STATUS } from "../constants/digitalKeyStatus.js";
import { MESSAGES } from "../constants/messages.js";

export const createDigitalKey = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!isRequired(bookingId)) {
      return errorResponse(
        res,
        400,
        "Reservation ID and validity date are required.",
      );
    }

    const reservation = await pool.query(
      `
  SELECT id, check_out_date
  FROM reservations
  WHERE booking_id = $1
  `,
      [bookingId],
    );

    const reservationId = reservation.rows[0].id;
    const validUntil = reservation.rows[0].check_out_date;

    if (reservation.rows.length === 0) {
      return errorResponse(res, 404, "Reservation not found.");
    }

    const keyNumber =
      "KEY-" +
      Date.now().toString().slice(-6) +
      Math.floor(Math.random() * 100);

    const result = await pool.query(
      `
      INSERT INTO digital_keys
      (
        reservation_id,
        key_number,
        valid_until,
        status
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [reservationId, keyNumber, validUntil, DIGITAL_KEY_STATUS.ACTIVE],
    );

    return successResponse(
      res,
      201,
      "Digital key generated successfully.",
      result.rows[0],
    );
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      return errorResponse(res, 404, "Reservation not found.");
    }

    if (error.code === "23505") {
      return errorResponse(
        res,
        409,
        "Digital key already exists for this reservation.",
      );
    }

    return errorResponse(res, 500, "Failed to generate digital key.");
  }
};
