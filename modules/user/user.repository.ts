import { UserModel } from "./user.model";
import { UserDocument, UserInput } from "./user.types";

export class UserRepository {
  async create(data: UserInput): Promise<UserDocument> {
    return UserModel.create(data);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email });
    // return UserModel.findOne({ email }).exec();
  }

  async findByKeys(keys: Partial<UserInput>): Promise<UserDocument[]> {
    return UserModel.find(keys).select('-password');
  }
}
