const { hashedPassword } = require("../../api/utils");
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
  work,
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
        await hashedPassword(password),
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
        work,
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

//FILTERING SECTION
//Get all users, with optional filtering
const getUsersMatchingFilters = async (filters) => {
  try {
    let sql_command = `
        SELECT *
        FROM users
        WHERE 1 = 1
    `;
    let params = [];
    function sql_param(value) {
      params.push(value);
      return `$${params.length}`;
    }

    // for text substring match
    // uses LIKE expression, ie. `email LIKE '%@gmail.com%'`
    // to support lower case, we do eg. `lower(email) LIKE '%gmail.com%`
    // Really going to be used in for the search bar feature
    if (filters.email) {
      sql_command += ` AND lower(email) LIKE ${sql_param(
        `%${filters.email.toLowerCase()}%`
      )}`;
    }

    if (filters.first_name) {
      sql_command += ` AND lower(first_name) LIKE ${sql_param(
        `%${filters.first_name.toLowerCase()}%`
      )}`;
    }

    if (filters.last_name) {
      sql_command += ` AND lower(last_name) LIKE ${sql_param(
        `%${filters.last_name.toLowerCase()}%`
      )}`;
    }

    if (filters.about_me) {
      sql_command += ` AND lower(about_me) LIKE ${sql_param(
        `%${filters.about_me.toLowerCase()}%`
      )}`;
    }

    // for exact string match, but support multiple acceptable options
    // we use IN expression, ie. `education_level IN ('phD', 'highschool')
    // note you can search for exactly one match by having a list of one,
    // ie. `education_level IN ('phD')` filters for exactly phD only.
    if (filters.education_level) {
      sql_command += ` AND education_level IN (${filters.education_level
        .map(sql_param)
        .join(", ")})`;
    }

    if (filters.gender) {
      sql_command += ` AND gender IN (${filters.gender
        .map(sql_param)
        .join(", ")})`;
    }

    if (filters.major) {
      sql_command += ` AND major IN (${filters.major
        .map(sql_param)
        .join(", ")})`;
    }

    if (filters.age) {
      sql_command += ` AND age IN (${filters.age
        .map(sql_param)
        .join(", ")})`;
    }

    if (filters.study_habits) {
      sql_command += ` AND study_habits IN (${filters.study_habits
        .map(sql_param)
        .join(", ")})`;
    }


    // for array-of-string columns, we want to check if there's any
    // overlap between the filter's selected options and that row's
    // columns' values. To check overlap, we use the array-&& operator
    // ie. `interests && ARRAY['reading', 'gardening']`
    if (filters.interests) {
      sql_command += ` AND interests && ARRAY[${filters.interests
        .map(sql_param)
        .join(", ")}]`;
    }

    if (filters.days_available) {
      sql_command += ` AND days_available && ARRAY[${filters.days_available
        .map(sql_param)
        .join(", ")}]`;
    }

    if (filters.times_available) {
      sql_command += ` AND times_available && ARRAY[${filters.times_available
        .map(sql_param)
        .join(", ")}]`;
    }

    if (filters.languages) {
      sql_command += ` AND languages && ARRAY[${filters.languages
        .map(sql_param)
        .join(", ")}]`;
    }



    console.log("filtering");
    console.log(sql_command);
    console.log({ filters, params });
    const { rows } = await client.query(sql_command, params);
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

//Get user by email
const getUserByEmail = async (email) => {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
              SELECT *
              FROM users
              WHERE email = $1
      `,
      [email]
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
        location = $5,
        about_me = $6,
        education = $7,
        education_level = $8,
        classes = $9,
        days_available = $10,
        times_available = $11,
        timezone= $12,
        interests = $13,
        photo = $14,
        languages = $15,
        study_habits = $16,
        major = $17,
        age = $18,
        work = $19
        WHERE user_id = $20
        RETURNING *;
        `,
      [
        updatedUserData.first_name,
        updatedUserData.last_name,
        updatedUserData.email,
        updatedUserData.gender,
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
        user_id,
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
    const result = await client.query(
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
              r.age AS receiver_age,
              r.education_level AS receiver_education_level,
              m.thread_id
          FROM
              messages m
          INNER JOIN
              users s ON m.sender = s.user_id
          INNER JOIN
              users r ON m.receiver = r.user_id
          WHERE 
              s.user_id = $1 OR r.user_id = $1
          ORDER BY
              m.created_at DESC;

      `,
      [user_id]
    );

    const messages = result.rows;

    return messages;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUsersMatchingFilters,
  getUserById,
  getUserByEmail,
  deleteUser,
  updateUser,
  getUserMessages,
};
