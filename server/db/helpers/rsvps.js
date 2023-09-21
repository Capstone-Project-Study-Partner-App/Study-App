const client = require("../client");

const createRsvp = async ({ rsvp_status, user_id, event_id }) => {
  try {
    const {
      rows: [rsvps],
    } = await client.query(
      `
        INSERT INTO rsvps(rsvp_status, user_id, event_id)
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [rsvp_status, user_id, event_id]
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
        rsvp_status = $1, 
        user_id = $2, 
        event_id = $3,
        WHERE user_id = $4
        RETURNING *;
        `,
      [updatedRsvpData.rsvp_status]
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
