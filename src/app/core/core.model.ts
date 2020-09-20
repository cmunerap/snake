export interface Node {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export enum Direction {
  up,
  down,
  left,
  right
}

export const newPosition = {
  [Direction.up]: (node: Node) => (node.y = node.y - 1, node),
  [Direction.down]: (node: Node) => (node.y = node.y + 1, node),
  [Direction.left]: (node: Node) => (node.x = node.x - 1, node),
  [Direction.right]: (node: Node) => (node.x = node.x + 1, node),
};
