// THIS FILE WILL RESET YOUR DATABASE - PROCEED WITH CAUTION
//pulling in connection to my local database
const client = require("./client");

const { createEvent, getAllEvents } = require("./helpers/events");
const { createUser, getAllUsers } = require("./helpers/users");
const { createRsvp, getAllRsvps } = require("./helpers/rsvps");
const { createMessage, getAllMessages } = require("./helpers/messages");
const { createComment } = require("./helpers/comments");

const { users, events, rsvps, messages, comments } = require("./seedData");

// Drop Tables
const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
          DROP TABLE IF EXISTS users CASCADE;
          DROP TABLE IF EXISTS events CASCADE;
          DROP TABLE IF EXISTS rsvps CASCADE;
          DROP TABLE IF EXISTS messages CASCADE;
          DROP TABLE IF EXISTS comments CASCADE;
      `);
    console.log("Tables dropped!");
  } catch (error) {
    console.log("Error dropping tables");
    throw error;
  }
};

//Create Tables
const createTables = async () => {
  console.log("Building tables...");
  await client.query(`
          CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            email text UNIQUE NOT NULL,
            password text NOT NULL,
            first_name text NOT NULL,
            last_name text NOT NULL,
            gender text NOT NULL,
            location text NOT NULL,
            about_me text NOT NULL,
            education text NOT NULL,
            education_level text NOT NULL,
            classes text [],
            days_available text [] NOT NULL,
            times_available text [] NOT NULL,
            timezone text,
            interests text [],
            photo text NOT NULL,
            languages text [] NOT NULL,
            study_habits text NOT NULL,
            major text NOT NULL,
            age text NOT NULL,
            work text
          );
          CREATE TABLE events (
              event_id SERIAL PRIMARY KEY,
              title text NOT NULL,
              description text NOT NULL,
              location text,
              address text, 
              datetime TIMESTAMP NOT NULL,
              timezone text,
              virtual boolean NOT NULL,
              comments text,
              topic text NOT NULL,
              duration int NOT NULL,
              gender text,
              "group" boolean NOT NULL, 
              meeting_link text,
              host_id INTEGER
          );
            CREATE TABLE rsvps (
              rsvp_id SERIAL PRIMARY KEY,
              "user_id" INTEGER REFERENCES users("user_id"),
              "event_id" INTEGER REFERENCES events("event_id"),
              rsvp_status boolean NOT NULL
          );
            CREATE TABLE messages (
              message_id SERIAL PRIMARY KEY,
              "sender" INTEGER REFERENCES users("user_id"),
              "receiver" INTEGER REFERENCES users("user_id"),
              message_content text,
              thread_id serial NOT NULL,
              created_at TIMESTAMPTZ DEFAULT NOW()
          );
          CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            event_id INTEGER REFERENCES events(event_id),
            comment_content text,
            created_at TIMESTAMPTZ DEFAULT NOW()
          );  
      `);
  console.log("Tables built!");
};

//Insert mock data from seedData.js
//Create events
const createInitialEvents = async () => {
  try {
    //Looping through the "events" array from seedData
    for (const event of events) {
      //Insert each event into the table
      await createEvent(event);
    }
    console.log("created event");
  } catch (error) {
    throw error;
  }
};

//Create user
const createInitialUsers = async () => {
  try {
    for (const user of users) {
      await createUser(user);
    }
    console.log("created user");
  } catch (error) {
    throw error;
  }
};

//Create rsvps
const createInitialRsvps = async () => {
  try {
    for (const rsvp of rsvps) {
      await createRsvp(rsvp);
    }
    console.log("created rsvp");
  } catch (error) {
    throw error;
  }
};

//Create messages
const createInitialMessages = async () => {
  try {
    for (const message of messages) {
      await createMessage(message);
    }
    console.log("created message");
  } catch (error) {
    throw error;
  }
};

//Create comments
const createInitialComments = async () => {
  try {
    for (const comment of comments) {
      await createComment(comment);
    }
    console.log("created comment");
  } catch (error) {
    throw error;
  }
};

//Call all my functions and 'BUILD' my database
const rebuildDb = async () => {
  try {
    //Run our functions
    await dropTables();
    await createTables();

    //Generating starting data
    console.log("starting to seed...");
    await createInitialEvents();
    await createInitialUsers();
    await createInitialRsvps();
    await createInitialMessages();
    await createInitialComments();
  } catch (error) {
    console.error(error);
  } finally {
    //close our connection
    await client.end();
  }
};

rebuildDb();
