import Class from '../../../../models/Class';
import db from '../../../../utils/db';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await db.connect();
  switch (method) {
    case 'GET':
      try {
        const aula = await Class.findById(id);
        res.status(200).json(aula);
      } catch (error) {
        res.status(404).json({ message: 'A aula não foi encontrada' });
      }
      break;
    case 'PUT':
      try {
        const aula = await Class.findById(id);

        if (!aula) {
          return res.status(404).json({ message: 'A aula não foi encontrada' });
        }

        aula.startTime = req.body.startTime || aula.startTime;
        aula.endTime = req.body.endTime || aula.endTime;
        aula.keywords = req.body.keywords || aula.keywords;

        const updatedAula = await aula.save();

        res.status(200).json(updatedAula);
      } catch (error) {
        res.status(404).json({ message: 'A aula não foi atualizada' });
      }
      break;
    case 'DELETE':
      try {
        const deletedAula = await Class.findByIdAndRemove(id);
        res.status(200).json(deletedAula);
      } catch (error) {
        res.status(404).json({ message: 'A aula não foi deletada' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} não é permitido`);
      break;
  }

  await db.disconnect();
}
