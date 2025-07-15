import { z } from 'zod';

export const StatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  order: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  statusId: z.string(),
  status: StatusSchema.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  statusId: z.string().min(1, 'Status is required'),
});

export const UpdateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  statusId: z.string().min(1, 'Status is required').optional(),
});

export const CreateStatusSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
  order: z.number().optional(),
});

export const UpdateStatusSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  color: z.string().min(1, 'Color is required').optional(),
  order: z.number().optional(),
});

export type Status = z.infer<typeof StatusSchema>;
export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodoRequest = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoRequest = z.infer<typeof UpdateTodoSchema>;
export type CreateStatusRequest = z.infer<typeof CreateStatusSchema>;
export type UpdateStatusRequest = z.infer<typeof UpdateStatusSchema>;