import pool from "../database/db.js";

export const checkoutGuest = async (req, res) => {
  try {
    const { reservationId } = req.body;

    // Update reservation
    await pool.query(
      `
      UPDATE reservations
      SET
        actual_status = 'Checked Out',
        checked_out_at = CURRENT_TIMESTAMP
      WHERE id = $1
      `,
      [reservationId],
    );

    // Deactivate digital key
    await pool.query(
      `
      UPDATE digital_keys
      SET status = 'Inactive'
      WHERE reservation_id = $1
      `,
      [reservationId],
    );

    res.status(200).json({
      message: "Checkout completed successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
