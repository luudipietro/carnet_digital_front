import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { DeudaSocio } from '../deudaSocio';

@Injectable({
  providedIn: 'root',
})
export class ServiceDeudaSocio {
  private http = inject(HttpClient)
  private baseUrl = 'http://localhost:5000/api/socios'

  obtenerDeudaSocio(cuit:String): Observable<DeudaSocio>{
    return this.http.get<DeudaSocio>(`${this.baseUrl}/${cuit}`)
  }
}
