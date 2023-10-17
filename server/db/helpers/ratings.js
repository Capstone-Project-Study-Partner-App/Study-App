const client = require("../client");
const util = require("../../api/utils")

const createRating = async ({
  user_id,
  creator_id,
  rating_content,
  posted_at,
  rating_star,
}) => {
  try {
    const {
      rows: [ratings],
    } = await client.query(
      `
                INSERT INTO ratings(
                  user_id, 
                  creator_id,
                  rating_content,
                  posted_at,
                  rating_star)
                VALUES($1, $2, $3, $4, $5)
                RETURNING *;
            `,
      [user_id, creator_id, rating_content, posted_at, rating_star]
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

const getRatingById = async (rating_id) => {
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
      SELECT r.rating_id, r.creator_id, r.rating_content, r.posted_at, r. rating_star
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

async function updateRating(rating_id, fields) {
  try {
      const toUpdate = {}
      for (let column in fields) {
          if (fields[column] !== undefined) toUpdate[column] = fields[column];
      }
      let rating;

      if (util.dbFields(toUpdate).insert.length > 0) {
          const { rows } = await client.query(`
          UPDATE ratings
          SET ${util.dbFields(toUpdate).insert}
          WHERE "rating_id"=${rating_id}
          RETURNING *;
        `, Object.values(toUpdate));
          rating = rows[0];
      }

      return rating;
  } catch (error) {
      throw error
  }
}

// const updateRating = async (rating_id, updatedRatingData) => {
//   try {
//     // console.log ("entering update in db helpers")
//     const { rows:[rating] } = await client.query(
//       `UPDATE ratings
//       SET       
//       user_id = $1,
//       creator_id = $2,
//       rating_content = $3,
//       posted_at = $4,
//       rating_star = $5
//       WHERE rating_id = $6
//       RETURNING *;
//       `,
//       [
//         updatedRatingData.user_id,
//         updatedRatingData.creator_id,
//         updatedRatingData.rating_content,
//         updatedRatingData.posted_at,
//         updatedRatingData.rating_star,

//         rating_id
//       ]
//     );
//     return rating;
//   } catch (error) {
//     throw error;
//   }
// };

// const deleteRating = async (rating_id) => {
//   try {
//     client.query(
//       `
//       DELETE FROM ratings
//       WHERE rating_id = $1
//       `,
//       [rating_id]
//     );
//     // const result = await client.query(
//     //   `
//     //     DELETE FROM ratings
//     //     WHERE rating_id = $1
//     //   `,
//     //   [rating_id]
//     // );
//   } catch (error) {
//     throw error;
//   }
// };

const deleteRating = async (rating_id) => {
  try {
    const { rows } = await client.query(
      `
            DELETE FROM ratings
            WHERE rating_id = $1
            RETURNING *;
            `,
            [rating_id]
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
  getRatingById,
};