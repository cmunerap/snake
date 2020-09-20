import { Component, HostListener } from '@angular/core';
import { Node, KeyMapper } from './core/core.model';
import { SnakeService } from './core/snake.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get body(): Node[] {
    return this.snake.body;
  }

  constructor(private snake: SnakeService) { }

  start() {
    this.snake.start({ width: 50, height: 50 }, 200);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const direction = KeyMapper[event.keyCode];
    if (direction){
      this.snake.updateDirection(direction);
    }
  }
}
