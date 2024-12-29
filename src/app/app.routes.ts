import { Routes } from '@angular/router';

export const RouteConfig: Routes = [
    {
        path: '',
        loadComponent: () => import('@/app/shared/ui/layout').then((m) => m.LandingPageComponent),
    },
    {
        path: 'home',
        loadComponent: () => import('@/app/shared/ui/layout').then((m) => m.HomePageComponent),
        children: [
            {
                path: 'settings',
                loadComponent: () => import('@/app/features/home').then((m) => m.SettingPageComponent),
            },
            {
                path: 'board',
                loadComponent: () => import('@/app/features/home').then((m) => m.BoardPageComponent),
            },
        ],
    },
    {
        path: 'auth',
        loadComponent: () => import('@/app/shared/ui/layout').then((m) => m.AuthPageComponent),
        children: [
            {
                path: 'sign-in',
                loadComponent: () => import('@/app/features/auth').then((m) => m.SigninComponent),
            },
            {
                path: 'sign-up',
                loadComponent: () => import('@/app/features/auth').then((m) => m.SignupComponent),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
