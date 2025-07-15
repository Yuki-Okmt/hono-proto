import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import Layout from './components/Layout';
import TodoList from './components/TodoList';
import type { Todo, Status } from '@todo-app/shared';

const app = new Hono();

const API_BASE = 'http://localhost:3000';

async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(`${API_BASE}/api/todos`);
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

async function fetchStatuses(): Promise<Status[]> {
  try {
    const response = await fetch(`${API_BASE}/api/statuses`);
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

app.use('/src/*', serveStatic({ root: './' }));

app.get('/', async (c) => {
  const [todos, statuses] = await Promise.all([
    fetchTodos(),
    fetchStatuses(),
  ]);

  return c.html(
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TodoList todos={todos} statuses={statuses} />
        </div>
      </div>
    </Layout>
  );
});

export default app;