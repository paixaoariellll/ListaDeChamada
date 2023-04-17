import { getSession } from "next-auth/react";
import db from "../../../../utils/db";
import Class from "../../../models/Class";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("Acesse sua conta!");
  }

  await db.connect();
  const classes = await Class.find({});
  await db.disconnect();
  res.send(classes);
};

export default handler;
