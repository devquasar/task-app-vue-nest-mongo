import { Document } from 'mongoose';

export interface Post extends Document {
  readonly _id: number;
  readonly title: string;
  readonly description: string;
  readonly tags: [{ tag: String }];
  readonly status: string;
  readonly date: string;
}
