const client = require("../client");

//Create Favorite instance AKA "like someone"
const createFavorite = async ({ liker_id, liked_id }) => {
  try {
    const {
      rows: [favorite],
    } = await client.query(
      `
        INSERT INTO favorite_buddies(liker, liked)
        VALUES($1, $2 )
        RETURNING *;
      `,
      [liker_id, liked_id]
    );
    return favorite;
  } catch (error) {
    throw error;
  }
};

// Check if a favorite instance exists for a liker and liked
const checkIfFavoriteExists = async ({ liker_id, liked_id }) => {
  try {
    const result = await client.query(
      `
        SELECT EXISTS (
          SELECT 1
          FROM favorite_buddies
          WHERE liker = $1
          AND liked = $2
        ) AS exists;
      `,
      [liker_id, liked_id]
    );

    // The result will have a single row with a boolean column 'exists'
    // Return the boolean value (true if a row exists, false if not)
    return result.rows[0].exists;
  } catch (error) {
    throw error;
  }
};

const getFavoritesForUser = async ({ liker_id }) => {
  try {
    const { rows: favorites } = await client.query(
      `
        SELECT U.*
        FROM favorite_buddies AS FB
        JOIN users AS U ON FB.liked = U.user_id
        WHERE FB.liker = $1
      `,
      [liker_id]
    );
    return favorites;
  } catch (error) {
    throw error;
  }
};

// Delete Favorite AKA "unlike someone"
const deleteFavorite = async ({ liker_id, liked_id }) => {
  try {
    const result = await client.query(
      `
        DELETE FROM favorite_buddies
        WHERE liker = $1
        AND liked = $2
      `,
      [liker_id, liked_id]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFavorite,
  getFavoritesForUser,
  deleteFavorite,
  checkIfFavoriteExists,
};
