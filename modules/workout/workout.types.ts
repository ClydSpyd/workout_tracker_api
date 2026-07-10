export interface WorkoutSetInput {
  reps: number;
  weight: number;
  completed?: boolean; // optional, defaults to false
}

export interface WorkoutExerciseInput {
  name: string;
  sets: WorkoutSetInput[];
}

export interface SetPayload {
  name: string;
  setData: WorkoutSetInput;
}

export interface CreateWorkoutPayload {
  name?: string; // optional, defaults to "Untitled Workout"
  exercises: WorkoutExerciseInput[]; // Can be added incrementally
  notes?: string;
  location?: string;
  baseRoutine?: string; // ID of the routine this workout is based on, if any
  date?: Date; // defaults to now
}

export interface WorkoutSession {
  _id: string;
  name: string;
  userId: string;
  exercises: WorkoutExerciseInput[];
  started: Date | null;
  ended: Date | null;
  createdAt: Date;
  updatedAt: Date;
  baseRoutine?: string; // original routine ID, if created from a routine
  notes?: string;
  location?: string;
}