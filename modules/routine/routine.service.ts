import { RoutineRepository } from "./routine.repository";
import { RoutineInput } from "./routine.types";

export class RoutineService {
  constructor(
    private repository = new RoutineRepository()
  ) {}

  async createRoutine(data: RoutineInput) {
    return this.repository.create(data);
  }

  async getRoutine(id: string) {
    const routine = await this.repository.findById(id);
    if (!routine) throw new Error("Routine not found");
    return routine;
  }

  async getAllRoutines() {
    return this.repository.findAll();
  }

  async deleteRoutine(id: string) {
    return this.repository.deleteById(id);
  }
}
