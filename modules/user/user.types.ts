export interface UserInput {
  email: string;
  password: string;
  repeatPassword: string;
  username: string;
}

export interface UserDocument extends UserInput {
  _id: string;
  createdAt: Date;
}
