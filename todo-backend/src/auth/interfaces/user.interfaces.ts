import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: number;
  readonly username: string;
  readonly password: string;
}