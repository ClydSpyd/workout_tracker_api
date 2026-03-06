import { UserModel } from "./user.model";
import { UserInput } from "./user.types";

export class UserRepository {
  async create(data: UserInput) {
    return UserModel.create(data);
  }

  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }
}
