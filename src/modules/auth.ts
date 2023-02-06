import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { JWT_SECRET, ENCRYPTION_SALT } from "../config";

export const createJWT = (user: any) => {
  const data = { id: user.id, username: user.username };
  const token = jwt.sign(data, JWT_SECRET);

  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");

    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    console.log("here");
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized");
    return;
  }
};

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, ENCRYPTION_SALT);
};
