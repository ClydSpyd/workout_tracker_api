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

  async addSetToWorkout(
    workoutId: string,
    setPayload: SetPayload,
    userId: string,
  ) {
    const workout = await this.repository.findById(workoutId);
    if (!workout) throw new Error("Workout not found");
    if (workout.userId !== userId) {
      throw new Error("You do not have permission to update this workout");
    }

    const exercise = workout.exercises.find((ex) => ex.name === setPayload.name);

    if (exercise) {
      // existing, push to sets
      exercise.sets.push(setPayload.setData);
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
