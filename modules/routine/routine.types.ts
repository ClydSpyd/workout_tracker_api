import { ExerciseInput } from "../exercise/exercise.types";

export interface RoutineInput {
  name: string;
  description?: string;
  exercises: ExerciseInput[];
}
