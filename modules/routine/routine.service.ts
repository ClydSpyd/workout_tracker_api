import { Types } from "mongoose";
import { RoutineRepository } from "./routine.repository";
import { RoutineInput } from "./routine.types";

export class RoutineService {
  private repository = new RoutineRepository();

  async createRoutine(data: RoutineInput, userId: string) {
    return this.repository.create({ ...data, user: userId });
  }

  async updateRoutine(id: string, updates: Partial<RoutineInput>, userId: string) {
    const routine = await this.repository.findById(id);
    if (!routine) throw new Error("Routine not found");
    if (routine.user.toString() !== userId) {
      throw new Error("You do not have permission to update this routine");
    }
    Object.assign(routine, updates);
    return this.repository.updateById(id, routine);
  }

  async getRoutine(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid routine ID");
    }
    const routine = await this.repository.findById(id);
    if (!routine) throw new Error("Routine not found");
    return routine;
  }

  async getAllRoutines(userId?: string) {
    return this.repository.findAll(userId);
  }

  async deleteRoutine(id: string) {
    return this.repository.deleteById(id);
  }
}
