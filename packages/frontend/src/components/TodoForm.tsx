import { FC } from 'hono/jsx';
import { Status } from '@todo-app/shared';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Card from './ui/Card';

interface TodoFormProps {
  statuses: Status[];
}

const TodoForm: FC<TodoFormProps> = ({ statuses }) => {
  const statusOptions = statuses.map(status => ({
    value: status.id,
    label: status.name
  }));

  return (
    <Card className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-6 h-6 bg-gradient-to-br from-notion-blue to-notion-purple rounded-notion flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-notion-text dark:text-notion-text-dark">
          新しいTODOを追加
        </h2>
      </div>
      
      <form id="todo-form" className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-notion-text dark:text-notion-text-dark mb-2">
            タイトル
          </label>
          <Input
            id="title"
            name="title"
            placeholder="TODOのタイトルを入力..."
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-notion-text dark:text-notion-text-dark mb-2">
            説明
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="詳細な説明を入力..."
            className="w-full px-3 py-2 text-notion-text font-notion bg-notion-bg border border-notion-border rounded-notion placeholder:text-notion-text-secondary focus:outline-none focus:ring-2 focus:ring-notion-blue focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none dark:bg-notion-bg-dark dark:text-notion-text-dark dark:border-notion-border-dark dark:placeholder:text-notion-text-secondary-dark dark:hover:border-gray-600"
          />
        </div>
        
        <div>
          <label htmlFor="statusId" className="block text-sm font-medium text-notion-text dark:text-notion-text-dark mb-2">
            ステータス
          </label>
          <Select
            id="statusId"
            name="statusId"
            options={statusOptions}
            placeholder="ステータスを選択..."
            required
          />
        </div>
        
        <div className="flex justify-end pt-4">
          <Button type="submit" className="min-w-[120px]">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            追加
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TodoForm;