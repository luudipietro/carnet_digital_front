import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceCarga {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  uploadExcelFiles(sociosFile: File, deudasFile: File): Observable<any> {
    const formData = new FormData();

    // Las keys deben coincidir EXACTAMENTE con lo que espera el backend
    formData.append('socios', sociosFile);
    formData.append('deudas', deudasFile);

    // No agregamos headers manuales para Content-Type, dejamos que el navegador lo haga
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}