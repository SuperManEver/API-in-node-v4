import prisma from "../db";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const hash = await hashPassword(req.body.password);

  const { username } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      password: hash,
    },
  });

  const token = createJWT(user);

  res.json({ token });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.body.username },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
