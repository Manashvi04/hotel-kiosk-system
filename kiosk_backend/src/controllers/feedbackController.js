import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isRequired, isValidRating } from "../utils/validators.js";
import { MESSAGES } from "../constants/messages.js";

export const createFeedback = async (req, res) => {
  try {
    const { reservationId, rating, comments } = req.body;

    // Required Fields
    if (!isRequired(reservationId, rating)) {
      return errorResponse(res, 400, "Reservation ID and rating are required.");
    }

    // Valid Rating
    if (!isValidRating(Number(rating))) {
      return errorResponse(res, 400, "Rating must be between 1 and 5.");
    }

    const result = await pool.query(
      `
      INSERT INTO feedbacks
      (
        reservation_id,
        rating,
        comments
      )
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [reservationId, rating, comments || null],
    );

    return successResponse(res, 201, MESSAGES.FEEDBACK_CREATED, result.rows[0]);
  } catch (error) {
    console.error(error);

    // Foreign key violation
    if (error.code === "23503") {
      return errorResponse(res, 404, "Reservation not found.");
    }

    return errorResponse(res, 500, "Failed to submit feedback.");
  }
};
