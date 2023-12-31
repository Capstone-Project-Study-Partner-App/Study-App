const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserMessages,
  getUsersMatchingFilters,
} = require("../db/helpers/users");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsMatchingFilters,
  getRsvpsForEvent,
} = require("../db/helpers/events");
const {
  getRsvpByEventId,
  createRsvp,
  deleteRsvp,
  updateRsvp,
  getRsvpByUserId,
  checkIfRsvpExists,
} = require("../db/helpers/rsvps");
const {
  deleteMessage,
  createMessage,
  getMessageById,
  getMessagesByThread,
  getExistingThread,
  getUnreadMessages,
  markMessageAsRead
} = require("../db/helpers/messages");
const {
  deleteFavorite,
  createFavorite,
  getFavoritesForUser,
  checkIfFavoriteExists,
} = require("../db/helpers/favorite_buddies");
const {
  deleteRating,
  updateRating,
  createRating,
  getAllRatings,
  getRatingById,
  getRatingByUserId,
  getRatingsForUser,
} = require("../db/helpers/ratings");
const {
  authRequired,
  setLoginCookie,
  authNotRequired,
  addReqUser,
} = require("./utils");
const { 
  createComment,
  getCommentsByEventId,
  deleteComment,
 } = require("../db/helpers/comments");
 const { 
  createCheckIn,
  getCheckInByUserId,
 } = require("../db/helpers/dailycheckin");

// Create a subrouter for the '/api/' subroute
const apiRouter = express.Router();

// make req.user available
apiRouter.use(addReqUser);

// use unauthedApiRouter instead of apiRouter if non-logged in
// users are allowed to use the route. By default, a non-logged-in
// user will get an HTTP 401 for trying to use an apiRouter route
const unauthedApiRouter = express.Router();
apiRouter.use(unauthedApiRouter);
apiRouter.use(authRequired);

// the /auth routes are available unauthed
unauthedApiRouter.use("/auth", require("./auth"));

