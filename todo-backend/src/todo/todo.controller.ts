import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Controller('/')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('todos')
  async getTodos(@Res() res) {
    const todos = await this.todoService.getTodos();
    return res.status(HttpStatus.OK).json(todos);
  }

  @Get('todo/:todoID')
  async getTodo(@Res() res, @Param('todoID') todoID) {
    const todo = await this.todoService.getTodo(todoID);
    if (!todo) throw new NotFoundException('Todo does not exist!');
    return res.status(HttpStatus.OK).json(todo);
  }

  @Post('/todo')
  async addTodo(@Res() res, @Body() CreateTodoDTO: CreateTodoDTO) {
    const newTodo = await this.todoService.addTodo(CreateTodoDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been submitted successfully!',
      todo: newTodo,
    });
  }

  @Put('/edit')
  async editTodo(
    @Res() res,
    @Query('todoID') todoID,
    @Body() createTodoDTO: CreateTodoDTO,
  ) {
    const editedTodo = await this.todoService.editTodo(todoID, createTodoDTO);
    if (!editedTodo) throw new NotFoundException('Todo does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully updated',
      todo: editedTodo,
    });
  }

  @Delete('/delete')
  async deleteTodo(@Res() res, @Query('todoID') todoID) {
    const deletedTodo = await this.todoService.deleteTodo(todoID);
    if (!deletedTodo) throw new NotFoundException('Todo does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been deleted!',
      todo: deletedTodo,
    });
  }
}
