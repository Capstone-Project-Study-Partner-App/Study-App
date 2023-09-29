const bcrypt = require("bcrypt");
const {
  createUser,
  getUserByUsername,
  getUserByEmail,
} = require("../db/helpers/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");
const { authRequired } = require("./utils");

const router = require("express").Router();

const SALT_ROUNDS = 10;

router.get("/current-user", authRequired, async (req, res, next) => {
  try {
    res.json({
      current_user_id: req.user.user_id,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, role, password } = req.body;
    //sending username and hashed pw to database
    const user = await createUser({
      username,
      email,
      role,
      //hashing the password
      password_hash: await bcrypt.hash(password, SALT_ROUNDS),
    });

    //remove password_hash from user object so it doesn't get sent to the user
    delete user.password_hash;

    //creating our token
    const token = jwt.sign(user, JWT_SECRET);

    //attaching a cookie to our response using the token that we created
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    delete user.password;
    // console.log(res)

    res.send({ user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    console.log(user);

    const validPassword = await bcrypt.compare(password, user.password);

    delete user.password;
    if (validPassword) {
      //creating our token
      const token = jwt.sign(user, JWT_SECRET);
      //attaching a cookie to our response using the token that we created
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      delete user.password;
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
