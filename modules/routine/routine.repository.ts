import { RoutineModel } from "./routine.model";

export class RoutineRepository {
  async create(data: any) {
    return RoutineModel.create(data);
  }

  async findById(id: string) {
    return RoutineModel.findById(id);
  }

async findAll(userId?: string) {
    const filter = userId ? { userId } : {};
    if (userId) {
        return RoutineModel.find(filter).sort({ name: 1 });
    } else {
        return RoutineModel.find(filter)
            .sort({ name: 1 })
            .populate({
                path: "user",
                select: "username profilePictureUrl",
            });
    }
}

  async deleteById(id: string) {
    return RoutineModel.findByIdAndDelete(id);
  }
}
