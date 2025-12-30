import { Routes } from '@angular/router';
import { Lista } from './socios/lista/lista';

export const routes: Routes = [
    {path: 'socios/:cuit', component: Lista},
    // {path: '', component:Lista}
];
