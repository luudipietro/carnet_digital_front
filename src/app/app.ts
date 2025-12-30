import { Component, signal } from '@angular/core';

import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true, // Asegura que sea standalone
  imports: [RouterOutlet]
  
})
export class App {
  protected readonly title = signal('carnet_digital_app');
}
