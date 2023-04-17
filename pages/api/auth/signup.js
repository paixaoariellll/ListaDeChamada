import User from "../../../models/User";
import db from "../../../utils/db";
import bcryptjs from 'bcryptjs'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { registerId, name, email, password } = req.body;

  if (
    !registerId ||
    !name ||
    !email || !email.includes('@') ||
    !password || password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Erro de validação',
    });
    return;
  }

  await db.connect();
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'Este email já está cadastrado!' });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    registerId,
    name,
    email,
    password: bcryptjs.hashSync(password),
    isTeacher: false,
  });

  const user = await newUser.save();
  await db.disconnect();

  res.status(201).send({
    message: 'Usuário criado com sucesso!',
    _id: user._id,
    registerId: user.registerId,
    name: user.name,
    email: user.email,
    isTeacher: user.isTeacher,
  });
}

export default handler;
