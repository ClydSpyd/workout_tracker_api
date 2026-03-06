export interface WorkoutSetInput {
  reps: number;
  weight: number;
}

export interface WorkoutExerciseInput {
  name: string;
  sets: WorkoutSetInput[];
}

export interface LogWorkoutInput {
  // userId: string; -- extract from the auth middleware, no need to include it in the input
  date: string; // ISO string from client
  notes?: string;
  exercises: WorkoutExerciseInput[];
}
