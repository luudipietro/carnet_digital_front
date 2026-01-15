import { Routes } from '@angular/router';
import { SociosHome } from './socios/socios-home';
import { DetalleSocio } from './socios/detalleSocio/detalleSocio';
import { CargaArchivo } from './carga/cargaArchivo/carga-archivo';

export const routes: Routes = [
  {
    // Ruta padre: /socios
    path: 'socios',
    component: SociosHome,
    children: [
      // Ruta hija 1: Cuando entran a /socios sin nada más.
      // Podrías poner un componente de bienvenida aquí si quisieras.
      { path: '', redirectTo: '', pathMatch: 'full' },

      // Ruta hija 2: Cuando entran a /socios/20-3333333-1
      // Usamos ':id' como el nombre del parámetro que leerá DetalleSocioComponent
      { path: ':id', component: DetalleSocio }
    ]
  },
  {
    path: 'upload', component: CargaArchivo
  },
  // Redirección por defecto
  { path: '', redirectTo: '/socios', pathMatch: 'full' }
];