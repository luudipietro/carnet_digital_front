import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { ServiceCarga } from '../service-carga';
@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carga-archivo.html',
  styleUrls: ['./carga-archivo.css']
})
export class CargaArchivo {
  private uploadService = inject(ServiceCarga);
  private cdr = inject(ChangeDetectorRef);

  // Almacenamos los archivos
  selectedSocios: File | null = null;
  selectedDeudas: File | null = null;

  isLoading = false;
  message = '';

  // Método genérico para capturar archivos y asignarlos
  onFileSelected(event: Event, type: 'socios' | 'deudas'): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (type === 'socios') {
        this.selectedSocios = file;
      } else {
        this.selectedDeudas = file;
      }
    }
  }

  onSubmit(): void {
    if (!this.selectedSocios) {
      this.message = 'Por favor, selecciona al menos el archivo de socios.';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.uploadService.uploadExcelFiles(this.selectedSocios, this.selectedDeudas)
      .pipe(
        // Finalize se ejecuta tanto en éxito como en error (bueno para apagar spinners)
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      )
        
      )
      .subscribe({
        next: (response) => {
          console.log('Carga exitosa', response);
          this.message = 'Archivos enviados correctamente.';
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al subir', error);
          this.message = 'Ocurrió un error al enviar los archivos.';
        }
      });
  }

  private resetForm(): void {
    this.selectedSocios = null;
    this.selectedDeudas = null;
    // Opcional: Limpiar los inputs del DOM si es necesario usando ViewChild
  }
}