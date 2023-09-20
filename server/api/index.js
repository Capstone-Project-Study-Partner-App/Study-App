const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  getAllAvailableBooks,
} = require("../db/helpers/books");
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../db/helpers/users");
const {
  getAllCheckouts,
  getCheckoutById,
  createCheckout,
} = require("../db/helpers/checkouts");

// Create a subrouter for the '/api/' subroute
const apiRouter = express.Router();

apiRouter.get("/foo", (req, res) => {
  res.json({ hello: "WORLD!!", foo: "Bar" });
});

//All Books
apiRouter.get("/books", async (req, res) => {
  const books = await getAllBooks();
  res.json(books);
});

//All available books
apiRouter.get("/books/available", async (req, res) => {
  const books = await getAllAvailableBooks();
  res.json(books);
});

// Book by ID
apiRouter.get("/books/:id", async (req, res, next) => {
  try {
    const book = await getBookById(req.params.id);
    res.send(book);
  } catch (error) {
    next(error);
  }
});

//Create Book
apiRouter.post("/books", async (req, res, next) => {
  try {
    console.log("req", req.body);
    const book = await createBook(req.body);
    res.send(book);
  } catch (err) {
    next(err);
  }
});

// Delete Book
apiRouter.delete("/books/:id", async (req, res, next) => {
  try {
    const book = await deleteBook(req.params.id);
    res.send(book);
  } catch (error) {
    next(error);
  }
});

//All Users
apiRouter.get("/users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

// User by ID
apiRouter.get("/users/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// for Create User, see /api/auth/register

// Delete User
apiRouter.delete("/users/:id", async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//All Checkouts
apiRouter.get("/checkouts", async (req, res) => {
  const checkouts = await getAllCheckouts();
  res.json(checkouts);
});

// Checkout by ID
apiRouter.get("/checkouts/:id", async (req, res, next) => {
  try {
    const checkout = await getCheckoutById(req.params.id);
    res.send(checkout);
  } catch (error) {
    next(error);
  }
});

//Create Checkout
apiRouter.post("/checkouts", async (req, res, next) => {
  try {
    console.log("req", req.body);
    const checkout = await createCheckout(req.body);
    res.send(checkout);
  } catch (err) {
    next(err);
  }
});

apiRouter.get("/health", (req, res, next) => {
  res.send("All healthy and ready to go!");
});

apiRouter.use("/auth", require("./auth"));

module.exports = { apiRouter };
