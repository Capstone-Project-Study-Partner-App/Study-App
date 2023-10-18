const client = require("../client");


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

// Get Message Thread by sender & receiver
const getExistingThread = async (sender, receiver) => {
  try {
    const { rows } = await client.query(
      `
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
        m.is_read
      FROM
        messages m
      INNER JOIN
        users s ON m.sender = s.user_id
      INNER JOIN
        users r ON m.receiver = r.user_id
      WHERE 
        (m.sender = $1 AND m.receiver = $2) 
      OR 
          (m.sender = $2 AND m.receiver = $1)
      ORDER BY
          m.created_at;
      `,
      [sender, receiver]
    );
    return rows;
  } catch (error) {
    console.error("Error in getExistingThread:", error);
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
    if (!thread_id) {
      // Checks if a thread already exists between sender and receiver
      const {
        rows: [existingThread],
      } = await client.query(
        `
        SELECT thread_id
        FROM messages
        WHERE (sender = $1 AND receiver = $2) 
        OR (sender = $2 AND receiver = $1)
        `,
        [sender, receiver]
      );

      if (existingThread) {
        thread_id = existingThread.thread_id;
      } else {
        // If no existing thread, creates new thread_id
        const {
          rows: [message],
        } = await client.query('INSERT INTO messages DEFAULT VALUES RETURNING thread_id;');
        thread_id = message.thread_id;
      }
    }

    // Photo autopopulate with new message
    const {
      rows: [messageWithPhoto],
    } = await client.query(
      `
      INSERT INTO messages(sender, receiver, message_content, thread_id)
      VALUES($1, $2, $3, $4)
      RETURNING *, (SELECT photo FROM users WHERE user_id = $1) AS sender_photo;
      `,
      [sender, receiver, message_content, thread_id]
    );

    return messageWithPhoto;
  } catch (error) {
    throw error;
  }
};

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
      m.is_read
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
};

// Get unread messages
const getUnreadMessages = async (receiver) => {
  try {
    // Fetch the unread messages
    const { rows: unreadMessages } = await client.query(
      `
      SELECT
        m.message_id,
        m.sender AS sender_id,
        m.message_content AS message_content,
        m.thread_id AS thread_id,
        m.created_at AS created_at,
        u.first_name AS sender_first_name,
        u.last_name AS sender_last_name,
        u.photo AS sender_photo,
        m.is_read
      FROM messages m
      INNER JOIN users u ON m.sender = u.user_id
      WHERE m.receiver = $1 AND m.is_read = FALSE;
      `,
      [receiver]
    );


    // Calculate unread count
    const { rows: unreadCount } = await client.query(
      `
      SELECT COUNT(*) as unread_count
      FROM messages
      WHERE receiver = $1 AND is_read = FALSE;
      `,
      [receiver]
    );


    return {
      unread_count: unreadCount[0].unread_count,
      unread_messages: unreadMessages,
    };
  } catch (error) {
    throw error;
  }
};



// Mark message as read
const markMessageAsRead = async (receiver, message_id) => {
  try {
    const result = await client.query(
      `
      UPDATE messages
      SET is_read = TRUE
      WHERE message_id = $1 AND receiver = $2
      RETURNING *;  
      `,
      [message_id, receiver]
    );


    if (result.rows.length === 0) {
      return null; 
    }


    return result.rows[0];
  } catch (error) {
    throw error;
  }
};






module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
  getMessagesByThread,
  getExistingThread,
  getUnreadMessages,
  markMessageAsRead
};