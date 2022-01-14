const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  jwt.verify(token, req.app.get("api_secret_key"), (err, decoded) => {
    if (err) return next();
    req.userId = decoded.id; //? userID olsa çalışır mı
    req.browserInfo = decoded.browserInfo;
  });

  if (
    !(
      req.userId == req.session.userID &&
      req.headers["user-agent"] == req.session.browserInfo &&
      req.headers["user-agent"] == req.browserInfo
    )
  )
    return next();

  next();
};

/* önceki hali
const User = require("../models/User");

module.exports = (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if (err || !user) return res.redirect("/login");
    next();
  });
};

*/
