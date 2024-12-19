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
            "title": "Explore the 'AllSet'",
            "description": "Dive into your new productivity companion! Add your first task, complete it, and feel the joy of progress. Let’s make things happen!",
            "active": true,
            "created_at": new Date(),
            "updated_at": new Date()
          }
        ]
        this.saveTodosToLocalStorage();
      }
    }
  }

  startTyping(): void {
    if (this.currentIndex < this.text.length) {
      this.typedText += this.text.charAt(this.currentIndex);
      this.currentIndex++;
      setTimeout(() => this.startTyping(), 200);
    }
  }

  toggleEdit(todo: any): void {
    if (this.currentEditTodo === todo) {
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
        updated_at: new Date()
      };
      this.currentEditTodo = null;
      this.saveTodosToLocalStorage();
    }
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
    const index = this.todos.indexOf(todo);
    if (index > -1) {
      this.todos.splice(index, 1);

      const snackBarRef = this.snackBar.open("'" + todo.title + "' todo has been deleted.", 'Undo', {
        duration: 5000,
      });

      snackBarRef.onAction().subscribe(() => {
        this.undoDelete();
      });
    }

    this.saveTodosToLocalStorage();
  }

  undoDelete(): void {
    if (this.deletedTodo) {
      this.todos.unshift(this.deletedTodo);

      this.deletedTodo = null;

      this.snackBar.open('Action undone.', 'OK', {
        duration: 2000,
      });
    }

    this.saveTodosToLocalStorage();
  }

  saveTodosToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
}
