import Class from '../../../models/Class';
import Presence from '../../../models/Presence';
import db from '../../../utils/db';

export default async function handler(req, res) {
  const { method } = req;
  const { id, etapa, resposta } = req.query;

  await db.connect();
  switch (method) {
    case 'POST':
      try {
        const aula = await Class.findById(id);

        if (!aula) {
          return res.status(404).json({ message: 'A aula não foi encontrada' });
        }

        if (etapa >= aula.palavrasChave.length) {
          return res.status(400).json({ message: 'Todas as etapas já foram respondidas' });
        }

        const palavraChave = aula.palavrasChave[etapa];
        const respostaCorreta = palavraChave.animal === resposta;

        if (respostaCorreta) {
          aula.etapaAtual += 1;
        } else {
          await Presence.create({
            aluno: req.body.aluno,
            aula: id,
            etapa: etapa,
            resposta: resposta,
            correta: false,
          });
        }

        await aula.save();
        await db.disconnect();

        res.status(200).json({ respostaCorreta });
      } catch (error) {
        res.status(404).json({ message: 'A aula não foi encontrada' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Método ${method} não é permitido`);
      break;
  }
}
