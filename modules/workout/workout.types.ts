export interface WorkoutSetInput {
  reps: number;
  weight: number;
}

export interface WorkoutExerciseInput {
  name: string;
  sets: WorkoutSetInput[];
}

export interface CreateWorkoutPayload {
  exercises: WorkoutExerciseInput[]; // Can be added incrementally
  notes?: string;
  location?: string;
  baseId?: string; // ID of the routine this workout is based on, if any
  date?: Date; // defaults to now
}

type BaseWorkout = WorkoutExerciseInput[];

export interface WorkoutSession {
  _id: string;
  userId: string;
  exercises: WorkoutExerciseInput[];
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  baseWorkout?: BaseWorkout; // original routine exercises, if created from a routine
  notes?: string;
  location?: string;
}