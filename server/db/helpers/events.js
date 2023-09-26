const client = require("../client");

const createEvent = async ({
  title,
  description,
  location,
  address,
  datetime,
  timezone,
  virtual,
  comments,
  topic,
  duration,
  gender,
  group
}) => {
  try {
    const {
      rows: [events],
    } = await client.query(
      `
                INSERT INTO events(
                  title,
                  description,
                  location,
                  address,
                  datetime,
                  timezone,
                  virtual,
                  comments,
                  topic,
                  duration,
                  gender,
                  "group")
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING *;
            `,
      [
        title,
        description,
        location,
        address,
        datetime,
        timezone,
        virtual,
        comments,
        topic,
        duration,
        gender,
        group
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

const updateEvent = async (event_id, updatedEventData) => {
  try {
    const {
      rows: [event],
    } = await client.query(
      `
        UPDATE events
        SET
        title = $1,
        description = $2,
        location = $3,
        address = $4,
        datetime = $5,
        timezone = $6,
        virtual = $7,
        comments = $8,
        topic = $9,
        duration = $10,
        gender = $11,
        "group" = $12
        WHERE event_id = $13
        RETURNING *;
        `,
      [
        updatedEventData.title,
        updatedEventData.description,
        updatedEventData.location,
        updatedEventData.address,
        updatedEventData.datetime,
        updatedEventData.timezone,
        updatedEventData.virtual,
        updatedEventData.comments,
        updatedEventData.topic,
        updatedEventData.duration,
        updatedEventData.gender,
        updatedEventData.group,
        event_id
      ]
    );
    return event;
  } catch (error) {
    throw error;
  }
};

const deleteEvent = async (event_id) => {
  try {
    client.query(
      `
      DELETE FROM rsvps
      WHERE event_id = $1
      `,
      [event_id]
    );
    const result = await client.query(
      `
        DELETE FROM events
        WHERE event_id = $1
      `,
      [event_id]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
