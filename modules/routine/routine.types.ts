export interface RoutineExerciseInput {
  name: string;
  sets: { reps: number; weight: number }[];
}

export interface RoutineInput {
  name: string;
  description?: string;
  exercises: RoutineExerciseInput[];
}
