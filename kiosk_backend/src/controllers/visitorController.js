import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isRequired, isValidMobile } from "../utils/validators.js";
import { VISITOR_STATUS } from "../constants/visitorStatus.js";
import { MESSAGES } from "../constants/messages.js";

export const createVisitor = async (req, res) => {
  try {
    const { reservationId, firstName, lastName, mobile, purpose } = req.body;

    // Required Fields
    if (!isRequired(reservationId, firstName, mobile, purpose)) {
      return errorResponse(
        res,
        400,
        "Reservation ID, first name, mobile number and purpose are required.",
      );
    }

    // Mobile Validation
    if (!isValidMobile(mobile)) {
      return errorResponse(
        res,
        400,
        "Mobile number must contain exactly 10 digits.",
      );
    }

    const result = await pool.query(
      `
      INSERT INTO visitors
      (
        reservation_id,
        first_name,
        last_name,
        mobile,
        purpose
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [reservationId, firstName, lastName || null, mobile, purpose],
    );

    return successResponse(
      res,
      201,
      "Visitor added successfully.",
      result.rows[0],
    );
  } catch (error) {
    console.error(error);

    // Reservation doesn't exist
    if (error.code === "23503") {
      return errorResponse(res, 404, "Reservation not found.");
    }

    return errorResponse(res, 500, "Failed to add visitor.");
  }
};

export const checkoutVisitor = async (req, res) => {
  try {
    const { visitorId } = req.body;

    if (!isRequired(visitorId)) {
      return errorResponse(res, 400, "Visitor ID is required.");
    }

    const result = await pool.query(
      `
      UPDATE visitors
      SET
        check_out_time = CURRENT_TIMESTAMP,
        status = $1
      WHERE id = $2
      RETURNING *
      `,
      [VISITOR_STATUS.CHECKED_OUT, visitorId],
    );

    if (result.rowCount === 0) {
      return errorResponse(res, 404, "Visitor not found.");
    }

    return successResponse(
      res,
      200,
      "Visitor checked out successfully.",
      result.rows[0],
    );
  } catch (error) {
    console.error(error);

    return errorResponse(res, 500, "Failed to checkout visitor.");
  }
};
