import { WorkoutRepository } from "./workout.repository";
import { LogWorkoutInput } from "./workout.types";

export class WorkoutService {
  private repository = new WorkoutRepository();

  async logWorkout(data: LogWorkoutInput, userId: string) {
    if(!userId) {
      throw new Error("User ID is required to log a workout");
    }
    
    const existing = await this.repository.findByUserAndDate(
      userId,
      new Date(data.date)
    );
    if (existing) {
      throw new Error("Workout already logged for this date");
    }
    return this.repository.create({...data, userId});
  }

  async getWorkout(workoutId: string, userId: string) {
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
