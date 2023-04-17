import Student from '../../../models/Student';
import db from '../../../utils/db';

export default async function handler(req, res) {
  const { method } = req;

  await db.connect();
  switch (method) {
    case 'POST':
      try {
        const { name, registrationNumber } = req.body;
        const student = new Student({ name, registrationNumber });
        const createdStudent = await student.save();
        res.status(201).json(createdStudent);
      } catch (error) {
        res.status(400).json({ message: 'Não foi possível criar o aluno' });
      }
      break;
    case 'GET':
      try {
        const alunos = await Student.find({});
        res.status(200).json(alunos);
      } catch (error) {
        res.status(404).json({ message: 'Não foi possível recuperar os alunos' });
      }
      break;
    case 'PUT':
      try {
        const { id } = req.query;
        const student = await Student.findById(id);

        if (!student) {
          return res.status(404).json({ message: 'O aluno não foi encontrado' });
        }

        student.name = req.body.name || student.name;
        student.registrationNumber = req.body.registrationNumber || student.registrationNumber;

        const updatedStudent = await student.save();

        res.status(200).json(updatedStudent);
      } catch (error) {
        res.status(404).json({ message: 'O aluno não foi atualizado' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.query;
        const deletedStudent = await Student.findByIdAndRemove(id);
        res.status(200).json(deletedStudent);
      } catch (error) {
        res.status(404).json({ message: 'O aluno não foi deletado' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} não é permitido`);
      break;
  }

  await db.disconnect();
}
