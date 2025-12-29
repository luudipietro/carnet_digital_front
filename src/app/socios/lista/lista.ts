import { Component, inject, signal } from '@angular/core';
import { DeudaSocio } from '../../deudaSocio';
import { ServiceDeudaSocio } from '../serviceDeudaSocio';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-lista',
  imports: [CommonModule],
  templateUrl: './lista.html',
  styleUrl: "lista.css"
  
})
export class Lista {
  deudaSocio = signal<DeudaSocio | null>(null);

  private serviceDeudaSocio = inject(ServiceDeudaSocio);

  constructor(){
    this.cargar("20-44189406-7");
  }
  cargar(cuit: string){
    this.serviceDeudaSocio.obtenerDeudaSocio(cuit)
    .subscribe({
      next: (data) => this.deudaSocio.set(data),
      error: (err) => console.error("Error cargando empleados", err)
    })
  }

}
