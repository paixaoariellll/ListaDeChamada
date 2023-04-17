import { getSession } from 'next-auth/react';
import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} Não suportado.` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({
      message: "Acesse sua conta!",
    });
  }

  const { user } = session;
  const { registerId, name, email, password } = req.body;

  if (
    !registerId ||
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: 'Erro de validação',
    });
    return;
  }

  try {
    await db.connect();
    const updatedUser = await User.findById(user._id);
    if (!updatedUser) {
      res.status(404).send({
        message: "Usuário não encontrado",
      });
      return;
    }
    updatedUser.email = email;
    updatedUser.name = name;
    updatedUser.registerId = registerId;
    if (password) {
      updatedUser.password = bcryptjs.hashSync(password);
    }
    await updatedUser.save();
    await db.disconnect();
    res.send({
      message: "Dados atualizados com sucesso!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Erro ao atualizar os dados do usuário",
    });
  }
}

export default handler;
