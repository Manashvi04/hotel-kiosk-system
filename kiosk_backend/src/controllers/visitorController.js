import pool from "../database/db.js";

export const createVisitor = async (req, res) => {
  try {
    const { reservationId, firstName, lastName, mobile, purpose } = req.body;

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
      [reservationId, firstName, lastName, mobile, purpose],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const checkoutVisitor = async (req, res) => {
  try {
    const { visitorId } = req.body;

    await pool.query(
      `
      UPDATE visitors
      SET
        check_out_time = CURRENT_TIMESTAMP,
        status = 'Checked Out'
      WHERE id = $1
      `,
      [visitorId],
    );

    res.status(200).json({
      message: "Visitor checked out successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
