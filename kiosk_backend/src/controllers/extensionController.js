import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isRequired } from "../utils/validators.js";
import { MESSAGES } from "../constants/messages.js";

export const createExtension = async (req, res) => {
  const client = await pool.connect();

  try {
    const { reservationId, additionalNights, amount } = req.body;

    // Validation
    if (!isRequired(reservationId, additionalNights, amount)) {
      return errorResponse(
        res,
        400,
        "Reservation ID, additional nights and amount are required.",
      );
    }

    if (Number(additionalNights) <= 0) {
      return errorResponse(
        res,
        400,
        "Additional nights must be greater than zero.",
      );
    }

    if (Number(amount) <= 0) {
      return errorResponse(res, 400, "Amount must be greater than zero.");
    }

    await client.query("BEGIN");

    const extensionResult = await client.query(
      `
      INSERT INTO extensions
      (
        reservation_id,
        additional_nights,
        amount,
        status
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [reservationId, additionalNights, amount, "Approved"],
    );

    await client.query(
      `
      UPDATE reservations
      SET check_out_date =
          check_out_date + ($1 * INTERVAL '1 day')
      WHERE id = $2
      `,
      [additionalNights, reservationId],
    );

    await client.query(
      `
      UPDATE digital_keys
      SET valid_until =
          valid_until + ($1 * INTERVAL '1 day')
      WHERE reservation_id = $2
      `,
      [additionalNights, reservationId],
    );

    await client.query("COMMIT");

    return successResponse(
      res,
      201,
      "Room extension approved successfully.",
      extensionResult.rows[0],
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error);

    if (error.code === "23503") {
      return errorResponse(res, 404, "Reservation not found.");
    }

    return errorResponse(res, 500, "Failed to extend reservation.");
  } finally {
    client.release();
  }
};
