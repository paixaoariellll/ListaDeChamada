import db from "../../../../../utils/db";
import { getSession } from "next-auth/react";
import Clas from "../../../../../models/Clas";

const getHandler = async (req, res) => {
  await db.connect();
  const clas = await Clas.findById(req.query.id);
  await db.disconnect();
  res.send(clas);
};

const putHandler = async (req, res) => {
  await db.connect();
  const clas = await Clas.findById(req.query.id);
  if (clas) {
    clas.createdBy = req.body.createdBy;
    clas.className = req.body.className;
    clas.startHour = req.body.startHour;
    clas.endHour = req.body.endHour;
    clas.keyWord = req.body.keyWord;
    clas.team = req.body.team;
    clas.group = req.body.group;
    clas.time = req.body.time;
    await clas.save();
    await db.disconnect();
    res.send({ message: "Matéria cadastrada com sucesso!" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Matéria não encontrada!" });
  }
};

const deleteHandler = async (req, res) => {
  const session = await getSession({ req });
  if (session.user.email === 'prof@gmail.com') {
    await db.connect();
    await Clas.findByIdAndDelete(req.query.id);
    await db.disconnect();
    res.send({ message: 'Matéria excluída com sucesso!' });
  } else {
    res.status(401).send({ message: 'Apenas o Professor Mega Master Blaster pode excluir essa matéria.' });
  }
};

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isTeacher)) {
    return res.status(401).send("Professor, acesse sua conta!");
  }

  const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res, user);
  } else if (req.method === "PUT") {
    return putHandler(req, res, user);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: "Método não permitido!" });
  }
};

export default handler;
