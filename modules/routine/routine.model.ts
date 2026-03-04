import mongoose from "mongoose";

const RoutineExerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: [{ reps: Number, weight: Number }],
  },
  { _id: false }
);

const RoutineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    exercises: { type: [RoutineExerciseSchema], required: true },
  },
  { timestamps: true }
);

export const RoutineModel = mongoose.model(
  "Routine",
  RoutineSchema
);
