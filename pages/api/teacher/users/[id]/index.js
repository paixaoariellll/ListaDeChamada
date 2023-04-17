import { getSession } from "next-auth/react";
import User from "../../../../../models/User";
import db from "../../../../../utils/db";

const getHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user);
};

const putHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.registerId = req.body.registerId;
    user.email = req.body.email;
    user.password = req.body.password;
    user.isTeacher = req.body.isTeacher;
    await user.save();
    await db.disconnect();
    res.send({
      message: "As informações do usuário foram atualizadas com sucesso!",
    });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Usuário não encontrado!" });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    if (user.email === "prof@gmail.com") {
      return res.status(400).send({
        message: "Você não pode deletar o Professor desta página!",
      });
    }
    await user.remove();
    await db.disconnect();
    res.send({ message: "Usuário deletado!" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Usuário não encontrado!" });
  }
};

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isTeacher) {
    return res.status(401).send("Acesse sua conta!");
  }

  const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res, user);
  } else if (req.method === "PUT") {
    return putHandler(req, res, user);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: "Método não permitido!" });
  }
};

export default handler;
