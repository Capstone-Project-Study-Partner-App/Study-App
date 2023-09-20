const client = require("../client");

const createMessage = async ({ message_content, sender, receiver }) => {
  try {
    const {
      rows: [message],
    } = await client.query(
      `
        INSERT INTO messages(message_content, sender, receiver)
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [message_content, sender, receiver]
    );
    return message;
  } catch (error) {
    throw error;
  }
};

// Get all Messages
const getAllMessages = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM messages;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Get Message by ID
const getMessageById = async (message_id) => {
  try {
    const {
      rows: [message],
    } = await client.query(
      `
        SELECT *
        FROM messages
        WHERE message_id = $1
      `,
      [message_id]
    );
    return message;
  } catch (error) {
    throw error;
  }
};

module.exports = { createMessage, getAllMessages, getMessageById };
