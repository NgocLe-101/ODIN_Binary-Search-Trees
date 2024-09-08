import Node from "./Node.js";
import { mergeSort } from "./mergeSort.js";
export default class Tree {
  #_root;
  constructor(arr) {
    this.#_root = null;
    if (Array.isArray(arr)) {
      this.buildTree(arr);
    }
  }
  isBalanced() {
    if (this.#_root === null) return true;
    return (
      Math.abs(
        this.height(this.#_root.left) - this.height(this.#_root.right)
      ) <= 1
    );
  }
  height(node) {
    if (node === null) return 0;
    if (node.left === null && node.right === null) return 1;
    if (node.left === null) return 1 + this.height(node.right);
    if (node.right === null) return 1 + this.height(node.left);
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }
  depth(node) {
    if (node === null) return -1;
    return this.height(this.#_root) - this.height(node);
  }
  #insert(root, value) {
    if (root === null) {
      root = new Node(value);
    } else if (value > root.value) {
      root.right = this.#insert(root.right, value);
    } else if (value < root.value) {
      root.left = this.#insert(root.left, value);
    }
    return root;
  }
  insert(value) {
    this.#_root = this.#insert(this.#_root, value);
  }
  buildTree(arr) {
    arr.forEach((item) => {
      this.insert(item);
    });
  }
  #print(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.#print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.#print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  print() {
    this.#print(this.#_root);
  }
  #deleteItem(root, value) {
    if (root === null) return;
    if (value > root.value) {
      root = this.#deleteItem(root.right, value);
    } else if (value < root.value) {
      root = this.#deleteItem(root.left, value);
    } else if (root.value === value) {
      let rightMostLeftNode = root.left;
      while (rightMostLeftNode.right !== null) {
        rightMostLeftNode = rightMostLeftNode.right;
      }
      root.left.right = rightMostLeftNode.left;
      rightMostLeftNode.right = root.right;
      rightMostLeftNode.left = root.left;
      return rightMostLeftNode;
    }
  }
  deleteItem(value) {
    this.#deleteItem(this.#_root, value);
  }
  #find(root, value) {
    if (root === null) return null;
    if (root.value > value) {
      return this.#find(root.left, value);
    } else if (root.value < value) {
      return this.#find(root.right, value);
    } else {
      return root;
    }
  }
  find(value) {
    return this.#find(this.#_root, value);
  }
  levelOrder(callback) {
    if (
      callback === undefined ||
      callback === null ||
      typeof callback !== "function"
    ) {
      throw new Error("Callback is required!");
    }
    const queue = [];
    queue.push(this.#_root);
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
      callback(node);
    }
  }
  #inOrder(root, callback) {
    if (root === null) return;
    this.#inOrder(root.left, callback);
    callback(root);
    this.#inOrder(root.right, callback);
  }
  #preOrder(root, callback) {
    if (root === null) return;
    callback(root);
    this.#preOrder(root.left, callback);
    this.#preOrder(root.right, callback);
  }
  #postOrder(root, callback) {
    if (root === null) return;
    this.#postOrder(root.left, callback);
    this.#postOrder(root.right, callback);
    callback(root);
  }
  inOrder(callback) {
    if (
      callback === undefined ||
      callback === null ||
      typeof callback !== "function"
    ) {
      throw new Error("Callback is required!");
    }
    this.#inOrder(this.#_root, callback);
  }
  preOrder(callback) {
    if (
      callback === undefined ||
      callback === null ||
      typeof callback !== "function"
    ) {
      throw new Error("Callback is required!");
    }
    this.#preOrder(this.#_root, callback);
  }
  postOrder(callback) {
    if (
      callback === undefined ||
      callback === null ||
      typeof callback !== "function"
    ) {
      throw new Error("Callback is required!");
    }
    this.#postOrder(this.#_root, callback);
  }
  #insertSortedArr(arr) {
    if (arr.length === 0) return;
    const mid = parseInt(arr.length / 2);
    this.insert(arr[mid]);
    this.#insertSortedArr(arr.slice(0, mid));
    this.#insertSortedArr(arr.slice(mid + 1));
  }
  rebalance() {
    const arr = [];
    this.preOrder((item) => {
      arr.push(item.value);
    });
    // Sort the arr
    const sortedArr = mergeSort(arr);
    // Clear the tree
    this.#_root = null;
    // Insert in order to rebalance the tree
    this.#insertSortedArr(sortedArr);
  }
}
