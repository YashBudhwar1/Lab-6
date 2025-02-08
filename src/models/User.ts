import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  role: "Patient" | "Doctor" | "Nurse" | "Admin";
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Patient", "Doctor", "Nurse", "Admin"], default: "Patient" },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
