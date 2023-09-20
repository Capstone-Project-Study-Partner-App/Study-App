// const client = require("../client");

// export const ORM = (tablename, pk_col_name = "id") => ({
//   create: async (data) => {
//     try {
//       const entries = Object.entries(data);
//       const columns = entries.map(([k, v]) => k);
//       const values = entries.map(([k, v]) => v);
//       const idxes = entries.map((_, idx) => `$${idx + 1}`);

//       const { rows } = await client.query(
//         `
//             INSERT INTO ${tablename} (${columns.join(", ")})
//             VALUES(${idxes.join(", ")})
//             RETURNING *;
//         `,
//         values
//       );
//       return rows[0];
//     } catch (error) {
//       throw error;
//     }
//   },

//   getAll: async () => {
//     try {
//       const { rows } = await client.query(`
//           SELECT *
//           FROM ${tablename};
//       `);
//       return rows;
//     } catch (error) {
//       throw error;
//     }
//   },

//   getById: async (id) => {
//     try {
//       const { rows } = await client.query(
//         `
//             SELECT *
//             FROM ${tablename}
//             WHERE "${pk_col_name}" = $1;
//         `,
//         [id]
//       );
//       return rows[0];
//     } catch (error) {
//       throw error;
//     }
//   },

//   delete: async (id) => {
//     try {
//       await client.query(
//         `
//           DELETE FROM ${tablename}
//           WHERE "${pk_col_name}" = $1
//         `,
//         [id]
//       );
//     } catch (error) {
//       throw error;
//     }
//   },

//   update: async (id, data) => {
//     try {
//       const entries = Object.entries(data);
//       const values = entries.map(([k, v]) => v);

//       const { rows } = await client.query(
//         `
//             UPDATE ${tablename}
//             SET ${entries.map(([k, v], i) => `${k} = $${i + 2}`)}
//             WHERE "${pk_col_name}" = $1
//             RETURNING *;
//         `,
//         [id, ...values]
//       );
//       return rows[0];
//     } catch (error) {
//       throw error;
//     }
//   },
// });
