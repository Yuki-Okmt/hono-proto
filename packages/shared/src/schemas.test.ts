import { describe, it, expect } from 'vitest';
import { CreateTodoSchema, UpdateTodoSchema, CreateStatusSchema } from './schemas';

describe('schemas', () => {
  describe('CreateTodoSchema', () => {
    it('should validate valid todo data', () => {
      const validData = {
        title: 'Test Todo',
        description: 'This is a test todo',
        statusId: 'status123',
      };

      const result = CreateTodoSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject empty title', () => {
      const invalidData = {
        title: '',
        statusId: 'status123',
      };

      const result = CreateTodoSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject missing statusId', () => {
      const invalidData = {
        title: 'Test Todo',
      };

      const result = CreateTodoSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('UpdateTodoSchema', () => {
    it('should validate partial updates', () => {
      const validData = {
        title: 'Updated Todo',
      };

      const result = UpdateTodoSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should allow empty object', () => {
      const validData = {};

      const result = UpdateTodoSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('CreateStatusSchema', () => {
    it('should validate valid status data', () => {
      const validData = {
        name: 'In Progress',
        color: '#F59E0B',
        order: 2,
      };

      const result = CreateStatusSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const invalidData = {
        name: '',
        color: '#F59E0B',
      };

      const result = CreateStatusSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});