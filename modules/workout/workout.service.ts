import { Types } from "mongoose";
import { WorkoutRepository } from "./workout.repository";
import { CreateWorkoutPayload, SetPayload, WorkoutExerciseInput, WorkoutSession } from "./workout.types";

export class WorkoutService {
  private repository = new WorkoutRepository();

  async createWorkout(data: CreateWorkoutPayload, userId: string) {
    if (!userId) {
      throw new Error("User ID is required to log a workout");
    }

    if (data.baseId && !Types.ObjectId.isValid(data.baseId)) {
      throw new Error("Invalid routine baseID");
    }

    return this.repository.create({ ...data, userId });
  }

  async updateWorkout(
    workoutId: string,
    updates: Partial<WorkoutSession>,
    userId: string,
  ) {
    const workout = await this.repository.findById(workoutId);
    if (!workout) throw new Error("Workout not found");
    if (workout.userId !== userId) {
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
    const workout = await this.repository.findById(workoutId);
    if (!workout) throw new Error("Workout not found");
    if (workout.userId !== userId) {
      throw new Error("You do not have permission to update this workout");
    }

    const exercise = workout.exercises.find((ex) => ex.name === setPayload.name);

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
      if (!!setIdx && setIdx >= 0 && setIdx < exercise.sets.length - 1) {
        // existing workout, update existing set
        exercise.sets[setIdx].set(setPayload.setData);
      } else {
        // existing workout, new set - push to sets
        exercise.sets.push(setPayload.setData);
      }
    } else {
      // new exercise, format and add to workout
      workout.exercises.push({
        name: setPayload.name,
        sets: [setPayload.setData],
      });
    }

    return this.repository.updateById(workoutId, workout);
  }

  async getWorkout(workoutId: string, userId: string) {
    const workout = await this.repository.findById(workoutId);
    if (!workout) throw new Error("Workout not found");

    if (workout.userId !== userId) {
      throw new Error("You do not have permission to view this workout");
    }

    return workout;
  }

  async getUserWorkouts(userId: string) {
    return this.repository.findByUser(userId);
  }

  async deleteWorkout(id: string) {
    return this.repository.deleteById(id);
  }
}
