import { RoutineModel } from "./routine.model";

export class RoutineRepository {
  async create(data: any) {
    return RoutineModel.create(data);
  }

  async findById(id: string) {
    return RoutineModel.findById(id);
  }

  async findAll() {
    return RoutineModel.find({}).sort({ name: 1 });
  }

  async deleteById(id: string) {
    return RoutineModel.findByIdAndDelete(id);
  }
}
