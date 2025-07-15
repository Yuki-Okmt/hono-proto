import { FC } from 'hono/jsx';
import { Todo } from '@todo-app/shared';
import Button from './ui/Button';
import Badge from './ui/Badge';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
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
    <div className="group bg-notion-bg border border-notion-border rounded-notion p-4 hover:shadow-notion-hover hover:border-gray-300 transition-all duration-200 animate-fade-in dark:bg-notion-bg-dark dark:border-notion-border-dark dark:hover:shadow-notion-hover-dark dark:hover:border-gray-600">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-notion-text dark:text-notion-text-dark mb-1 truncate">
            {todo.title}
          </h4>
          {todo.description && (
            <p className="text-sm text-notion-text-secondary dark:text-notion-text-secondary-dark line-clamp-2 mb-3">
              {todo.description}
            </p>
          )}
          {todo.status && (
            <Badge variant={getBadgeVariant(todo.status.color)} size="sm">
              {todo.status.name}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-notion-border dark:border-notion-border-dark">
        <div className="text-xs text-notion-text-secondary dark:text-notion-text-secondary-dark">
          {new Date(todo.createdAt).toLocaleDateString('ja-JP', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            className="edit-btn text-xs"
            data-todo-id={todo.id}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            編集
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="delete-btn text-xs text-notion-red hover:text-red-600"
            data-todo-id={todo.id}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            削除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;