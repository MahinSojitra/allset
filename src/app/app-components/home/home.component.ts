import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../../Todo';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, TimeAgoPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  text: string = 'Make today count.';
  typedText: string = '';
  currentIndex: number = 0;
  todos: Todo[] = [];
  deletedTodo: any = null;
  deletedTodoIndex: number | null = null;
  currentEditTodo: any = null;

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.startTyping();
    if (typeof window !== 'undefined') {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
      } else {
        this.todos = [
          {
            "id": 1,
            "title": "Welcome to AllSet!",
            "description": "Ready to boost your productivity? Start by adding your first task, check it off, and enjoy the feeling of getting things done. Let’s make it happen!",
            "active": true,
            "created_at": new Date(),
            "updated_at": new Date()
          }
        ];
        this.saveTodosToLocalStorage();
      }
    }
    this.ensureInitialTodoPosition();
    console.log('Active Todos:', this.hasActiveTodos);
  }

  startTyping(): void {
    if (this.currentIndex < this.text.length) {
      this.typedText += this.text.charAt(this.currentIndex);
      this.currentIndex++;
      setTimeout(() => this.startTyping(), 200);
    }
  }

  get hasActiveTodos(): boolean {
    return this.todos && this.todos.some(todo => todo.active == true);
  }

  private ensureInitialTodoPosition(): void {
    const initialTodoIndex = this.todos.findIndex(todo => todo.id === 1);
    if (initialTodoIndex > 0) {
      const [initialTodo] = this.todos.splice(initialTodoIndex, 1);
      this.todos.unshift(initialTodo);
    }
  }

  toggleEdit(todo: any): void {
    if (this.currentEditTodo?.id === todo.id) {
      this.currentEditTodo = null;
    } else {
      this.currentEditTodo = { ...todo };
    }
  }

  saveTodo(): void {
    const index = this.todos.findIndex(todo => todo.id === this.currentEditTodo.id);
    if (index !== -1) {
      this.todos[index] = {
        ...this.currentEditTodo,
        updated_at: new Date(),
      };
      this.currentEditTodo = null;
      this.ensureInitialTodoPosition();
      this.saveTodosToLocalStorage();
    }
  }

  isTodoModified(): boolean {
    if (!this.currentEditTodo) return false;

    const originalTodo = this.todos.find(todo => todo.id === this.currentEditTodo.id);
    if (!originalTodo) return false;

    return (
      originalTodo.title !== this.currentEditTodo.title ||
      originalTodo.description !== this.currentEditTodo.description
    );
  }

  markAsCompleted(todo: any): void {
    todo.active = !todo.active;

    this.snackBar.open("'" + todo.title + "' todo has been marked as completed.", 'Close', {
      duration: 5000,
    });

    this.saveTodosToLocalStorage();
  }

  deleteTodo(todo: any): void {
    this.deletedTodo = { ...todo };
    this.deletedTodoIndex = this.todos.indexOf(todo);

    if (this.deletedTodoIndex > -1) {
      this.todos.splice(this.deletedTodoIndex, 1);

      const snackBarRef = this.snackBar.open("'" + todo.title + "' todo has been deleted.", 'Undo', {
        duration: 5000,
      });

      snackBarRef.onAction().subscribe(() => {
        this.undoDelete();
      });
    }

    this.ensureInitialTodoPosition();
    this.saveTodosToLocalStorage();
  }

  undoDelete(): void {
    if (this.deletedTodo && this.deletedTodoIndex !== null) {
      this.todos.splice(this.deletedTodoIndex, 0, this.deletedTodo);

      this.deletedTodo = null;
      this.deletedTodoIndex = null;

      this.snackBar.open('Action undone.', 'OK', {
        duration: 2000,
      });
    }

    this.ensureInitialTodoPosition();
    this.saveTodosToLocalStorage();
  }


  saveTodosToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
}
