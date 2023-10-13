const client = require("../client");

// Get all Rsvps
const getAllRsvps = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM rsvps;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Get Rsvp by ID
const getRsvpById = async (rsvp_id) => {
  try {
    const {
      rows: [rsvps],
    } = await client.query(
      `
        SELECT *
        FROM rsvps
        WHERE rsvp_id = $1
      `,
      [rsvp_id]
    );
    return rsvps;
  } catch (error) {
    throw error;
  }
};

// Get Rsvps by Event ID
const getRsvpByEventId = async (rsvp_id) => {
  try {
    const {
      rows: [rsvps],
    } = await client.query(
      `
        SELECT *
        FROM rsvps
        WHERE event_id = $1
      `,
      [rsvp_id]
    );
    return rsvps;
  } catch (error) {
    throw error;
  }
};

// Edit RSVP
const updateRsvp = async (rsvp_id, updatedRsvpData) => {
  try {
    const {
      rows: [rsvp],
    } = await client.query(
      `
        UPDATE rsvps
        SET
        rsvp_status = $1
        WHERE rsvp_id = $2
        RETURNING *;
        `,
      [rsvp_id, updatedRsvpData.rsvp_status]
    );
    return rsvp;
  } catch (error) {
    throw error;
  }
};

// Get Rsvps by User ID
const getRsvpByUserId = async (user_id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT e.*
      FROM rsvps AS r
      INNER JOIN events AS e ON r.event_id = e.event_id
      WHERE r.user_id = $1
        AND r.rsvp_status = true
      ORDER BY e.datetime;
      `,
      [user_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

// Create an RSVP
const createRsvp = async ({ user_id, event_id }) => {
  try {
    const {
      rows: [rsvp],
    } = await client.query(
      `
        INSERT INTO rsvps(user_id, event_id, rsvp_status)
        VALUES($1, $2, true)
        RETURNING *;
      `,
      [user_id, event_id]
    );
    return rsvp;
  } catch (error) {
    throw error;
  }
};

// Delete an RSVP
const deleteRsvp = async ({ user_id, event_id }) => {
  try {
    const result = await client.query(
      `
        DELETE FROM rsvps
        WHERE user_id = $1
        AND event_id = $2;
      `,
      [user_id, event_id]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRsvps,
  getRsvpById,
  getRsvpByEventId,
  updateRsvp,
  getRsvpByUserId,
  createRsvp,
  deleteRsvp,
};
