import pool from "../database/db.js";

export const createExtension = async (req, res) => {
  try {
    const { reservationId, additionalNights, amount, status } = req.body;

    const result = await pool.query(
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
      [reservationId, additionalNights, amount, status],
    );

    await pool.query(
      `
      UPDATE reservations
      SET check_out_date =
          check_out_date + ($1 * INTERVAL '1 day')
      WHERE id = $2
      `,
      [additionalNights, reservationId],
    );

    await pool.query(
      `
      UPDATE digital_keys
      SET valid_until =
          valid_until + ($1 * INTERVAL '1 day')
      WHERE reservation_id = $2
      `,
      [additionalNights, reservationId],
    );

    res.status(201).json({
      message: "Extension approved successfully",
      extension: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
