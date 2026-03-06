import { RoutineRepository } from "./routine.repository";
import { RoutineInput } from "./routine.types";

export class RoutineService {
  private repository = new RoutineRepository();

  async createRoutine(data: RoutineInput, userId: string) {
    return this.repository.create({ ...data, userId });
  }

  async getRoutine(id: string) {
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
