import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'form',
    loadComponent: () => import('./pages/tarefa-form/tarefa-form.page').then( m => m.TarefaFormPage)
  },
  {
    path: 'form/:id',
    loadComponent: () => import('./pages/tarefa-form/tarefa-form.page').then( m => m.TarefaFormPage)
  },
];