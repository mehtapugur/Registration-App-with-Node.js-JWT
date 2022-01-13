// Gerekli modüller require edilir
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const fileUpload = require("express-fileupload");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// const fs = require("fs");
const path = require("path");
const multer = require("multer"); //?
const pageRoute = require("./routes/pageRoute");
// //const pdfRoute = require("./routes/pdfRoute");
// const lessonRoute = require("./routes/lessonRoute");
// const categoryRoute = require("./routes/categoryRoute");
// //const categoryController = require("./routes/categoryController");
const userRoute = require("./routes/userRoute");
// const File = require("./models/File");

// //express fonksiyonunu çalıştırıyoruz
const app = express();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

mongoose
  .connect("mongodb://localhost/assignment-two-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Database Connected Successfully..");
  });

//Template Engine
app.set("view engine", "ejs");

//global değişken
global.userIN = null;

//Middlewares
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "api_secret_key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/assignment-two-db",
    }),
  })
);
//app.use(fileUpload());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.post("/api/uploadFile", (req, res) => {
//   // Stuff to be added later
// });

// app.use("*", (req, res, next) => {
//   userIN = req.session.userID;
//   next();
// });

app.use("/", pageRoute);
// app.use("/lessons", lessonRoute);
// app.use("/categories", categoryRoute);
// // app.use("/pdfs", pdfRoute);
// app.get("/about");
app.use("/users", userRoute);

// app.post("/files", async (req, res) => {
//   console.log(req.files.pdf);
//   const uploadDir = "./public/uploads/";

//   if (fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
//   }

//   let uploadPdf = req.files.pdf;
//   uploadPath = __dirname + "/public/uploads/" + uploadPdf.name;

//   uploadPdf.mv(uploadPath, async () => {
//     await File.create({
//       ...req.body,
//       pdf: "/uploads/" + uploadPdf.name,
//     });
//     //res.redirect("/");
//     console.log("ben calistim mehom");
//   });
//   res.redirect("/users/files");
// });

// app.get("/files");

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
