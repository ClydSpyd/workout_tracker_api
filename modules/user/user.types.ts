export interface UserInput {
  email: string;
  password: string;
}

export interface UserDocument extends UserInput {
  _id: string;
  createdAt: Date;
}
