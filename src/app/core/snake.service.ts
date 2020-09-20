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
  public score = 0;
  public maxScore = 0;
  private allowNewDirection = true;

  public start(dimensions: Dimensions, period: number) {
    this.score = 0;
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

  private stop() {
    this.maxScore = this.score > this.maxScore ? this.score : this.maxScore;
    clearInterval(this.timer);
  }

  public updateDirection(direction: Direction) {
    if (!direction || !this.allowNewDirection || direction === forbiddenDirection[this.direction]) {
      return;
    }
    this.direction = direction;
    this.allowNewDirection = false;
  }

  private generateRandomNode({width, height}: Dimensions): Node {
    return {
      x: randomNumber(1, width),
      y: randomNumber(1, height),
    };
  }

  private newFrame() {
    this.allowNewDirection = true;
    const update = newPosition[this.direction]({...this.head});

    if (this.hitsTheBody(update)) {
      this.stop();
    }

    let tail: Node;

    if (this.eatsTheFood(update)) {
      this.updateFoodPosition();
      this.score++;
    } else {
      tail = this.body.shift();
      if (this.isFoodPositionExpired()) {
        this.updateFoodPosition();
      }
    }

    this.body.push({...this.head});

    if (this.hitsTheBoundary(update)) {
      this.body.reverse();
      if (tail) {
        this.head = this.updateNodePosition(this.head, tail);
      }
      this.direction = forbiddenDirection[this.direction];
    } else {
      this.head = this.updateNodePosition(this.head, update);
    }

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

  private hitsTheBoundary(update: Node): boolean {
    return update.x < 0 || update.x > this.dimensions.width || update.y < 0 || update.y > this.dimensions.height;
  }

  private hitsTheBody(update: Node): boolean {
    return this.body.some(node => node.x === update.x && node.y === update.y);
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
