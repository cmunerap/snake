export interface Node {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export enum Direction {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right'
}

export const forbiddenDirection = {
  [Direction.up]: Direction.down,
  [Direction.down]: Direction.up,
  [Direction.left]: Direction.right,
  [Direction.right]: Direction.left,
};

export const newPosition = {
  [Direction.up]: (node: Node) => (node.y = node.y - 1, node),
  [Direction.down]: (node: Node) => (node.y = node.y + 1, node),
  [Direction.left]: (node: Node) => (node.x = node.x - 1, node),
  [Direction.right]: (node: Node) => (node.x = node.x + 1, node),
};

enum KEYS {
  up = 38,
  down = 40,
  right = 39,
  left = 37
}

export const KeyMapper = {
  [KEYS.up]: Direction.up,
  [KEYS.down]: Direction.down,
  [KEYS.left]: Direction.left,
  [KEYS.right]: Direction.right,
};
