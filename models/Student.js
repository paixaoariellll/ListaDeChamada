import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subject: { type: Object, required: true },
    gradeTeams: { type: Object, required: true }, 
    numClassTotal: { type: Number, required: true },
    totalPresences: { type: Number, required: true }
  },
  { timestamps: true },
);

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
export default Student;
