import pool from "../database/db.js";

export const getAvailableRooms = async (req, res) => {
  try {
    const result = await pool.query(`
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
      WHERE rooms.status = 'Available'
      ORDER BY rooms.room_number;
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
