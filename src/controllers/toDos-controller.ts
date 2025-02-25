import { RequestHandler, text } from 'express';
import { ToDo } from '../models/toDo-model';

const TO_DOS: ToDo[] = [];

export const createToDo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newToDo = new ToDo(Math.random().toString(), text);

  TO_DOS.push(newToDo);

  res.status(201).json({ message: 'To Do created!', createdToDo: newToDo });
};

export const getToDos: RequestHandler = (req, res, next) => {
  res.json({ toDos: TO_DOS });
};

export const updateToDo: RequestHandler<{ id: string }> = (req, res, next) => {
  const toDoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const toDoIndex = TO_DOS.findIndex((toDo) => toDo.id === toDoId);

  if (toDoIndex < 0) {
    throw new Error('Could not find to-do!');
  }

  TO_DOS[toDoIndex] = new ToDo(TO_DOS[toDoIndex].id, updatedText);

  res.json({ message: 'To-Do updated!', updateToDo: TO_DOS[toDoIndex] });
};

export const deleteToDo: RequestHandler = (req, res, next) => {
  const toDoId = req.params.id;

  const toDoIndex = TO_DOS.findIndex((toDo) => toDo.id === toDoId);

  if (toDoIndex < 0) {
    throw new Error('Could not find to-do!');
  }

  TO_DOS.splice(toDoIndex, 1);

  res.json({ message: 'To-Do deleted!' });
};
