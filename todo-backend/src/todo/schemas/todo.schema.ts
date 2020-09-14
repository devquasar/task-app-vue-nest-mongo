import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  description: String,
  tags: [{ tag: String }],
  status: String,
  date: String,
});
