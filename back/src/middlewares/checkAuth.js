const verifyJWToken = require("../utils/verifyJWToken");

const checkAuth = (req, res, next) => {
  if (req.path === "/user/signin" || req.path === "/user/signup") {
    return next();
  }

  const token = req.headers.token;
  verifyJWToken(token)
    .then(user => {
      req.user = user.data._doc;
      next();
    })
    .catch(err => {
      res.status(403).json({ message: "Invalid auth token provided." });
    });
};

module.exports = checkAuth;
