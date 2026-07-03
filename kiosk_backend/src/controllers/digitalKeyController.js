import pool from "../database/db.js";

export const createDigitalKey = async (req, res) => {
  try {
    const { reservationId, validUntil } = req.body;

    const keyNumber = "KEY" + Math.floor(100000 + Math.random() * 900000);

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
      [reservationId, keyNumber, validUntil, "Active"],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
