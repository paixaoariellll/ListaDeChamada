import { getSession } from "next-auth/react";
import User from "../../../../models/User";
import db from "../../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isTeacher) {
    return res.status(401).send({ message: "Acesse sua conta!" });
  }

  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users.reverse());
};

export default handler;
