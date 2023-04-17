import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    registerId: { type: String, required: true, default: '0000000' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isTeacher: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
