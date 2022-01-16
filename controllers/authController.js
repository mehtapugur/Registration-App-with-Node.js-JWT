const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    //create new user and redirect login page
    const user = await User.create(req.body);
    if (user) res.status(201).redirect("/login");
  } catch (error) {
    //if cant create user redirect same page
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
    //take user information from form
    const { username, password } = req.body;

    //find user in database
    User.findOne({ username }, (err, user) => {
      //if there is user
      if (user) {
        //decrypt encrypted password and compare with entered password
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            //create a token with JWT
            const token = jwt.sign(
              //req.headers["user-agent"]: contains browser information
              { id: user._id, browserInfo: req.headers["user-agent"] },
              req.app.get("api_secret_key"),
              {
                expiresIn: "60m", //minutes, session time
              }
            );

            //send this token to cookie
            res.cookie("token", token, { httpOnly: true });

            //set session and add browser information
            req.session.userID = user._id;
            req.session.browserInfo = req.headers["user-agent"];

            //if everything is ok redirect to home page
            res.status(200).redirect("/users/home");
          } else {
            res.send("Incorrect password!");
          }
        });
      } else {
        //if there is no such user
        res.send("There is no record with this username.");
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//close section and logout
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

//get home page where users are listed
exports.getHomePage = async (req, res) => {
  const users = await User.find();
  res.status(200).render("home", {
    users,
  });
};
