import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { DeudaSocio } from '../deudaSocio';

@Injectable({
  providedIn: 'root',
})
export class ServiceDeudaSocio {
  private http = inject(HttpClient)
  private baseUrl = 'http://192.168.100.82:5000/api/socios'

  obtenerDeudaSocio(cuit:string): Observable<DeudaSocio>{
    return this.http.get<DeudaSocio>(`${this.baseUrl}/${cuit}`)
  }
}
