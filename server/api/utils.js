const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");

const addReqUser = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // no valid token is fine, req.user will just be null
    req.user = null;
  }
  next();
};

const authRequired = (req, res, next) => {
  if (req.user !== null) {
    next();
    return;
  } else {
    res.status(401).send({
      loggedIn: false,
      message: "You are def not authorized.",
    });
  }
};

const SALT_ROUNDS = 10;
async function hashedPassword(plaintext_password) {
  return await bcrypt.hash(plaintext_password, SALT_ROUNDS);
}

function setLoginCookie(res, user) {
  // copy of user without password
  const jwt_content = { ...user };
  delete jwt_content.password;

  //creating our token
  const token = jwt.sign(jwt_content, JWT_SECRET);

  //attaching a cookie to our response using the token that we created
  res.cookie("token", token, {
    sameSite: "strict",
    httpOnly: true,
    signed: true,
  });
}

//helper stringify function 
function dbFields(fields) {
  const insert = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');
  // then we can use: (${ insert }) in our string template
  
  // need something like $1, $2, $3
  const select = Object.keys(fields).map(
    (_, index) => `$${index + 1}`).join(', ');
  // then we can use (${ select }) in our string template

  const vals = Object.values(fields);
  return {insert, select, vals};
}

module.exports = {
  addReqUser,
  authRequired,
  hashedPassword,
  setLoginCookie,
  dbFields,
};
