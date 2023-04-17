import db from "../../../../../utils/db";
import { getSession } from "next-auth/react";
import Presence from "../../../../../models/Presence";

const getHandler = async (req, res) => {
  await db.connect();
  const Presence = await Presence.findById(req.query.id);
  await db.disconnect();
  res.send(Presence);
};

const putHandler = async (req, res) => {
  await db.connect();
  const Presence = await Presence.findById(req.query.id);
  if (Presence) {
    /* Shipping */
    Presence.studantId = req.body.studentId;
    Presence.name = req.body.name;
    Presence.email = req.body.email;
  
    await Presence.save();
    await db.disconnect();
    res.send({ message: "Registro atualizado com sucesso!" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Registro não encontrado!" });
  }
};

const deleteHandler = async (req, res) => {
  const session = await getSession({ req });
  if (session.user.email === 'prof@gmail.com' || session.user.email === 'aluno@gmail.com') {
    await db.connect();
    await Presence.findByIdAndDelete(req.query.id);
    await db.disconnect();
    res.send({ message: 'Registro excluído com sucesso!' });
  } else {
    res.status(401).send({ message: 'Apenas o Administrador Master pode excluir registros.' });
  }
};

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("Acesse sua conta!");
  }

  const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res, user);
  } else if (req.method === "PUT") {
    return putHandler(req, res, user);
  } if (req.method === "DELETE") {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: "Método não permitido!" });
  }
};

export default handler;
