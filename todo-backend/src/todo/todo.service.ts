import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTodoDTO } from './dto/create-todo.dto';
import { Post } from './interfaces/post.interface';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly postModel: Model<Post>) {}

  async getTodos(): Promise<Post[]> {
    const todos = await this.postModel.find().exec();
    return todos;
  }

  async getTodo(todoID): Promise<Post> {
    const todo = await this.postModel.findById(todoID).exec();
    return todo;
  }

  async addTodo(CreateTodoDTO: CreateTodoDTO): Promise<Post> {
    const newTodo = await this.postModel(CreateTodoDTO);
    return newTodo.save();
  }

  async editTodo(todoID, CreateTodoDTO: CreateTodoDTO): Promise<Post> {
    const editedTodo = await this.postModel.findByIdAndUpdate(
      todoID,
      CreateTodoDTO,
      { new: true },
    );
    return editedTodo;
  }

  async deleteTodo(todoID): Promise<any> {
    const deleteTodo = await this.postModel.findByIdAndRemove(todoID);
    return deleteTodo;
  }
}
