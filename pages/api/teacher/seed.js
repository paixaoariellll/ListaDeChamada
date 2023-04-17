import data from '../../../utils/data';
import db from '../../../utils/db';
import User from '../../../models/User';
import Clas from '../../../models/Clas';
import Teacher from '../../../models/Teacher';
import Student from '../../../models/Student';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isTeacher)) {
    return res.status(401).send({ message: 'Professor, acesse sua conta!' });
  }
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.user);
  await Teacher.deleteMany();
  await Teacher.insertMany(data.teacher);
  await Clas.deleteMany();
  await Clas.insertMany(data.clas);
  await Student.deleteMany();
  await Student.insertMany(data.student);
  await db.disconnect();
  res.send({ message: 'Seed concluída com sucesso!' });
};

export default handler;
