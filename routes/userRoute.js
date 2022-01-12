const express = require("express");

const authController = require("../controllers/authController");
//const pdfController = require("../controllers/pdfController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.loginUser);
//router.route("/logout").get(authController.logoutUser);
router.route("/home").get(authMiddleware, authController.getHomePage);
//router.route("/documents").get(authMiddleware, authController.getDocumentsPage);
//router.route("/files").get(authMiddleware, authController.getAllFiles);
//router.route("/files").get(authMiddleware, authController.getFilesPage);
module.exports = router;
