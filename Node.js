export default class Node {
  #_val;
  #_left;
  #_right;
  constructor(value) {
    this.#_val = value;
    this.#_left = null;
    this.#_right = null;
  }

  get value() {
    return this.#_val;
  }

  set value(value) {
    this.#_val = value;
  }

  get left() {
    return this.#_left;
  }

  set left(node) {
    this.#_left = node;
  }

  get right() {
    return this.#_right;
  }

  set right(node) {
    this.#_right = node;
  }
}
