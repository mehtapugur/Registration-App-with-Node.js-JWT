/*exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getHomePage = (req, res) => {
  res.status(200).render("home", {
    page_name: "home",
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};
*/

exports.getRegisterPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};
