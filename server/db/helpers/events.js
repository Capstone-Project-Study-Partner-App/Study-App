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
  group,
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

//FILTERING SECTION
//Get all events, with optional filtering
const getEventsMatchingFilters = async (filters) => {
  try {
    let sql_command = `
        SELECT *
        FROM events
        WHERE 1 = 1
    `;
    let params = [];
    function sql_param(value) {
      params.push(value);
      return `$${params.length}`;
    }

    // for text substring match
    // uses LIKE expression, ie. `email LIKE '%@gmail.com%'`
    // to support lower case, we do eg. `lower(email) LIKE '%gmail.com%`
    // Really going to be used in for the search bar feature
    if (filters.title) {
      sql_command += ` AND lower(title) LIKE ${sql_param(
        `%${filters.title.toLowerCase()}%`
      )}`;
    }

    // for matching booleans
    if (filters.virtual !== undefined) {
      sql_command += ` AND virtual = ${sql_param(filters.virtual)}`;
    }

    if (filters.group !== undefined) {
      sql_command += ` AND "group" = ${sql_param(filters.group)}`;
    }

    // for exact string match, but support multiple acceptable options
    // we use IN expression, ie. `gender IN ('Female', 'Non-binary')
    // note you can search for exactly one match by having a list of one,
    // ie. `gender IN ('Female')` filters for exactly phD only.
    if (filters.gender) {
      sql_command += ` AND gender IN (${filters.gender
        .map(sql_param)
        .join(", ")})`;
    }

    if (filters.topic) {
      sql_command += ` AND topic IN (${filters.topic
        .map(sql_param)
        .join(", ")})`;
    }

    if (filters.age) {
      sql_command += ` AND group IN (${filters.group
        .map(sql_param)
        .join(", ")})`;
    }

    if (filters.timezone) {
      sql_command += ` AND timezone IN (${filters.timezone
        .map(sql_param)
        .join(", ")})`;
    }

    // for array-of-string columns, we want to check if there's any
    // overlap between the filter's selected options and that row's
    // columns' values. To check overlap, we use the array-&& operator
    // ie. `interests && ARRAY['reading', 'gardening']`
    if (filters.days) {
      // Assuming 'days' is an array of days of the week (e.g., ['Monday', 'Wednesday'])
      sql_command += ` AND EXTRACT(DOW FROM datetime) IN (${filters.days
        .map((day) => sql_param(day))
        .join(", ")})`;
    }

    console.log("filtering");
    console.log(sql_command);
    console.log({ filters, params });
    const { rows } = await client.query(sql_command, params);
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

// Get RSVPs for an Event
const getRsvpsForEvent = async (event_id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT r.rsvp_id, r.rsvp_status, u.*
      FROM rsvps AS r
      JOIN users AS u ON r.user_id = u.user_id
      WHERE r.event_id = $1;
      `,
      [event_id]
    );

    return rows;
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
        event_id,
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
  getEventsMatchingFilters,
  getRsvpsForEvent,
};
