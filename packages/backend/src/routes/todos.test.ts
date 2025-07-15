import { describe, it, expect, beforeEach, vi } from 'vitest';
import { testClient } from 'hono/testing';
import todos from './todos';

vi.mock('../db', () => ({
  db: {
    todo: {
      findMany: vi.fn(),
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('todos route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /todos', () => {
    it('should return todos list', async () => {
      const client = testClient(todos) as any;
      
      const mockTodos = [
        {
          id: '1',
          title: 'Test Todo',
          description: 'Test description',
          statusId: 'status1',
          status: { id: 'status1', name: 'Todo' },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const { db } = await import('../db');
      vi.mocked(db.todo.findMany).mockResolvedValue(mockTodos);

      const response = await client.index.$get();
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toEqual(mockTodos);
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const client = testClient(todos) as any;
      
      const newTodo = {
        title: 'New Todo',
        description: 'New description',
        statusId: 'status1',
      };

      const createdTodo = {
        id: '1',
        ...newTodo,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: { id: 'status1', name: 'Todo' },
      };

      const { db } = await import('../db');
      vi.mocked(db.todo.create).mockResolvedValue(createdTodo);

      const response = await client.index.$post({ json: newTodo });
      expect(response.status).toBe(201);
      
      const data = await response.json();
      expect(data).toEqual(createdTodo);
    });
  });
});