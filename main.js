import Tree from "./Tree.js";

// Create a binary search tree from an array of random numbers < 100
const createRandomArray = (length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};

const randomArray = createRandomArray(10);
const tree = new Tree();
randomArray.forEach((num) => {
  tree.insert(num);
});
tree.print();
// Confirm that the tree is balanced
const isBalanced = tree.isBalanced();
console.log("Is the tree balanced?", isBalanced);
// Print out all elements in level, pre, post, and in order
console.log("Level order traversal:");
tree.levelOrder((item) => console.log(item.value));
console.log("Preorder traversal:");
tree.preOrder((item) => console.log(item.value));
console.log("Postorder traversal:");
tree.postOrder((item) => console.log(item.value));
console.log("Inorder traversal:");
tree.inOrder((item) => console.log(item.value));

// Unbalance the tree by adding several numbers > 100
tree.insert(110);
tree.insert(120);
tree.insert(130);

// Confirm that the tree is unbalanced
const isUnbalanced = tree.isBalanced();
console.log("Is the tree unbalanced?", !isUnbalanced);

// Balance the tree by calling rebalance
tree.rebalance();

// Confirm that the tree is balanced
const isBalancedAfterRebalance = tree.isBalanced();
console.log("Is the tree balanced after rebalance?", isBalancedAfterRebalance);
tree.print();

// Print out all elements in level, pre, post, and in order
console.log("Level order traversal after rebalance:");
tree.levelOrder((item) => console.log(item.value));
console.log("Preorder traversal after rebalance:");
tree.preOrder((item) => console.log(item.value));
console.log("Postorder traversal after rebalance:");
tree.postOrder((item) => console.log(item.value));
console.log("Inorder traversal after rebalance:");
tree.inOrder((item) => console.log(item.value));
