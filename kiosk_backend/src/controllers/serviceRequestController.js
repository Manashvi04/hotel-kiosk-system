import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isRequired } from "../utils/validators.js";
import { SERVICE_REQUEST_STATUS } from "../constants/serviceRequestStatus.js";
import { SERVICE_TYPE } from "../constants/serviceType.js";
import { MESSAGES } from "../constants/messages.js";

export const createServiceRequest = async (req, res) => {
  try {
    const { reservationId, serviceType, estimatedTime } = req.body;

    const allowedServices = Object.values(SERVICE_TYPE);

    if (!allowedServices.includes(serviceType)) {
      return errorResponse(res, 400, "Invalid service type.");
    }

    // Required Fields
    if (!isRequired(reservationId, serviceType, estimatedTime)) {
      return errorResponse(
        res,
        400,
        "Reservation ID, service type and estimated time are required.",
      );
    }

    // Generate Request ID
    const requestId =
      "SR-" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100);

    const result = await pool.query(
      `
      INSERT INTO service_requests
      (
        request_id,
        reservation_id,
        service_type,
        estimated_time,
        status
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        requestId,
        reservationId,
        serviceType,
        estimatedTime,
        SERVICE_REQUEST_STATUS.PENDING,
      ],
    );

    return successResponse(
      res,
      201,
      "Service request created successfully.",
      result.rows[0],
    );
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      return errorResponse(res, 404, "Reservation not found.");
    }

    return errorResponse(res, 500, "Failed to create service request.");
  }
};
