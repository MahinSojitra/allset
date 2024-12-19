import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./app-components/navbar/navbar.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-app';
}
