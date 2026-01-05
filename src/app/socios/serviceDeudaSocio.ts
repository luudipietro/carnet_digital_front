import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { DeudaSocio } from '../deudaSocio';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceDeudaSocio {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  obtenerDeudaSocio(cuit:string): Observable<DeudaSocio>{
    return this.http.get<DeudaSocio>(`${this.baseUrl}/${cuit}`)
  }
}
