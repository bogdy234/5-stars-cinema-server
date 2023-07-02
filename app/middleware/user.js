const jwt = require("jsonwebtoken");

function checkUser(req, res, next) {
  const userSession = req.cookies?.user_session;
  if (!userSession) {
    return;
  }
  const decodedJwt = jwt.verify(userSession, process.env.JWT_SECRET);
  req.userData = decodedJwt;
  next();
}

function onlyAdminsRoute(req, res, next) {
  const userSession = req.cookies?.user_session;
  if (!userSession) {
    return res.status(400).send({
      message: "You are not authorized to access this route",
    });
  }

  const decodedJwt = jwt.verify(userSession, process.env.JWT_SECRET);
  if (!decodedJwt.isAdmin) {
    return res.status(400).send({
      message: "You are not authorized to access this route",
    });
  }

  req.userData = decodedJwt;
  next();
}

module.exports = { checkUser, onlyAdminsRoute };
