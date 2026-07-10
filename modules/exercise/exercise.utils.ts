import { RoutineExerciseInput } from "../routine/routine.types";
import { WorkoutExerciseInput } from "../workout/workout.types";
import { Exercise } from "./exercise.types";
import resistanceExercises from "../../assets/data/resistance_exercises_base.json";

/**
 * Enrich workout/routine exercise entry from exercise data (e.g. name,
 * category, equipment) based on exercise ID stored in DB
 */

type ExerciseInput = WorkoutExerciseInput | RoutineExerciseInput;
export function enrichExerciseEntry(
  ex: ExerciseInput,
): ExerciseInput | Exercise {
  const exerciseDetails = resistanceExercises.find((e) => e.id === ex.name);

  if (!exerciseDetails) {
    return ex;
  }

  return {
    name: exerciseDetails ? exerciseDetails.name : ex.name,
    sets: ex.sets,
    exerciseDetails,
  };
}
