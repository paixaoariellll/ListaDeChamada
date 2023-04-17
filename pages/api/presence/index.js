import Presence from '../../../models/Presence';
import db from '../../../utils/db';

export default async function handler(req, res) {
  const { method } = req;

  await db.connect();
  switch (method) {
    case 'POST':
      try {
        const { studentId, studentName, classId, correctSteps } = req.body;
        const presence = new Presence({ studentId, studentName, classId, correctSteps });
        const createdPresence = await presence.save();
        res.status(201).json(createdPresence);
      } catch (error) {
        res.status(400).json({ message: 'Não foi possível registrar a presença' });
      }
      break;
    case 'GET':
      try {
        const presencas = await Presence.find({});
        res.status(200).json(presencas);
      } catch (error) {
        res.status(404).json({ message: 'Não foi possível recuperar as presenças' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${method} não é permitido`);
      break;
  }

  await db.disconnect();
}
