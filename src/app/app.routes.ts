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
                loadComponent: () => import('./(home)/casas/Casas.component').then(m => m.CasasComponent)
            },
            {
                path: 'gestionrecidencia',
                loadComponent: () => import('./(home)/residentes/Residentes.component').then(m => m.ResidentesComponent)
            },
            {
                path: 'control',
                loadComponent: () => import('./(home)/control/control.component').then(m => m.ControlComponent)
            },
            {
                path: 'mantenimiento',
                loadComponent: () => import('./(home)/mantenimiento/mantenimiento.component').then(m => m.MantenimientoComponent)
            },
            {
                path: 'pagofactura',
                loadComponent: () => import('./(home)/cuotas/Cuotas.component').then(m => m.CuotasComponent)
            },
            {
                path: 'comunicacion',
                loadComponent: () => import('./(home)/comunicacion/comunicacion.component').then(m => m.ComunicacionComponent)
            },         
            {
                path: 'configuracion',
                loadComponent: () => import('./(home)/configuracion/configuracion.component').then(m => m.ConfiguracionComponent)
            }
        ]
    },
];
