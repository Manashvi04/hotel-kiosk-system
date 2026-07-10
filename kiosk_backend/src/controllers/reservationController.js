import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isRequired } from "../utils/validators.js";
import { RESERVATION_STATUS } from "../constants/reservationStatus.js";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";
import { MESSAGES } from "../constants/messages.js";

export const createReservation = async (req, res) => {
  try {
    const {
      bookingId,
      guestId,
      source,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalRooms,
      specialRequests,
    } = req.body;

    // Required Fields
    if (
      !isRequired(
        bookingId,
        guestId,
        source,
        checkInDate,
        checkOutDate,
        totalGuests,
        totalRooms,
      )
    ) {
      return errorResponse(res, 400, "All required fields must be provided.");
    }

    // Basic Validation
    if (Number(totalGuests) <= 0) {
      return errorResponse(res, 400, "Total guests must be greater than zero.");
    }

    if (Number(totalRooms) <= 0) {
      return errorResponse(res, 400, "Total rooms must be greater than zero.");
    }

    const result = await pool.query(
      `
      INSERT INTO reservations
      (
        booking_id,
        guest_id,
        source,
        check_in_date,
        check_out_date,
        total_guests,
        total_rooms,
        status,
        payment_status,
        special_requests
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
      `,
      [
        bookingId,
        guestId,
        source,
        checkInDate,
        checkOutDate,
        totalGuests,
        totalRooms,
        RESERVATION_STATUS.CONFIRMED,
        PAYMENT_STATUS.PENDING,
        specialRequests || null,
      ],
    );

    return successResponse(
      res,
      201,
      "Reservation created successfully.",
      result.rows[0],
    );
  } catch (error) {
    console.error(error);

    // Guest does not exist
    if (error.code === "23503") {
      return errorResponse(res, 404, "Guest not found.");
    }

    // Duplicate Booking ID
    if (error.code === "23505") {
      return errorResponse(res, 409, "Booking ID already exists.");
    }

    return errorResponse(res, 500, "Failed to create reservation.");
  }
};
