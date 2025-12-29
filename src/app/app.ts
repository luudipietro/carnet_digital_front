import { Component, signal } from '@angular/core';
import { Lista } from './socios/lista/lista';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true, // Asegura que sea standalone
  imports: [Lista]
  
})
export class App {
  protected readonly title = signal('carnet_digital_app');
}
