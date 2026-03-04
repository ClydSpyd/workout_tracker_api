export interface WorkoutSetInput {
  reps: number;
  weight: number;
}

export interface WorkoutExerciseInput {
  name: string;
  sets: WorkoutSetInput[];
}

export interface LogWorkoutInput {
  userId: string;
  date: string; // ISO string from client
  notes?: string;
  exercises: WorkoutExerciseInput[];
}
