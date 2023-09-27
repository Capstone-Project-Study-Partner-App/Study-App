const client = require("../client");

// const createMessage = async ({ message_content, sender, receiver }) => {
//   try {
//     const {
//       rows: [message],
//     } = await client.query(
//       `
//         INSERT INTO messages(message_content, sender, receiver)
//         VALUES($1, $2, $3)
//         RETURNING *;
//       `,
//       [message_content, sender, receiver]
//     );
//     return message;
//   } catch (error) {
//     throw error;
//   }
// };

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

const deleteMessage = async (message_id) => {
  try {
    const result = await client.query(
      `
        DELETE FROM messages
        WHERE message_id = $1
      `,
      [message_id]
    );
  } catch (error) {
    throw error;
  }
};

const createMessage = async ({ sender, receiver, message_content, thread_id }) => {
  try {
      let newThreadId = thread_id;
      if (!newThreadId) {
          // create new thread_id when not provided
          const {
              rows: [message],
          } = await client.query('INSERT INTO messages DEFAULT VALUES RETURNING thread_id;');
          newThreadId = message.thread_id;
      } else {
          newThreadId = thread_id; // use the exsisting thread_id
      }
      const {
          rows: [message],
      } = await client.query (
          `
          INSERT INTO messages(sender, receiver, message_content, thread_id)
          VALUES($1, $2, $3, $4)
          RETURNING *;
          `,
          [sender, receiver, message_content, newThreadId]
      )
      return message
  } catch (error) {
      throw error
  }
}

const getMessagesByThread = async (thread_id) => {
  try {
      const { rows } = await client.query(`
      SELECT
      m.message_id,
      m.message_content,
      s.user_id AS sender,
      s.first_name AS sender_first_name,
      s.photo AS sender_photo,
      r.user_id AS receiver,
      r.first_name AS receiver_first_name,
      r.photo AS receiver_photo,
      m.thread_id,
      m.created_at
    FROM
      messages m
    INNER JOIN
      users s ON m.sender = s.user_id
    INNER JOIN
      users r ON m.receiver = r.user_id
    WHERE
      m.thread_id = $1
      ORDER BY
      m.created_at;
      `, [thread_id]);

      return rows;
  } catch (error) {
      throw error;
  }
}

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
  getMessagesByThread
};
