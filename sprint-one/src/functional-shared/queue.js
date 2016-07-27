var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var newQueue = {};
  newQueue.storage = {};
  newQueue.start = 0;
  newQueue.end = 0;

  _.extend(newQueue, queueMethods);
  return newQueue;
};

var queueMethods = {};

queueMethods.enqueue = function(value) { 
  this.storage[this.end] = value;
  this.end++;
};

queueMethods.dequeue = function() { 
  dequeueValue = this.storage[this.start];
  delete this.storage[this.start];
  this.start++;
  return dequeueValue;
};

queueMethods.size = function() { 
  return Object.keys(this.storage).length;
};
