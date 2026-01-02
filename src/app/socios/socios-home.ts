import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BuscadorSocio } from './buscador-socio/buscador-socio';

@Component({
  selector: 'app-socios-home',
  standalone: true,
  // Importamos el buscador y el RouterOutlet para mostrar hijos
  imports: [BuscadorSocio, RouterOutlet],
  templateUrl: './socios-home.html',
  // styleUrl opcional si necesitas estilos para el contenedor
})
export class SociosHome {}