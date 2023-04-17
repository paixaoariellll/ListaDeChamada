import mongoose from 'mongoose';

const presenceSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clas', required: false },
    numRigthSteps: { type: Number, required: false },
    numClassTotal: { type: Number, required: false },
    totalPresence: { type: Number, required: false }
  },
  { timestamps: true },
);

const Presence = mongoose.models.Presence || mongoose.model('Presence', presenceSchema);
export default Presence;
