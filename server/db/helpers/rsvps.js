const client = require("../client");

const createRsvp = async ({ user_id, event_id, rsvp_status }) => {
  try {
    const {
      rows: [rsvps],
    } = await client.query(
      `
        INSERT INTO rsvps(user_id, event_id, rsvp_status)
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [user_id, event_id, rsvp_status]
    );
    return rsvps;
  } catch (error) {
    throw error;
  }
};

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

module.exports = {
  createRsvp,
  getAllRsvps,
  getRsvpById,
  getRsvpByEventId,
  updateRsvp,
};
