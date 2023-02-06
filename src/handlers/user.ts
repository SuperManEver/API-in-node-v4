import prisma from "../db";
import { createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const hash = await hashPassword(req.body.password);

  if (!req.body) {
    res.status(401);
    res.send("Not sufficient data provided!");
  }

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
