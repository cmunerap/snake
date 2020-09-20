import { Injectable } from '@angular/core';
import { Node, Dimensions, Direction, newPosition, forbiddenDirection } from './core.model';
import { randomNumber } from './snake.helper';
import { FoodExpirationInSeconds } from './settings';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {
  public snake: Node[];
  public body: Node[];
  public head: Node;
  public food: Node;
  public foodPositionDue: number;
  public direction: Direction;
  public timer: any;
  public dimensions: Dimensions;

  public start(dimensions: Dimensions, period: number) {
    this.dimensions = dimensions;
    this.head = this.generateRandomNode(dimensions);

    this.updateFoodPosition();

    this.direction = Direction.right;

    this.body = [];
    this.snake = [this.head];

    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(this.newFrame.bind(this), period);
  }

  public updateDirection(direction: Direction) {
    if (!direction || direction === forbiddenDirection[this.direction]) {
      return;
    }
    this.direction = direction;
  }

  private generateRandomNode({width, height}: Dimensions): Node {
    return {
      x: randomNumber(1, width),
      y: randomNumber(1, height),
    };
  }

  private newFrame() {
    const update = newPosition[this.direction]({...this.head});

    if (this.eatsTheFood(update)) {
      this.updateFoodPosition();
    } else {
      this.body.shift();
      if (this.isFoodPositionExpired()) {
        this.updateFoodPosition();
      }
    }

    this.body.push({...this.head});

    this.head = this.updateNodePosition(this.head, update);
    this.snake = [...this.body, this.head];
  }

  private updateFoodPosition(): void {
    const {from, to} = FoodExpirationInSeconds;
    this.food = this.generateRandomNode(this.dimensions);
    this.foodPositionDue = (new Date()).getTime() + randomNumber(from, to) * 1000;
  }

  private isFoodPositionExpired(): boolean {
    return (new Date()).getTime() > this.foodPositionDue;
  }

  private updateNodePosition(current: Node, update: Node): Node {
    current.x = update.x;
    current.y = update.y;
    return current;
  }

  private eatsTheFood(update: Node) {
    return update.x === this.food.x && update.y === this.food.y;
  }

}
