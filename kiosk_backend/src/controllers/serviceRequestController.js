import pool from "../database/db.js";

export const createServiceRequest = async (req, res) => {
  try {
    const { reservationId, serviceType, estimatedTime } = req.body;

    const requestId = "SR" + Math.floor(100000 + Math.random() * 900000);

    const result = await pool.query(
      `
      INSERT INTO service_requests
      (
        request_id,
        reservation_id,
        service_type,
        estimated_time
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [requestId, reservationId, serviceType, estimatedTime],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
