export interface Status {
  id: string;
  name: string;
  color: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  statusId: string;
  status?: Status;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  statusId: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  statusId?: string;
}

export interface CreateStatusRequest {
  name: string;
  color: string;
  order?: number;
}

export interface UpdateStatusRequest {
  name?: string;
  color?: string;
  order?: number;
}