import { getSession } from "next-auth/react";
import Register from "../../../../models/Register";
import db from "../../../../utils/db";

const getHandler = async (req, res) => {
  await db.connect();
  const registers = await Register.find({});
  await db.disconnect();
  res.send(registers.reverse());
};

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("Acesse sua conta!");
  }

  const { user } = session
  if (req.method === "GET") {
    return getHandler(req, res, user);
  } else {
    return res.status(400).send({ message: "Método não permitido!" });
  }
};

export default handler;
