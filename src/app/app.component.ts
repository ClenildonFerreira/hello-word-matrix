import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatrixHelloWorldComponent } from './matrix-hello-world/matrix-hello-world.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatrixHelloWorldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'matrix-hello-world';
}
