const client = require("../client");

const createEvent = async ({
  title,
  description,
  location,
  datetime,
  virtual,
  comments,
  created_at,
  topic,
  duration,
  gender,
  group,
}) => {
  try {
    const {
      rows: [events],
    } = await client.query(
      `
                INSERT INTO events(title, description, location, datetime, virtual, comments, created_at, topic, duration, gender, "group" )
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *;
            `,
      [
        title,
        description,
        location,
        datetime,
        virtual,
        comments,
        created_at,
        topic,
        duration,
        gender,
        group,
      ]
    );
    return events;
  } catch (error) {
    throw error;
  }
};

const getAllEvents = async () => {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM events;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
};

//Get event by ID
const getEventById = async (event_id) => {
  try {
    const {
      rows: [events],
    } = await client.query(
      `
              SELECT *
              FROM events
              WHERE event_id = $1
      `,
      [event_id]
    );
    return events;
  } catch (error) {
    throw error;
  }
};

module.exports = { createEvent, getAllEvents, getEventById };
