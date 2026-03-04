import { WorkoutRepository } from "./workout.repository";
import { LogWorkoutInput } from "./workout.types";

export class WorkoutService {
  constructor(
    private repository = new WorkoutRepository()
  ) {}

  async logWorkout(data: LogWorkoutInput) {
    const existing = await this.repository.findByUserAndDate(
      data.userId,
      new Date(data.date)
    );
    if (existing) {
      throw new Error("Workout already logged for this date");
    }
    return this.repository.create(data);
  }

  async getWorkout(id: string) {
    const workout = await this.repository.findById(id);
    if (!workout) throw new Error("Workout not found");
    return workout;
  }

  async getUserWorkouts(userId: string) {
    return this.repository.findByUser(userId);
  }

  async deleteWorkout(id: string) {
    return this.repository.deleteById(id);
  }
}
