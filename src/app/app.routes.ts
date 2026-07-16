import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { MyTasks } from './my-tasks/my-tasks';
import { Search } from './search/search';
import { LoginComponent } from './login-component/login-component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'my-tasks' },
  { path: 'home', component: Homepage },
  { path: 'my-tasks', component: MyTasks },
  { path: 'search', component: Search },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'my-tasks' },
];
