import pool from "../database/db.js";

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
      status,
      paymentStatus,
      specialRequests,
    } = req.body;

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
        status,
        paymentStatus,
        specialRequests,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
