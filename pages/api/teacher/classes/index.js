import db from "../../../../utils/db";
import { getSession } from "next-auth/react";
import Clas from "../../../../models/Clas";

const postHandler = async (req, res) => {
  const session = await getSession({ req });
  await db.connect();
  const newClas = new Clas({
    createdBy: `${(session.user.name).toString()}`,
    className: "Nome da matéria",
    startHour: "00:00",
    endHour: "23:59",
    keyWords: "Palavra Chave",
    team: ["ADS", "GTI", "GCOM"],
    group: ["1", "2", "3"],
    time: 165,
  });
  const clas = await newClas.save();
  await db.disconnect();
  res.send({ message: "Matéria criada com sucesso!", clas });
};

const getHandler = async (req, res) => {
  await db.connect();
  const classes = await Clas.find({});
  await db.disconnect();
  res.send(classes.reverse());
};

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isTeacher)) {
    return res.status(401).send({ message: 'Professor, acesse sua conta!' });
  }

  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: "Método não permitido!" });
  }
};

export default handler;
