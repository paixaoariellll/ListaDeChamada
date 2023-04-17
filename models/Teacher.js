import mongoose from 'mongoose';

const gradeTeamEnum = ['ADS', 'GCOM', 'GFIM', 'GTI', 'LOG'];

const teacherSchema = new mongoose.Schema(
  {
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subject: { type: String, required: true, default: 'Matéria' },
    gradeClass: { type: String, required: true, default: '1º Semestre' },
    gradeTeam: { type: String, required: true, default: 'ADS', enum: gradeTeamEnum },
    gradeClassQuantify: { type: Number, required: true, default: 20 }
  },
  { timestamps: true },
);

const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);
export default Teacher;
