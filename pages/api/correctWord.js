import Presence from "../../../models/Presence";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Método não permitido' });
    return;
  }

  const { studentId, classId, selectedWord } = req.body;

  if (!studentId || !classId || !selectedWord) {
    res.status(422).json({ message: 'Campos inválidos' });
    return;
  }

  await db.connect();

  // Busca a presença correspondente ao aluno e turma informados
  const presence = await Presence.findOne({ studentId: studentId, classId: classId });
  if (!presence) {
    res.status(404).json({ message: 'Presença não encontrada' });
    await db.disconnect();
    return;
  }

  // Verifica se a palavra selecionada é a correta
  if (selectedWord === presence.correctWord) {
    presence.attendanceResult = true;
    await presence.save();
    res.status(200).json({ message: 'Presença confirmada' });
  } else {
    res.status(400).json({ message: 'Resposta incorreta' });
  }

  await db.disconnect();
}

export default handler;
