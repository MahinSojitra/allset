import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './app-components/home/home.component';
import { TodoInsertComponent } from './app-components/todo-insert/todo-insert.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'create',
    component: TodoInsertComponent,
  }
];
