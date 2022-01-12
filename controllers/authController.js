const User = require("../models/User");
//const File = require("../models/File");
//const Pdf = require("../models/Pdf");

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  try {
    res.status(201).redirect("/login");
  } catch {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { username, password } = req.body;

    User.findOne({ username }, (err, user) => {
      if (user) {
        if (password === user.password) {
          req.session.userID = user._id;
          //res.status(200).redirect("/users/files");
          res.status(200).send("giriş yapıldı");
        }
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

exports.getHomePage = (req, res) => {
  res.status(200).render("home", {
    page_name: "home",
  });
};

exports.getDocumentsPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  res.status(200).render("documents", {
    page_name: "documents",
    user,
  });
};

exports.getUsersPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  res.status(200).render("users", {
    page_name: "users",
    user,
  });
};

exports.getFilesPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  res.status(200).render("files", {
    page_name: "files",
    user,
  });
};

exports.getAddPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  res.status(200).render("add", {
    page_name: "add",
    user,
  });
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();

    res.status(200).render("files", {
      files,
      page_name: "files",
    });
  } catch {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

/*

exports.createPdf = async (req, res) => {
  const pdf = await Pdf.create(req.body);
  try {
    res.status(201).json({
      status: "success",
      pdf,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find();

    res.status(200).render("pdfs", {
      pdfs,
      page_name: "pdfs",
    });
  } catch {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getPdfsPage = (req, res) => {
  res.status(200).render("pdfs", {
    page_name: "pdfs",
  });
};
*/
