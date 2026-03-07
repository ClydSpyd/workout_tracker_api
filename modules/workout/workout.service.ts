/**
 * Workout Service
 * Contains business logic for workout session creation, incremental updates, retrieval, and listing.
 * Methods:
 *   - createWorkout: Create a new workout session
 *   - updateWorkout: Incrementally update a workout session
 *   - getWorkout: Retrieve a workout session
 *   - getUserWorkouts: List all workouts for a user
 */
import { WorkoutRepository } from "./workout.repository";
import { CreateWorkoutPayload, WorkoutSession } from "./workout.types";

export class WorkoutService {
      /**
       * PATCH: Incremental update to workout session
       * @param workoutId Workout session ID
       * @param updates Partial workout data to merge
       * @param userId Authenticated user ID
       * @returns Updated workout session
       */
    // PATCH: Incremental update to workout session
    async updateWorkout(workoutId: string, updates: Partial<WorkoutSession>, userId: string) {
      const workout = await this.repository.findById(workoutId);
      if (!workout) throw new Error("Workout not found");
      if (workout.userId !== userId) {
        throw new Error("You do not have permission to update this workout");
      }
      // Merge updates into workout
      Object.assign(workout, updates);
      return this.repository.updateById(workoutId, workout);
    }
  private repository = new WorkoutRepository();

  async createWorkout(data: CreateWorkoutPayload, userId: string) {
      /**
       * Create a new workout session
       * @param data Workout creation input
       * @param userId Authenticated user ID
       * @returns Created workout session
       */
    if(!userId) {
      throw new Error("User ID is required to log a workout");
    }

    return this.repository.create({...data, userId});
  }

  async getWorkout(workoutId: string, userId: string) {
      /**
       * Retrieve a workout session by ID
       * @param workoutId Workout session ID
       * @param userId Authenticated user ID
       * @returns Workout session
       */
    const workout = await this.repository.findById(workoutId);
    if (!workout) throw new Error("Workout not found");

    if(workout.userId !== userId) {
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
