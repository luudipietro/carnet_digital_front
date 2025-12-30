import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeudaSocio } from '../../deudaSocio';
import { ServiceDeudaSocio } from '../serviceDeudaSocio';
// import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-lista',
  imports: [],
  templateUrl: './lista.html',
  styleUrl: "lista.css"
  
})
export class Lista {
  deudaSocio = signal<DeudaSocio | null>(null);

  private serviceDeudaSocio = inject(ServiceDeudaSocio);
  private route = inject(ActivatedRoute);

  constructor(){
    // this.cargar("20-44189406-7");
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const cuitUrl = params.get('cuit');
      if (cuitUrl) {
        this.cargar(cuitUrl);
      }
    });
  }
  cargar(cuit: string){
    this.serviceDeudaSocio.obtenerDeudaSocio(cuit)
    .subscribe({
      next: (data) => this.deudaSocio.set(data),
      error: (err) => console.error("Error cargando deuda del socio", err)
    })
  }

}
