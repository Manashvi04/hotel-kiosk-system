import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isValidEmail, isValidMobile } from "../utils/validators.js";
import { MESSAGES } from "../constants/messages.js";

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

    // Required Fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !idType ||
      !documentNumber
    ) {
      return errorResponse(res, 400, "All required fields must be provided.");
    }

    // Email Validation
    if (!isValidEmail(email)) {
      return errorResponse(res, 400, "Invalid email address.");
    }

    // Mobile Validation
    if (!isValidMobile(mobile)) {
      return errorResponse(
        res,
        400,
        "Mobile number must contain exactly 10 digits.",
      );
    }

    const result = await pool.query(
      `
      INSERT INTO guests
      (
        first_name,
        last_name,
        email,
        mobile,
        id_type,
        document_number,
        verified_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        firstName,
        lastName,
        email,
        mobile,
        idType,
        documentNumber,
        verifiedId ?? false,
      ],
    );

    return successResponse(res, 201, MESSAGES.GUEST_CREATED, result.rows[0]);
  } catch (error) {
    console.error(error);

    // PostgreSQL unique constraint violation
    if (error.code === "23505") {
      return errorResponse(
        res,
        409,
        "Guest already exists with the provided email, mobile number, or document number.",
      );
    }

    return errorResponse(res, 500, "Failed to create guest.");
  }
};
