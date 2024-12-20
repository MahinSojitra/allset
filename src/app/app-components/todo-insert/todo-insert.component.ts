import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  countdown: number = 4;
  redirectTimer: any;


  constructor(private router: Router) { }

  onSubmit(): void {
    if (this.todoTitle && this.todoDescription) {
      const newTodo = {
        id: new Date().getTime(),
        title: this.todoTitle,
        description: this.todoDescription,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      };

      let todos = JSON.parse(localStorage.getItem('todos') || '[]');
      todos.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(todos));

      this.successMessage = `Todo is Created!`;

      this.redirectTimer = setInterval(() => {
        this.countdown--;
        this.successMessage = `Tight your seatbelt, redirecting in ${this.countdown} seconds...`;

        if (this.countdown === 0) {
          clearInterval(this.redirectTimer);
          this.router.navigate(['/']);
        }
      }, 1000);
    }
  }
}
