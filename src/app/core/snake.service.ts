import { Injectable } from '@angular/core';
import { Node, Dimensions, Direction, newPosition } from './core.model';
import { randomNumber } from './snake.helper';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {
  public body: Node[];
  public head: Node;
  public food: Node;
  public direction: Direction;
  public timer: any;

  public start(dimensions: Dimensions, period: number) {
    this.head = this.generateRandomNode(dimensions);

    this.food = this.generateRandomNode(dimensions);

    this.direction = Direction.right;

    this.body = [this.head];

    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(this.newFrame.bind(this), period);
  }

  public updateDirection(direction: Direction) {
    this.direction = direction ?? this.direction;
  }

  private generateRandomNode({width, height}: Dimensions): Node {
    return {
      x: randomNumber(1, width),
      y: randomNumber(1, height),
    };
  }

  private newFrame() {
    const update = newPosition[this.direction]({...this.head});
    this.head = this.updateNodePosition(this.head, update);

    this.body = [...this.body];
  }

  private updateNodePosition(current: Node, update: Node): Node {
    current.x = update.x;
    current.y = update.y;
    return current;
  }

}
