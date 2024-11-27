"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_model_1 = require("../models/todo_model");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const NewTodo = new todo_model_1.Todo(Math.random().toString(), text);
    TODOS.push(NewTodo);
    res.status(201).json({ message: 'Create the todo.', createTodo: NewTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.status(200).json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedTex = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS[todoIndex] = new todo_model_1.Todo(TODOS[todoIndex].id, updatedTex);
    res.status(200).json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS.splice(todoIndex, 1);
    res.status(200).json({ message: 'Todo deleted!' });
};
exports.deleteTodo = deleteTodo;
