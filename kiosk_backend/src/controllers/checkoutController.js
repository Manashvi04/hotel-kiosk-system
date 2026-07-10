import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isRequired } from "../utils/validators.js";
import { RESERVATION_STATUS } from "../constants/reservationStatus.js";
import { DIGITAL_KEY_STATUS } from "../constants/digitalKeyStatus.js";
import { MESSAGES } from "../constants/messages.js";

export const checkoutGuest = async (req, res) => {
  const client = await pool.connect();

  try {
    const { reservationId } = req.body;

    // Validation
    if (!isRequired(reservationId)) {
      return errorResponse(res, 400, "Reservation ID is required.");
    }

    await client.query("BEGIN");

    // Update Reservation
    const reservationResult = await client.query(
      `
      UPDATE reservations
      SET
        status = $1,
        checked_out_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
      `,
      [RESERVATION_STATUS.CHECKED_OUT, reservationId],
    );

    if (reservationResult.rowCount === 0) {
      await client.query("ROLLBACK");

      return errorResponse(res, 404, "Reservation not found.");
    }

    // Deactivate Digital Key
    await client.query(
      `
      UPDATE digital_keys
      SET status = $1
      WHERE reservation_id = $2
      `,
      [DIGITAL_KEY_STATUS.INACTIVE, reservationId],
    );

    await client.query("COMMIT");

    return successResponse(
      res,
      200,
      MESSAGES.CHECKOUT_SUCCESS,
      reservationResult.rows[0],
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error);

    return errorResponse(res, 500, "Failed to complete checkout.");
  } finally {
    client.release();
  }
};