apiRouter.get("/profile", async (req, res) => {
  try {
    const users = await getUserById(req.user.user_id);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

//USERS

//Get all Users
apiRouter.get("/users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

// Search for users matching filter
apiRouter.post("/users/search", async (req, res, next) => {
  try {
    const users = await getUsersMatchingFilters(req.body.filters);
    res.send(users);
  } catch (err) {
    next(err);
  }
});

//Get User by ID
apiRouter.get("/users/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id, req.user.user_id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//Create User -- POST
unauthedApiRouter.post("/users", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    await setLoginCookie(res, user);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

//GRAB HELPER FUCNTION FOR THIS
// Edit User -- PUT
apiRouter.put("/edit_user/:id", async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Delete User
apiRouter.delete("/users/:id", async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//Get all user messages
apiRouter.get("/:id/messages", async (req, res, next) => {
  try {
    const user = await getUserMessages(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//Mark as favorited
apiRouter.post("/users/:id/like", async (req, res, next) => {
  try {
    await createFavorite({
      liker_id: req.user.user_id,
      liked_id: req.params.id,
    });
    res.send({});
  } catch (error) {
    next(error);
  }
});

//Mark as un-favorited AKA "unlike someone"
apiRouter.delete("/users/:id/unlike", async (req, res, next) => {
  try {
    await deleteFavorite({
      liker_id: req.user.user_id,
      liked_id: req.params.id,
    });
    res.send({});
  } catch (error) {
    next(error);
  }
});

// Check to see if a favorite exists in the table for a certain liker & liked instance
apiRouter.get("/users/:id/confirm_favorite", async (req, res, next) => {
  try {
    const exists = await checkIfFavoriteExists({
      liker_id: req.user.user_id,
      liked_id: req.params.id,
    });
    res.json({ exists });
  } catch (error) {
    next(error);
  }
});

// Gets all Favorite buddies for signed-in user (AKA req.user)
apiRouter.get("/profile/all_favorites", async (req, res, next) => {
  try {
    const favorites = await getFavoritesForUser({
      liker_id: req.user.user_id,
    });
    res.json(favorites);
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

// Search for events matching filter
apiRouter.post("/events/search", async (req, res, next) => {
  try {
    const events = await getEventsMatchingFilters(req.body.filters);
    res.send(events);
  } catch (err) {
    next(err);
  }
});

// Create an API endpoint to get RSVPs for an event
apiRouter.get("/events/:id/rsvps", async (req, res, next) => {
  try {
    const event_id = parseInt(req.params.id);
    const rsvps = await getRsvpsForEvent(event_id);

    res.json(rsvps);
  } catch (error) {
    next(error);
  }
});

// Check to see if a RSVP exists in the table for a certain user_id & event_id instance
apiRouter.get("/events/:id/confirm_rsvp", async (req, res, next) => {
  try {
    const exists = await checkIfRsvpExists({
      user_id: req.user.user_id,
      event_id: req.params.id,
    });
    res.json({ exists });
  } catch (error) {
    next(error);
  }
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
    const event = await updateEvent(req.params.id, req.body);
    res.send(event);
  } catch (error) {
    next(error);
  }
});

// Delete Event ********************************************
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
apiRouter.post("/events/:id/attending", async (req, res, next) => {
  try {
    await createRsvp({
      user_id: req.user.user_id,
      event_id: req.params.id,
    });
    res.send({});
  } catch (error) {
    next(error);
  }
});

//Delete Rsvp --DELETE
apiRouter.delete("/events/:id/unattending", async (req, res, next) => {
  try {
    await deleteRsvp({
      user_id: req.user.user_id,
      event_id: req.params.id,
    });
    res.send({});
  } catch (error) {
    next(error);
  }
});

// Edit Rsvp --PUT
apiRouter.put("/edit_rsvp/:id", async (req, res, next) => {
  try {
    const rsvp = await updateRsvp(req.params.id, req.body);
    res.send(rsvp);
  } catch (error) {
    next(error);
  }
});

//Get rsvps by user ID*
apiRouter.get("/rsvps/:id", async (req, res, next) => {
  try {
    const rsvps = await getRsvpByUserId(req.params.id);
    res.send(rsvps);
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
apiRouter.get("/thread/:id", async (req, res, next) => {
  try {
    const message = await getMessagesByThread(req.params.id);
    res.send(message);
  } catch (error) {
    next(error);
  }
});

// // Get existing thread in chat pop up
apiRouter.get("/chat/:sender/:receiver", async (req, res, next) => {
  try {
    const message = await getExistingThread(
      req.params.sender,
      req.params.receiver
    );
    res.send(message);
  } catch (error) {
    next(error);
  }
});

// Get unread messages
apiRouter.get("/messages/unread/:id", async (req, res, next) => {
  try {
    const result = await getUnreadMessages(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});




//Mark message as read
apiRouter.put("/messages/:receiver/markasread/:message_id", async (req, res, next) => {
  try {
    const message = await markMessageAsRead(
      req.params.receiver,
    req.params.message_id
    );
    res.status(200).send("Message marked as read");
  } catch (error) {
    next(error);
  }
});


//RATINGS

// Delete Rating
// apiRouter.delete("/ratings/:id", async (req, res, next) => {
//   try {
//     const rating = await deleteRating(req.params.id);
//     res.send(rating);
//   } catch (error) {
//     next(error);
//   }
// });

apiRouter.delete("/ratings/:id", async (req, res, next) => {
  try {
    const rating = await deleteRating(req.params.id);
    res.send(rating);
  } catch (error) {
    next(error);
  }
});

// Edit rating --PUT
apiRouter.put("/ratings/:id", async (req, res, next) => {
  try {
    console.log("entering put in api");
    const rating = await updateRating(req.params.id, req.body);
    res.send(rating);
} catch (error) {
    next(error);
}
});


//Create rating -- POST
apiRouter.post("/ratings", async (req, res, next) => {
  try {
    console.log("req", req.body);
    const rating = await createRating(req.body);
    res.send(rating);
  } catch (err) {
    next(err);
  }
});

//Get all Ratings
apiRouter.get("/ratings", async (req, res) => {
  const ratings = await getAllRatings();
  res.json(ratings);
});

//Get Rating by ID
apiRouter.get("/ratings/:id", async (req, res, next) => {
  try {
    const rating = await getRatingById(req.params.id);
    res.send(rating);
  } catch (error) {
    next(error);
  }
});

//Get rating by user ID ********************************************
apiRouter.get("/ratings/users/:id", async (req, res, next) => {
  try {
    const rating = await getRatingByUserId(req.params.id);
    res.send(rating);
  } catch (error) {
    next(error);
  }
});

// Create an API endpoint to get ratings for a user
apiRouter.get("/users/:id/ratings", async (req, res, next) => {
  try {
    const user_id = parseInt(req.params.id);
    const ratings = await getRatingsForUser(user_id);

    res.json(ratings);
  } catch (error) {
    next(error);
  }
});

// COMMENTS
//Create Message --POST
apiRouter.post("/comments", async (req, res, next) => {
	try {
	  console.log("req", req.body);
	  const comment = await createComment(req.body);
	  res.send(comment);
  } catch (error) {
    next(error);
  }
});

	  //Get comments by event ID 
apiRouter.get("/comments/:id", async (req, res, next) => {
	try {
	  const comments = await getCommentsByEventId(req.params.id);
	  res.send(comments);
  } catch (error) {
    next(error);
  }
});

	  // Delete comment
apiRouter.delete("/comments/:id", async (req, res, next) => {
	try {
	  const comment = await deleteComment(req.params.id);
	  res.send(comment);
  } catch (error) {
    next(error);
  }
});

// DAILY CHECK IN 
//Create Check In --POST
apiRouter.post("/dailycheckin", async (req, res, next) => {
	try {
	  console.log("req", req.body);
	  const checkin = await createCheckIn(req.body);
	  res.send(checkin);
  } catch (error) {
    next(error);
  }
});

	  //Get check in  by user ID 
    apiRouter.get("/dailycheckin/:id", async (req, res, next) => {
      try {
        const checkin = await getCheckInByUserId(req.params.id);
        res.send(checkin);
      } catch (error) {
        next(error);
      }
    });

apiRouter.get("/health", (req, res, next) => {
  res.send("All healthy and ready to go!");
});

module.exports = apiRouter;