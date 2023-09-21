const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../db/helpers/users");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../db/helpers/events");
const {
  getRsvpByEventId,
  createRsvp,
  updateRsvp,
} = require("../db/helpers/rsvps");
const {
  deleteMessage,
  createMessage,
  getMessageById,
} = require("../db/helpers/messages");

// Create a subrouter for the '/api/' subroute
const apiRouter = express.Router();

apiRouter.get("/foo", (req, res) => {
  res.json({ hello: "WORLD!!", foo: "Bar" });
});

//USERS

//Get all Users
apiRouter.get("/users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

//Get User by ID
apiRouter.get("/users/:id", async (req, res, next) => {
  try {
    const users = await getUserById(req.params.id);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// //Get all user messages
// apiRouter.get("/:user_id/messages", async (req, res, next) => {
//   try {
//     const user = await getUserMessages(req.params.user_id);
//     res.send(user);
//   } catch (error) {
//     next(error);
//   }
// });

//Create User -- POST
apiRouter.post("/users", async (req, res, next) => {
  try {
    console.log("req", req.body);
    const user = await createUser(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

//GRAB HELPER FUCNTION FOR THIS
// Edit User -- PUT********************************************
apiRouter.put("/edit_user/:id", async (req, res, next) => {
  try {
    const user = await updateUser(req.params.user_id, req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Delete User ********************************************
apiRouter.delete("/users/:id", async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//EVENTS

//Get all Events
apiRouter.get("/events", async (req, res) => {
  const events = await getAllEvents();
  res.json(events);
});

//Get Event by ID
apiRouter.get("/events/:id", async (req, res, next) => {
  try {
    const event = await getEventById(req.params.id);
    res.send(event);
  } catch (error) {
    next(error);
  }
});

//Create Event --POST
apiRouter.post("/events", async (req, res, next) => {
  try {
    console.log("req", req.body);
    const event = await createEvent(req.body);
    res.send(event);
  } catch (err) {
    next(err);
  }
});

// Put Event ********************************************
apiRouter.put("/edit_event/:id", async (req, res, next) => {
  try {
    const event = await updateEvent(req.params.user_id, req.body);
    res.send(event);
  } catch (error) {
    next(error);
  }
});

// Delete User ********************************************
apiRouter.delete("/events/:id", async (req, res, next) => {
  try {
    const event = await deleteEvent(req.params.id);
    res.send(event);
  } catch (error) {
    next(error);
  }
});

//Stretch Goal-- Comments on Events

//RSVPS

//Get rsvps by event ID ********************************************
apiRouter.get("/rsvps/events/:id", async (req, res, next) => {
  try {
    const rsvp = await getRsvpByEventId(req.params.id);
    res.send(rsvp);
  } catch (error) {
    next(error);
  }
});

//Create Rsvp --POST
apiRouter.post("/rsvps", async (req, res, next) => {
  try {
    console.log("req", req.body);
    const rsvp = await createRsvp(req.body);
    res.send(rsvp);
  } catch (err) {
    next(err);
  }
});

// Edit Rsvp --PUT  ********************************************
apiRouter.put("/edit_rsvp/:id", async (req, res, next) => {
  try {
    const rsvp = await updateRsvp(req.params.user_id, req.body);
    res.send(rsvp);
  } catch (error) {
    next(error);
  }
});

//MESSAGES

//Get message by ID
apiRouter.get("/messages/:id", async (req, res, next) => {
  try {
    const message = await getMessageById(req.params.id);
    res.send(message);
  } catch (error) {
    next(error);
  }
});

//Create Message --POST
apiRouter.post("/messages", async (req, res, next) => {
  try {
    console.log("req", req.body);
    const message = await createMessage(req.body);
    res.send(message);
  } catch (err) {
    next(err);
  }
});

// Delete Message
apiRouter.delete("/messages/:id", async (req, res, next) => {
  try {
    const message = await deleteMessage(req.params.id);
    res.send(message);
  } catch (error) {
    next(error);
  }
});

// // Get all messages in a thread by thread_id
// const getMessagesByThread = async (thread_id) => {
//   try {
//       const { rows } = await client.query(`
//       SELECT
//       m.message_id,
//       m.message_content,
//       s.user_id AS sender_id,
//       s.first_name AS sender_first_name,
//       s.photos AS sender_photos,
//       r.user_id AS receiver_id,
//       r.first_name AS receiver_first_name,
//       r.photos AS receiver_photos,
//       m.thread_id
//     FROM
//       messages m
//     INNER JOIN
//       users s ON m.sender_id = s.user_id
//     INNER JOIN
//       users r ON m.receiver_id = r.user_id
//     WHERE
//       m.thread_id = $1
//     ORDER BY
//       m.created_at;
//       `, [thread_id]);

//       return rows;
//   } catch (error) {
//       throw error;
//   }
// }

apiRouter.get("/health", (req, res, next) => {
  res.send("All healthy and ready to go!");
});

// apiRouter.use("/auth", require("./auth"));

module.exports = { apiRouter };
