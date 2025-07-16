interface Todo {
  id: string;
  title: string;
  description?: string;
  statusId: string;
  createdAt: string;
  updatedAt: string;
}

interface Status {
  id: string;
  name: string;
  color: string;
  order: number;
}

const API_BASE = 'http://localhost:3000';

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE}/api/todos`);
  return response.json();
}

async function fetchStatuses(): Promise<Status[]> {
  const response = await fetch(`${API_BASE}/api/statuses`);
  return response.json();
}

async function createTodo(data: { title: string; description?: string; statusId: string }): Promise<Todo> {
  const response = await fetch(`${API_BASE}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function deleteTodo(id: string): Promise<void> {
  await fetch(`${API_BASE}/api/todos/${id}`, {
    method: 'DELETE',
  });
}

async function updateTodo(id: string, data: { title?: string; description?: string; statusId?: string }): Promise<Todo> {
  const response = await fetch(`${API_BASE}/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function setupEventListeners() {
  const todoForm = document.getElementById('todo-form') as HTMLFormElement;
  if (todoForm) {
    todoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(todoForm);
      const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string || undefined,
        statusId: formData.get('statusId') as string,
      };
      
      try {
        // Add loading state
        const submitBtn = todoForm.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = '追加中...';
        }
        
        await createTodo(data);
        
        // Reset form
        todoForm.reset();
        
        // Show success feedback
        showToast('TODOが正常に追加されました', 'success');
        
        // Reload page to show new todo
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      } catch (error) {
        console.error('Failed to create todo:', error);
        showToast('TODOの追加に失敗しました', 'error');
      }
    });
  }

  document.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    
    // Handle delete button (including nested elements)
    const deleteBtn = target.closest('.delete-btn') as HTMLElement;
    if (deleteBtn) {
      const todoId = deleteBtn.dataset.todoId;
      if (todoId && confirm('このTODOを削除しますか？')) {
        try {
          deleteBtn.style.opacity = '0.5';
          deleteBtn.style.pointerEvents = 'none';
          
          await deleteTodo(todoId);
          showToast('TODOが削除されました', 'success');
          
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          console.error('Failed to delete todo:', error);
          showToast('TODOの削除に失敗しました', 'error');
          deleteBtn.style.opacity = '1';
          deleteBtn.style.pointerEvents = 'auto';
        }
      }
    }
    
    // Handle edit button (including nested elements)
    const editBtn = target.closest('.edit-btn') as HTMLElement;
    if (editBtn) {
      const todoId = editBtn.dataset.todoId;
      console.log('Edit button clicked, todoId:', todoId);
      if (todoId) {
        showEditModal(todoId);
      }
    }
  });
  
  // Setup theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
}

async function showEditModal(todoId: string) {
  console.log('showEditModal called with todoId:', todoId);
  try {
    // Fetch the current todo data
    const response = await fetch(`${API_BASE}/api/todos/${todoId}`);
    console.log('API response status:', response.status);
    const todo = await response.json();
    console.log('Todo data:', todo);
    
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'bg-white dark:bg-notion-bg-dark rounded-lg p-6 max-w-md w-full mx-4 shadow-xl';
    modal.innerHTML = `
      <h3 class="text-lg font-semibold mb-4 text-notion-text dark:text-notion-text-dark">TODOを編集</h3>
      <form id="edit-form">
        <div class="mb-4">
          <label class="block text-sm font-medium text-notion-text-secondary dark:text-notion-text-secondary-dark mb-1">タイトル</label>
          <input type="text" name="title" value="${todo.title}" class="w-full px-3 py-2 border border-notion-border dark:border-notion-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-notion-blue bg-white dark:bg-notion-bg-dark text-notion-text dark:text-notion-text-dark" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-notion-text-secondary dark:text-notion-text-secondary-dark mb-1">説明</label>
          <textarea name="description" rows="3" class="w-full px-3 py-2 border border-notion-border dark:border-notion-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-notion-blue bg-white dark:bg-notion-bg-dark text-notion-text dark:text-notion-text-dark">${todo.description || ''}</textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-notion-text-secondary dark:text-notion-text-secondary-dark mb-1">ステータス</label>
          <select name="statusId" class="w-full px-3 py-2 border border-notion-border dark:border-notion-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-notion-blue bg-white dark:bg-notion-bg-dark text-notion-text dark:text-notion-text-dark">
            ${await getStatusOptions(todo.statusId)}
          </select>
        </div>
        <div class="flex justify-end space-x-2">
          <button type="button" id="cancel-btn" class="px-4 py-2 text-sm border border-notion-border dark:border-notion-border-dark rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-notion-text dark:text-notion-text-dark">キャンセル</button>
          <button type="submit" class="px-4 py-2 text-sm bg-notion-blue text-white rounded-md hover:bg-blue-600">更新</button>
        </div>
      </form>
    `;
    
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    
    // Handle form submission
    const editForm = modal.querySelector('#edit-form') as HTMLFormElement;
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(editForm);
      const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string || undefined,
        statusId: formData.get('statusId') as string,
      };
      
      try {
        await updateTodo(todoId, data);
        showToast('TODOが更新されました', 'success');
        document.body.removeChild(backdrop);
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error('Failed to update todo:', error);
        showToast('TODOの更新に失敗しました', 'error');
      }
    });
    
    // Handle cancel button
    const cancelBtn = modal.querySelector('#cancel-btn') as HTMLButtonElement;
    cancelBtn.addEventListener('click', () => {
      document.body.removeChild(backdrop);
    });
    
    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        document.body.removeChild(backdrop);
      }
    });
    
  } catch (error) {
    console.error('Failed to fetch todo:', error);
    showToast('TODOの取得に失敗しました', 'error');
  }
}

async function getStatusOptions(selectedStatusId: string): Promise<string> {
  try {
    const statuses = await fetchStatuses();
    return statuses.map(status => 
      `<option value="${status.id}" ${status.id === selectedStatusId ? 'selected' : ''}>${status.name}</option>`
    ).join('');
  } catch (error) {
    console.error('Failed to fetch statuses:', error);
    return '';
  }
}

function showToast(message: string, type: 'success' | 'error' = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  setupEventListeners();
});