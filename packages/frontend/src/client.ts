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
      if (todoId) {
        const newTitle = prompt('新しいタイトルを入力してください:');
        if (newTitle) {
          try {
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
            
            await updateTodo(todoId, { title: newTitle });
            showToast('TODOが更新されました', 'success');
            
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } catch (error) {
            console.error('Failed to update todo:', error);
            showToast('TODOの更新に失敗しました', 'error');
            editBtn.style.opacity = '1';
            editBtn.style.pointerEvents = 'auto';
          }
        }
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