const client = require("../client");

//* Potentially change "users" to just "user" for better clarification *
const createUser = async ({
  first_name,
  last_name,
  email,
  gender,
  password,
  location,
  about_me,
  education,
  education_level,
  classes,
  days_available,
  times_available,
  timezone,
  interests,
  photo,
  languages,
  study_habits,
  major,
  age,
  work
}) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(first_name,
          last_name,
          email,
          gender,
          password,
          location,
          about_me,
          education,
          education_level,
          classes,
          days_available,
          times_available,
          timezone,
          interests,
          photo,
          languages,
          study_habits,
          major,
          age,
          work)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        RETURNING *;
      `,
      [
        first_name,
        last_name,
        email,
        gender,
        password,
        location,
        about_me,
        education,
        education_level,
        classes,
        days_available,
        times_available,
        timezone,
        interests,
        photo,
        languages,
        study_habits,
        major,
        age,
        work
      ]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

//Get all Users
const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM users;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
};

//Get user by ID
const getUserById = async (user_id) => {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
              SELECT *
              FROM users
              WHERE user_id = $1
      `,
      [user_id]
    );
    return users;
  } catch (error) {
    throw error;
  }
};

// PUT - /api/users/:user_id - update a user
const updateUser = async (user_id, updatedUserData) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET
        first_name = $1,
        last_name = $2,
        email = $3,
        gender = $4,
        password = $5,
        location = $6,
        about_me = $7,
        education = $8,
        education_level = $9,
        classes = $10,
        days_available = $11,
        times_available = $12,
        timezone= $13,
        interests = $14,
        photo = $15,
        languages = $16,
        study_habits = $17,
        major = $18,
        age = $19,
        work = $20
        WHERE user_id = $21
        RETURNING *;
        `,
      [
        updatedUserData.first_name,
        updatedUserData.last_name,
        updatedUserData.email,
        updatedUserData.gender,
        updatedUserData.password,
        updatedUserData.location,
        updatedUserData.about_me,
        updatedUserData.education,
        updatedUserData.education_level,
        updatedUserData.classes,
        updatedUserData.days_available,
        updatedUserData.times_available,
        updatedUserData.timezone,
        updatedUserData.interests,
        updatedUserData.photo,
        updatedUserData.languages,
        updatedUserData.study_habits,
        updatedUserData.major,
        updatedUserData.age,
        updatedUserData.work,
        user_id
      ]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (user_id) => {
  try {
    client.query(
      `
      DELETE FROM messages
      WHERE sender = $1
      `,
      [user_id]
    );
    client.query(
      `
      DELETE FROM messages
      WHERE receiver = $1
      `,
      [user_id]
    );
    client.query(
        `
        DELETE FROM rsvps
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

const getUserMessages = async (user_id) => {
  try {
      const result = await client.query(`
          SELECT
              m.message_id,
              m.message_content,
              s.user_id AS sender,
              s.first_name AS sender_first_name,
              s.photo AS sender_photo,
              r.user_id AS receiver,
              r.first_name AS receiver_first_name,
              r.photo AS receiver_photo,
              m.thread_id
          FROM
              messages m
          INNER JOIN
              users s ON m.sender = s.user_id
          INNER JOIN
              users r ON m.receiver = r.user_id
          WHERE
              s.user_id = $1;
      `, [user_id]);

      const messages = result.rows; 

      return messages;
  } catch (error) {
      throw error;
  }
}



module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserMessages
};
