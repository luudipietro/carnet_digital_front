import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscador-socio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './buscador-socio.html',
  styleUrl: './buscador-socio.css'
})
export class BuscadorSocio {
  private router = inject(Router);

  // Usamos FormGroup para controlar los 3 casilleros
  form = new FormGroup({
    prefijo: new FormControl('', [Validators.maxLength(2), Validators.pattern('[0-9]*')]),
    dni: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(9), Validators.pattern('[0-9]*')]),
    verificador: new FormControl('', [Validators.maxLength(1), Validators.pattern('[0-9]*')])
  });

  buscar() {
    if (this.form.invalid) {
      Swal.fire({
          title: 'Error',
          text: 'El DNI/CUIT ingresado no es valido',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#eab308', // Un color amarillo similar a tu 'text-brand-yellow'
          background: '#fff',
          customClass: {
            title: 'fw-bold' // Para usar negrita en el título
          }
        });
      return
    };

    const { prefijo, dni, verificador } = this.form.value;
    
    // Limpiamos espacios en blanco por seguridad
    const p = prefijo ? prefijo.trim() : '';
    const d = dni ? dni.trim() : '';
    const v = verificador ? verificador.trim() : '';

    let valorFinal = '';

    // LÓGICA DE NEGOCIO:
    // Caso 1: CUIT Completo (Están los 3 llenos)
    if (p && d && v) {
      valorFinal = `${p}-${d}-${v}`;
    } 
    // Caso 2: Solo DNI (Prefijo y verificador vacíos)
    else if (!p && d && !v) {
      valorFinal = d;
    } 
    // Caso 3: Incompleto (Ej: puso prefijo pero no verificador)
    else {
      Swal.fire({
          title: 'Datos Incompletos',
          text: 'Por favor ingrese el CUIT completo o solo el dni en el centro',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#eab308', // Un color amarillo similar a tu 'text-brand-yellow'
          background: '#fff',
          customClass: {
            title: 'fw-bold' // Para usar negrita en el título
          }
        });
      return;
    }


    this.form.reset();
    this.router.navigate(['/socios', valorFinal]);
  }

  // Helper para mejorar UX: Pasa al siguiente input al escribir
  autoFocus(event: any, nextInputId: string, maxLength: number) {
    if (event.target.value.length >= maxLength) {
      const nextInput = document.getElementById(nextInputId);
      nextInput?.focus();
    }
  }
}