import mongoose from "mongoose";

const SetSchema = new mongoose.Schema(
  {
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
  },
  { _id: false }
);

const ExerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: { type: [SetSchema], required: true },
  },
  { _id: false }
);

const WorkoutSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true, default: Date.now },
    notes: { type: String },
    location: { type: String },
    exercises: { type: [ExerciseSchema], required: true },
    baseId: { type: mongoose.Schema.Types.ObjectId, ref: "Routine" },
  },
  { timestamps: true },
);

export const WorkoutModel = mongoose.model(
  "Workout",
  WorkoutSchema
);
