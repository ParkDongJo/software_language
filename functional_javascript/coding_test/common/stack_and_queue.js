let stack = [];
stack.push(2);       // stack is now [2]
stack.push(5);       // stack is now [2, 5]
stack.push(3);       // stack is now [2, 5, 3]
let top = stack.slice(-1)[0];   // peek()
let a = stack.pop(); // stack is now [2, 5]
console.log(top);
console.log(a);
console.log(stack.toString());

let queue = [];
queue.push(2);         // queue is now [2]
queue.push(5);         // queue is now [2, 5]
queue.push(3);         // queue is now [2, 5, 3]
let b = queue.shift(); // queue is now [5, 3]

console.log(b)
console.log(queue.toString())