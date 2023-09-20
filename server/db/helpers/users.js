const client = require("../client");

//* Potentially change "users" to just "user" for better clarification *
const createUser = async ({
  email,
  password,
  dob,
  first_name,
  last_name,
  location,
  about_me,
  education_level,
  work,
  education,
  classes,
  skills,
  availibility,
  interests,
  photo,
  languages,
  study_habits,
  major,
}) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(email, password, dob, first_name, last_name, location, about_me, education_level, work, education, classes, skills, availibility, interests, photo, languages, study_habits, major)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *;
      `,
      [
        email,
        password,
        dob,
        first_name,
        last_name,
        location,
        about_me,
        education_level,
        work,
        education,
        classes,
        skills,
        availibility,
        interests,
        photo,
        languages,
        study_habits,
        major,
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

module.exports = { createUser, getAllUsers, getUserById };
