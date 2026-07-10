import pool from "../database/db.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { ROOM_STATUS } from "../constants/roomStatus.js";
import { MESSAGES } from "../constants/messages.js";

export const getAvailableRooms = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        rooms.id,
        rooms.room_number,
        rooms.floor,
        rooms.status,
        room_types.name,
        room_types.description,
        room_types.capacity,
        room_types.price
      FROM rooms
      JOIN room_types
      ON rooms.room_type_id = room_types.id
      WHERE rooms.status = $1
      ORDER BY rooms.room_number
      `,
      [ROOM_STATUS.AVAILABLE],
    );

    if (result.rows.length === 0) {
      return successResponse(res, 200, "No rooms available.", []);
    }

    return successResponse(
      res,
      200,
      "Available rooms fetched successfully.",
      result.rows,
    );
  } catch (error) {
    console.error(error);

    return errorResponse(res, 500, "Failed to fetch available rooms.");
  }
};
