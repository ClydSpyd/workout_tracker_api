import { WorkoutModel } from "./workout.model";

export class WorkoutRepository {
  async create(data: any) {
    return WorkoutModel.create(data);
  }

  async findById(id: string) {
    return WorkoutModel.findById(id);
  }

  async findByUser(userId: string) {
    return WorkoutModel.find({ userId }).sort({ date: -1 });
  }

  async findByUserAndDate(userId: string, date: Date) {
    return WorkoutModel.findOne({ userId, date });
  }

  async deleteById(id: string) {
    return WorkoutModel.findByIdAndDelete(id);
  }
}
