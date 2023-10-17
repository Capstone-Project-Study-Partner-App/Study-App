const client = require("../client");

const createCheckIn = async ({
    user_id,
    date,
    response,
  }) => {
    try {
      const {
        rows: [checkin],
      } = await client.query(
        `
          INSERT INTO daily_check_in(user_id, date, response)
          VALUES($1, $2, $3)
          RETURNING *;
        `,
        [user_id, date, response]
      );
      return checkin;
    } catch (error) {
      throw error;
    }
  };


  const getCheckInByUserId = async (user_id) => {
    try {
      const {
        rows: [checkin],
      } = await client.query(
        `
          SELECT *
          FROM daily_check_in
          WHERE user_id = $1
          ORDER BY date DESC
          LIMIT 1;
        `,
        [user_id]
      );
      return checkin;
    } catch (error) {
      throw error;
    }
  };





module.exports = {
    createCheckIn,
    getCheckInByUserId
};
