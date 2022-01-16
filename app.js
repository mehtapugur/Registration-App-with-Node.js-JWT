// Gusto & RemoteTeam Node.js Bootcamp
// Assignment #2 for Week #3
// Mehtap Ugur

//Require modules
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const multer = require("multer"); //?
const pageRoute = require("./routes/pageRoute");
const userRoute = require("./routes/userRoute");

//start express module
const app = express();

//give error
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

//Connect DB
mongoose
  .connect("mongodb://localhost/assignment-two-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Database Connected Successfully..");
  });

//Template Engine
app.set("view engine", "ejs");

//global variable
global.userIN = null;

//Middlewares
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set("api_secret_key", require("./config").api_secret_key);
app.use(cookieParser());

//Session
app.use(
  session({
    secret: "api_secret_key",
    cookie: {
      maxAge: 6000000,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/assignment-two-db",
    }),
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});

//Routing
app.use("/", pageRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
