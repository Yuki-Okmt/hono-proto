import { FC } from 'hono/jsx';
import { Todo, Status } from '@todo-app/shared';
import TodoItem from './TodoItem';
import Badge from './ui/Badge';

interface TodoColumnProps {
  status: Status;
  todos: Todo[];
}

const TodoColumn: FC<TodoColumnProps> = ({ status, todos }) => {
  const getBadgeVariant = (color: string) => {
    if (color.includes('#3B82F6')) return 'blue';
    if (color.includes('#F59E0B')) return 'yellow';
    if (color.includes('#10B981')) return 'green';
    if (color.includes('#EF4444')) return 'red';
    if (color.includes('#8B5CF6')) return 'purple';
    if (color.includes('#EC4899')) return 'pink';
    if (color.includes('#F97316')) return 'orange';
    return 'default';
  };

  return (
    <div 
      className="bg-notion-bg-secondary border border-notion-border rounded-notion p-4 dark:bg-notion-bg-secondary-dark dark:border-notion-border-dark drop-zone transition-all duration-200"
      data-status-id={status.id}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium text-notion-text dark:text-notion-text-dark">
            {status.name}
          </h3>
          <Badge variant={getBadgeVariant(status.color)} size="sm">
            {todos.length}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: status.color }}
          />
        </div>
      </div>
      
      <div className="space-y-3 min-h-[200px]">
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-notion-text-secondary dark:text-notion-text-secondary-dark">
            <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h2M9 5a2 2 0 012 2v11a2 2 0 01-2 2m0-18h6a2 2 0 012 2v11a2 2 0 01-2 2h-6M9 5v11" />
            </svg>
            <p className="text-sm">TODOがありません</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoColumn;