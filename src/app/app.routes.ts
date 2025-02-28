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
                loadComponent: () => import('./desktop-home/Casas/Casas.component').then(m => m.CasasComponent)
            },
            {
                path: 'gestionrecidencia',
                loadComponent: () => import('./desktop-home/Residentes/Residentes.component').then(m => m.ResidentesComponent)
            },
            {
                path: 'controlaccesso',
                loadComponent: () => import('./desktop-home/controlacceso/controlacceso.component').then(m => m.ControlaccesoComponent)
            },
            {
                path: 'mantenimiento',
                loadComponent: () => import('./desktop-home/mantenimiento/mantenimiento.component').then(m => m.MantenimientoComponent)
            },
            {
                path: 'pagofactura',
                loadComponent: () => import('./desktop-home/Cuotas/Cuotas.component').then(m => m.CuotasComponent)
            },
            {
                path: 'comunicacion',
                loadComponent: () => import('./desktop-home/comunicacion/comunicacion.component').then(m => m.ComunicacionComponent)
            },         
            {
                path: 'configuracion',
                loadComponent: () => import('./desktop-home/configuracion/configuracion.component').then(m => m.ConfiguracionComponent)
            }
        ]
    },
];
