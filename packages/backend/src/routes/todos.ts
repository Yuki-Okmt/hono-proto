import { Hono } from 'hono';
import { db } from '../db';
import { CreateTodoSchema, UpdateTodoSchema } from '@todo-app/shared';
import { zValidator } from '@hono/zod-validator';

const todos = new Hono();

todos.get('/', async (c) => {
  const todoList = await db.todo.findMany({
    include: {
      status: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  return c.json(todoList);
});

todos.post('/', zValidator('json', CreateTodoSchema), async (c) => {
  const data = c.req.valid('json');
  
  const todo = await db.todo.create({
    data,
    include: {
      status: true,
    },
  });
  
  return c.json(todo, 201);
});

todos.get('/:id', async (c) => {
  const id = c.req.param('id');
  
  const todo = await db.todo.findUnique({
    where: { id },
    include: {
      status: true,
    },
  });
  
  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404);
  }
  
  return c.json(todo);
});

todos.put('/:id', zValidator('json', UpdateTodoSchema), async (c) => {
  const id = c.req.param('id');
  const data = c.req.valid('json');
  
  try {
    const todo = await db.todo.update({
      where: { id },
      data,
      include: {
        status: true,
      },
    });
    
    return c.json(todo);
  } catch (error) {
    return c.json({ error: 'Todo not found' }, 404);
  }
});

todos.delete('/:id', async (c) => {
  const id = c.req.param('id');
  
  try {
    await db.todo.delete({
      where: { id },
    });
    
    return c.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Todo not found' }, 404);
  }
});

export default todos;