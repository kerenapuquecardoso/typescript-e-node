import { RequestHandler } from 'express';
import {Todo} from '../models/todo_model';
const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    const NewTodo = new Todo(Math.random().toString(), text);
    TODOS.push(NewTodo);
    res.status(201).json({message: 'Create the todo.', createTodo: NewTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(200).json({todos: TODOS});
}


export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;
    const updatedTex = (req.body as {text: string}).text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0){
        throw new Error('Could not find todo!');
    }
    TODOS[todoIndex] = new Todo (TODOS[todoIndex].id, updatedTex);
    res.status(200).json({message: 'Updated!', updatedTodo: TODOS[todoIndex]});
}

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId =  req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0){
        throw new Error('Could not find todo!');
    }

    TODOS.splice(todoIndex, 1);
    res.status(200).json({message: 'Todo deleted!'});
}