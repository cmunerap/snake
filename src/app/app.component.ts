import { Component, HostListener } from '@angular/core';
import { Node, KeyMapper } from './core/core.model';
import { SnakeService } from './core/snake.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private snakeService: SnakeService) { }

  get snake(): Node[] {
    return this.snakeService.snake;
  }

  get food(): Node {
    return this.snakeService.food;
  }

  get score(): number {
    return this.snakeService.score;
  }

  get maxScore(): number {
    return this.snakeService.maxScore;
  }

  start() {
    this.snakeService.start({ width: 50, height: 50 }, 200);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const direction = KeyMapper[event.keyCode];
    if (direction){
      this.snakeService.updateDirection(direction);
    }
  }
}
