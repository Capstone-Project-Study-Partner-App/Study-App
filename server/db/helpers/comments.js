const client = require("../client");


// Create comment
const createComment = async ({ user_id, event_id, comment_content }) => {
  try {

    const {
      rows: [commentWithUserData],
    } = await client.query(
      `
      INSERT INTO comments(user_id, event_id, comment_content)
      VALUES($1, $2, $3)
      RETURNING *,
        (SELECT first_name FROM users WHERE user_id = $1) AS user_first_name,
        (SELECT photo FROM users WHERE user_id = $1) AS user_photo;
      `,
      [user_id, event_id, comment_content]
    );

    return commentWithUserData;
  } catch (error) {
    throw error;
  }
};


// Get comments by Event ID
const getCommentsByEventId = async (event_id) => {
    try {
      const {
        rows: comments,
      } = await client.query(
        `
        SELECT 
        c.comment_id, 
        c.comment_content, 
        c.created_at,
        c.event_id,
        u.user_id AS user_id,
        u.first_name AS user_first_name, 
        u.last_name AS user_last_name, 
        u.photo AS user_photo
        FROM comments c
        INNER JOIN users u ON c.user_id = u.user_id
        WHERE c.event_id = $1
        ORDER BY c.created_at;
        `,
        [event_id]
      );
      return comments;
    } catch (error) {
      throw error;
    }
  };

  // Delete comment (maybe not necessary?)
  const deleteComment = async (comment_id) => {
    try {
      const result = await client.query(
        `
          DELETE FROM comments
          WHERE comment_id = $1
        `,
        [comment_id]
      );
    } catch (error) {
      throw error;
    }
  };

  module.exports = {
    createComment,
    getCommentsByEventId,
    deleteComment
  };