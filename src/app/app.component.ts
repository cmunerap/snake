import { Component } from '@angular/core';
import { Node } from './core/core.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  body: Node[] = [{x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2}];
}
