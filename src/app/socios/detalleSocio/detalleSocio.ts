import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DeudaSocio } from '../../deudaSocio';
import { ServiceDeudaSocio } from '../serviceDeudaSocio';
// import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-detalleSocio',
  imports: [RouterLink],
  templateUrl: './detalleSocio.html',
  styleUrl: "./detalleSocio.css"
  
})export class DetalleSocio{

  // Uso de Signals para un manejo de estado reactivo y moderno
  deudaSocio = signal<DeudaSocio | null>(null);
  loading = signal<boolean>(false);
  errorMsg = signal<string | null>(null);

  private serviceDeudaSocio = inject(ServiceDeudaSocio);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Nos suscribimos a los cambios en los parámetros de la URL.
    // Cada vez que cambie /socios/:id, este código se ejecuta.
    this.route.paramMap.subscribe(params => {
      const idUrl = params.get('id'); // 'id' debe coincidir con lo definido en el routing
      if (idUrl) {
        this.cargar(idUrl);
      }
    });
  }

  cargar(id: string) {
    // Reiniciamos estado antes de la nueva búsqueda
    this.loading.set(true);
    this.errorMsg.set(null);
    this.deudaSocio.set(null);

    this.serviceDeudaSocio.obtenerDeudaSocio(id)
      .subscribe({
        next: (data) => {
          this.deudaSocio.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          if (err.status === 404) {
            this.errorMsg.set('No se encontró ningún socio con ese CUIT o DNI.');
          } else {
            this.errorMsg.set('Ocurrió un error de conexión con el servidor.');
          }
        }
      });
  }
}