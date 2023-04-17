import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    createdBy: { type: String, required: true, default: "Prof. Dr. Paixão" },
    className: { type: String, required: true, default: "Inteligência Artificial" },
    startHour: { type: String, required: true, default: Date.now().toString() },
    endHour: { type: String, required: true },
    keyWords: { type: String, required: true },
    time: { type: Number, required: true },
    team: { type: Object, required: true },
    group: { type: Object, required: true },
  },
  { timestamps: true },
);

const Clas = mongoose.models.Clas || mongoose.model('Clas', classSchema);
export default Clas;
