function enqueue(arr, ele) {
  arr.push(ele);
  console.log("Added " + ele + " to the queue");
  console.log("Queue: " + arr);
  return arr;
}

function dequeue(arr) {
  let val = arr.shift();
  console.log("Removed " + val + " from the queue");
  console.log("Queue: " + arr);
  return arr;
}

module.exports = {
  enqueue,
  dequeue,
};
