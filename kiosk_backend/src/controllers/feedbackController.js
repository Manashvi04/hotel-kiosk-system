import pool from "../database/db.js";

export const createFeedback = async (req, res) => {
  try {
    const { reservationId, rating, comments } = req.body;

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
      [reservationId, rating, comments],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
