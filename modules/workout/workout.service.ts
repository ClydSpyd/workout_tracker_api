import { Types } from "mongoose";
import { WorkoutRepository } from "./workout.repository";
import { CreateWorkoutPayload, SetPayload, WorkoutExerciseInput, WorkoutSession } from "./workout.types";
import { enrichExerciseEntry } from "../exercise/exercise.utils";

export class WorkoutService {
  private repository = new WorkoutRepository();

  private assertValidWorkoutId(workoutId: string) {
    if (!Types.ObjectId.isValid(workoutId)) {
      const error = new Error("Invalid workout ID format") as Error & {
        status?: number;
      };
      error.status = 400;
      throw error;
    }
  }

  async createWorkout(data: CreateWorkoutPayload, userId: string) {
    if (!userId) {
      throw new Error("User ID is required to log a workout");
    }

    if (data.baseRoutine && !Types.ObjectId.isValid(data.baseRoutine)) {
      throw new Error("Invalid routine baseID");
    }

    const ongoing = await this.repository.findActiveByUser(userId);
    if (ongoing) {
      const error = new Error(
        "You already have an ongoing workout. Finish it before starting a new one.",
      ) as Error & { status?: number };
      error.status = 409;
      throw error;
    }

    return this.repository.create({ ...data, userId });
  }

  async updateWorkout(
    workoutId: string,
    updates: Partial<WorkoutSession>,
    userId: string,
  ) {
    this.assertValidWorkoutId(workoutId);

    const workout = await this.repository.findById(workoutId);
    if (!workout) throw new Error("Workout not found");
    if (workout.userId.toString() !== userId) {
      throw new Error("You do not have permission to update this workout");
    }

    // merge updates into workout
    Object.assign(workout, updates);
    return this.repository.updateById(workoutId, workout);
  }

  async manageSetPayload(
    workoutId: string,
    setPayload: SetPayload,
    userId: string,
    deleteSet: boolean,
    setIdx?: number, // optional index for updating an existing set
  ) {
    this.assertValidWorkoutId(workoutId);

    const workout = await this.repository.findById(workoutId);
    if (!workout) throw new Error("Workout not found");
    if (workout.userId.toString() !== userId) {
      throw new Error("You do not have permission to update this workout");
    }

    const exercise = workout.exercises.find(
      (ex) => ex.name === setPayload.name,
    );

    if (deleteSet) {
      if (setIdx === undefined) {
        throw new Error("Set index is required for deleting a set");
      }
      if (!exercise) {
        throw new Error("Exercise not found in workout");
      }
      if (setIdx < 0 || setIdx >= exercise.sets.length) {
        throw new Error("Set index out of bounds");
      }
      exercise.sets.splice(setIdx, 1); // remove the set at setIdx
      return this.repository.updateById(workoutId, workout);
    }

    if (exercise) {
      if (
        typeof setIdx !== "undefined" &&
        setIdx >= 0 &&
        setIdx < exercise.sets.length
      ) {
        // Support both lean plain objects and mongoose-typed nested docs
        Object.assign(exercise.sets[setIdx], setPayload.setData);
      } else {
        // existing workout, new set - push to sets
        exercise.sets.push(setPayload.setData);
      }
    } else {
      //throw error if trying to update a set for an exercise that doesn't exist in the workout
      throw new Error("Exercise not found in workout");
    }

    return this.repository.updateById(workoutId, workout);
  }

  async handleExercisePayload(
    workoutId: string,
    exercisePayload: WorkoutExerciseInput,
    userId: string,
    method: string,
  ) {
    this.assertValidWorkoutId(workoutId);

    const workout = await this.repository.findById(workoutId);
    if (!workout) throw new Error("Workout not found");
    if (workout.userId.toString() !== userId) {
      throw new Error("You do not have permission to update this workout");
    }

    const existingExerciseIndex = workout.exercises.findIndex(
      (ex) => ex.name === exercisePayload.name,
    );

    if (method === "DELETE") {
      //DELETE exercise at existingExerciseIndex
      if (existingExerciseIndex === -1) {
        throw new Error("Exercise not found in workout");
      }
      workout.exercises.splice(existingExerciseIndex, 1);
    } else if (method === "PATCH") {
      // PATCH exercise already exists in workout, update
      if (existingExerciseIndex === -1) {
        throw new Error("Exercise not found in workout");
      }
      Object.assign(workout.exercises[existingExerciseIndex], exercisePayload);
    } else if (method === "POST") {
      // POST new exercise, push to exercises
      if (existingExerciseIndex !== -1) {
        throw new Error(
          "Exercise already exists in workout, cannot add duplicate",
        );
      }
      workout.exercises.push(exercisePayload);
    }

    return this.repository.updateById(workoutId, workout);
  }

  async getWorkout(workoutId: string, userId: string) {
    this.assertValidWorkoutId(workoutId);

    const workout = await this.repository.findById(workoutId);
    if (!workout) throw new Error("Workout not found");

    if (workout.userId.toString() !== userId) {
      throw new Error("You do not have permission to view this workout");
    }
    
    // enrich exercises with details from exercise data based on exercise ID stored in DB
    const enrichedExercises = workout.exercises.map((ex) =>
      enrichExerciseEntry(ex),
    );

    return {
      ...workout,
      exercises: enrichedExercises,
    };
  }

  async getActiveSession(userId: string) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const workout = await this.repository.findActiveByUser(userId);
    if (!workout) return null;

    // enrich exercises with details from exercise data based on exercise ID stored in DB
    const enrichedExercises = workout.exercises.map((ex) =>
      enrichExerciseEntry(ex),
    );

    return {
      ...workout,
      exercises: enrichedExercises,
    };
  }

  async getUserWorkouts(userId: string) {
    const workouts = await this.repository.findByUser(userId);

    return workouts.map((workout) => {
      // enrich exercises with details from exercise data based on exercise ID stored in DB
      const enrichedExercises = workout.exercises.map((ex) =>
        enrichExerciseEntry(ex),
      );

      return {
        ...workout,
        exercises: enrichedExercises,
      };
    });
  }

  async deleteWorkout(id: string) {
    this.assertValidWorkoutId(id);

    return this.repository.deleteById(id);
  }
}
