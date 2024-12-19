import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { count } from 'console';

@Component({
  selector: 'app-todo-insert',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-insert.component.html',
  styleUrl: './todo-insert.component.css'
})
export class TodoInsertComponent {
  todoTitle: string = '';
  todoDescription: string = '';
  successMessage: string = '';
  countdown: number = 5;
  redirectTimer: any;


  constructor(private router: Router) { }

  onSubmit(): void {
    if (this.todoTitle && this.todoDescription) {
      const newTodo = {
        id: new Date().getTime(),
        title: this.todoTitle,
        description: this.todoDescription,
        active: true,
      };

      let todos = JSON.parse(localStorage.getItem('todos') || '[]');
      todos.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(todos));

      this.successMessage = `Todo is created! Redirecting to Home in ${this.countdown} seconds...`;

      this.redirectTimer = setInterval(() => {
        this.countdown--;
        this.successMessage = `Todo is created! Redirecting to Home in ${this.countdown} seconds...`;

        if (this.countdown === 0) {
          clearInterval(this.redirectTimer);
          this.router.navigate(['/']);
        }
      }, 1000);
    }
  }
}