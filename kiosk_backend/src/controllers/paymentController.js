import pool from "../database/db.js";

export const createPayment = async (req, res) => {
  try {
    const {
      reservationId,
      amount,
      paymentMethod,
      paymentStatus,
      transactionId,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO payments
      (
        reservation_id,
        amount,
        payment_method,
        payment_status,
        transaction_id
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [reservationId, amount, paymentMethod, paymentStatus, transactionId],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
