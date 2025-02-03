import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        children: [  // Agregar rutas hijas dentro de home
            {
                path: 'registroviviendas',
                loadComponent: () => import('./desktop-home/registroviviendas/registroviviendas.component').then(m => m.RegistroviviendasComponent)
            }
        ]
    },
];
