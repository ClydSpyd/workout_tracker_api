/**
 * Workout Repository
 * Handles database access for workout sessions using Mongoose models.
 * Methods:
 *   - create: Create a workout session
 *   - findById: Retrieve a workout session by ID
 *   - updateById: Update a workout session by ID
 *   - findByUser: List all workouts for a user
 *   - findByUserAndDate: Find a workout by user and date
 *   - deleteById: Delete a workout session by ID
 */
import { WorkoutModel } from "./workout.model";

export class WorkoutRepository {
    /**
     * Create a workout session
     * @param data Workout data
     * @returns Created workout document
     */
  async create(data: any) {
    return (await WorkoutModel.create(data)).populate({
      path: "baseRoutine",
      select:"-description"
    });
  }

  async findById(id: string) {
      /**
       * Retrieve a workout session by ID
       * @param id Workout session ID
       * @returns Workout document
       */
    return WorkoutModel.findById(id);
  }

  async updateById(id: string, data: any) {
      /**
       * Update a workout session by ID
       * @param id Workout session ID
       * @param data Updated workout data
       * @returns Updated workout document
       */
    return WorkoutModel.findByIdAndUpdate(id, data, { new: true });
  }
  async findByUser(userId: string) {
      /**
       * List all workouts for a user
       * @param userId Authenticated user ID
       * @returns Array of workout documents
       */
    return WorkoutModel.find({ userId }).sort({ date: -1 });
  }

  async findByUserAndDate(userId: string, date: Date) {
      /**
       * Find a workout by user and date
       * @param userId Authenticated user ID
       * @param date Workout date
       * @returns Workout document or null
       */
    return WorkoutModel.findOne({ userId, date });
  }

  async deleteById(id: string) {
      /**
       * Delete a workout session by ID
       * @param id Workout session ID
       * @returns Deleted workout document
       */
    return WorkoutModel.findByIdAndDelete(id);
  }
}
