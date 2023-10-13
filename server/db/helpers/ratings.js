const client = require("../client");

const createRating = async ({ user_id, rating_content, posted_at, rating_star }) => {
  try {
    const {
      rows: [ratings],
    } = await client.query(
      `
                INSERT INTO ratings(
                  user_id, 
                  rating_content,
                  posted_at,
                  rating_star)
                VALUES($1, $2, $3, $4)
                RETURNING *;
            `,
      [user_id, rating_content, posted_at, rating_star]
    );
    return ratings;
  } catch (error) {
    throw error;
  }
};

const getAllRatings = async () => {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM ratings;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getRatingByUserId = async (rating_id) => {
  try {
    const {
      rows: [ratings],
    } = await client.query(
      `
              SELECT *
              FROM ratings
              WHERE rating_id = $1
      `,
      [rating_id]
    );
    return ratings;
  } catch (error) {
    throw error;
  }
};

const getRatingsForUser = async (user_id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT r.rating_id, r.rating_content, r.posted_at, r. rating_star
      FROM ratings AS r
      JOIN users AS u ON r.user_id = u.user_id
      WHERE r.user_id = $1;
      `,
      [user_id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
};

const updateRating = async (rating_id, updatedRatingData) => {
  try {
    const {
      rows: [rating],
    } = await client.query(
      `
        UPDATE ratings
        SET
        user_id = $1,
        rating_content = $2,
        posted_at = $3,
        rating_star = $4,
        WHERE event_id = $15
        RETURNING *;
        `,
      [
        updatedEventData.user_id,
        updatedEventData.rating_content,
        updatedEventData.posted_at,
        updatedEventData.rating_star,

        rating_id,
      ]
    );
    return rating;
  } catch (error) {
    throw error;
  }
};

const deleteRating = async (rating_id) => {
  try {
    client.query(
      `
      DELETE FROM ratings
      WHERE user_id = $1
      `,
      [user_id]
    );
    const result = await client.query(
      `
        DELETE FROM users
        WHERE user_id = $1
      `,
      [user_id]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRating,
  getAllRatings,
  getRatingByUserId,
  getRatingsForUser,
  updateRating,
  deleteRating,
};
