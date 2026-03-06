import { UserRepository } from "./user.repository";
import bcrypt from "bcryptjs";
import { UserInput } from "./user.types";

export class UserService {
  private repository = new UserRepository();

  async register(data: UserInput) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.repository.create({ ...data, password: hashed });
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    return valid ? user : null;
  }
}
