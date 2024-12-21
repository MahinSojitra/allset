import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './app-components/home/home.component';
import { TodoInsertComponent } from './app-components/todo-insert/todo-insert.component';
import { MaintenanceComponent } from './app-components/maintenance/maintenance.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'create',
    component: TodoInsertComponent,
  },
  {
    path: 'live-soon',
    component: MaintenanceComponent,
  },
];
