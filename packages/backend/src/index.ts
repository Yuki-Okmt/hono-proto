import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import todos from './routes/todos';
import statuses from './routes/statuses';

const app = new Hono();

app.use('*', cors());
app.use('*', logger());

app.route('/api/todos', todos);
app.route('/api/statuses', statuses);

app.get('/', (c) => {
  return c.json({ message: 'TODO App API' });
});

app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});

export default app;