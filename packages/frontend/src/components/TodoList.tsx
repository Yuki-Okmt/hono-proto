import { FC } from 'hono/jsx';
import { Todo, Status } from '@todo-app/shared';
import TodoForm from './TodoForm';
import TodoColumn from './TodoColumn';

interface TodoListProps {
  todos: Todo[];
  statuses: Status[];
}

const TodoList: FC<TodoListProps> = ({ todos, statuses }) => {
  return (
    <div className="space-y-8 animate-fade-in">

      {/* Add Todo Form */}
      <TodoForm statuses={statuses} />
      
      {/* Todo Board */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-notion-text dark:text-notion-text-dark">
            タスクボード
          </h2>
          <div className="flex items-center space-x-2 text-sm text-notion-text-secondary dark:text-notion-text-secondary-dark">
            <span>合計: {todos.length} 件</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statuses
            .sort((a, b) => a.order - b.order)
            .map((status) => (
              <TodoColumn
                key={status.id}
                status={status}
                todos={todos.filter((todo) => todo.statusId === status.id)}
              />
            ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-notion-bg-secondary border border-notion-border rounded-notion p-6 dark:bg-notion-bg-secondary-dark dark:border-notion-border-dark">
        <h3 className="text-lg font-medium text-notion-text dark:text-notion-text-dark mb-4">
          統計情報
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statuses.map((status) => {
            const count = todos.filter((todo) => todo.statusId === status.id).length;
            const percentage = todos.length > 0 ? Math.round((count / todos.length) * 100) : 0;
            
            return (
              <div key={status.id} className="text-center">
                <div className="text-2xl font-bold text-notion-text dark:text-notion-text-dark mb-1">
                  {count}
                </div>
                <div className="text-sm text-notion-text-secondary dark:text-notion-text-secondary-dark mb-2">
                  {status.name}
                </div>
                <div className="w-full bg-notion-border dark:bg-notion-border-dark rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: status.color
                    }}
                  />
                </div>
                <div className="text-xs text-notion-text-secondary dark:text-notion-text-secondary-dark mt-1">
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoList;