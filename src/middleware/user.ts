import jwt from "jsonwebtoken";

export function checkUser(req, res, next): void {
  const userSession = req.cookies?.user_session;
  if (userSession === undefined) {
    return;
  }
  const decodedJwt = jwt.verify(userSession, process.env.JWT_SECRET ?? "");
  req.userData = decodedJwt;
  next();
}

export function onlyAdminsRoute(req, res, next): void {
  const userSession = req.cookies?.user_session;
  if (userSession === undefined) {
    return res.status(400).send({
      message: "You are not authorized to access this route",
    });
  }

  const decodedJwt = jwt.verify(userSession, process.env.JWT_SECRET ?? "");
  if (typeof decodedJwt === "string" || decodedJwt.isAdmin === false) {
    return res.status(400).send({
      message: "You are not authorized to access this route",
    });
  }

  req.userData = decodedJwt;
  next();
}

export default { checkUser, onlyAdminsRoute };
