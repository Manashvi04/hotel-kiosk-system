import pool from "../database/db.js";

export const createGuest = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      idType,
      documentNumber,
      verifiedId,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO guests
      (first_name, last_name, email, mobile, id_type, document_number, verified_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [firstName, lastName, email, mobile, idType, documentNumber, verifiedId],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
