const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (user) res.status(201).redirect("/login");
  } catch (error) {
    res.redirect("/");
    console.log(
      json({
        status: "fail",
        error,
      })
    );
  }
};

exports.loginUser = (req, res) => {
  try {
    const { username, password } = req.body;

    User.findOne({ username }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            const token = jwt.sign(
              { id: user._id, browserInfo: req.headers["user-agent"] },
              req.app.get("api_secret_key"),
              {
                expiresIn: "60m", // minutes
              }
            );

            res.cookie("token", token, { httpOnly: true });
            req.session.userID = user._id;
            req.session.browserInfo = req.headers["user-agent"];
            /* res.json({
              status: true,
              username,
              password,
              token,
            }); */
            res.status(200).redirect("/users/home");
          } else {
            res.send("Şifre yanlış...");
          }
        });
      } else {
        res.send("Bu kullanıcı isminde bir kayıt yok..");
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getHomePage = async (req, res) => {
  const users = await User.find();
  res.status(200).render("home", {
    page_name: "home",
    users,
  });
};

exports.getUsersPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  res.status(200).render("users", {
    page_name: "users",
    user,
  });
};
