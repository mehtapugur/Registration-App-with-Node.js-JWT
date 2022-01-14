const express = require("express");
const pageController = require("../controllers/pageController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");
const router = express.Router();

//Routing
router.route("/").get(pageController.getIndexPage);
router.route("/login").get(redirectMiddleware, pageController.getLoginPage);

module.exports = router;
