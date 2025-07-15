import { Hono } from 'hono';
import { db } from '../db';
import { CreateStatusSchema, UpdateStatusSchema } from '@todo-app/shared';
import { zValidator } from '@hono/zod-validator';

const statuses = new Hono();

statuses.get('/', async (c) => {
  const statusList = await db.status.findMany({
    orderBy: {
      order: 'asc',
    },
  });
  
  return c.json(statusList);
});

statuses.post('/', zValidator('json', CreateStatusSchema), async (c) => {
  const data = c.req.valid('json');
  
  const status = await db.status.create({
    data: {
      ...data,
      order: data.order ?? 0,
    },
  });
  
  return c.json(status, 201);
});

statuses.get('/:id', async (c) => {
  const id = c.req.param('id');
  
  const status = await db.status.findUnique({
    where: { id },
    include: {
      todos: true,
    },
  });
  
  if (!status) {
    return c.json({ error: 'Status not found' }, 404);
  }
  
  return c.json(status);
});

statuses.put('/:id', zValidator('json', UpdateStatusSchema), async (c) => {
  const id = c.req.param('id');
  const data = c.req.valid('json');
  
  try {
    const status = await db.status.update({
      where: { id },
      data,
    });
    
    return c.json(status);
  } catch (error) {
    return c.json({ error: 'Status not found' }, 404);
  }
});

statuses.delete('/:id', async (c) => {
  const id = c.req.param('id');
  
  try {
    await db.status.delete({
      where: { id },
    });
    
    return c.json({ message: 'Status deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Status not found or has associated todos' }, 400);
  }
});

export default statuses;