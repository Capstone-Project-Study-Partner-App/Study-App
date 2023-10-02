const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../db/helpers/users");
const { setLoginCookie } = require("./utils");
const router = require("express").Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (passwordIsValid) {
      await setLoginCookie(res, user);

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
