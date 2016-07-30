var DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
};

DoublyLinkedList.prototype.addToHead = function (value) {
  newHead = Node(value);
  if (!this.tail) {
    this.tail = newHead;
  } else {
    newHead.next = this.head;
    this.head.previous = newHead;
  }
  this.head = newHead;

};

DoublyLinkedList.prototype.addToTail = function(value) {
  var newTail = Node(value);
  if (!this.head) {
    this.head = newTail;
  } else {
    newTail.previous = this.tail;
    this.tail.next = newTail;
  }
  this.tail = newTail;
};

DoublyLinkedList.prototype.removeHead = function() {
  var value = this.head.value;
  this.head = this.head.next;
  return value;
};

DoublyLinkedList.prototype.removeTail = function () {
  var value = this.tail.value;
  this.tail = this.tail.previous;
  return value;
};

DoublyLinkedList.prototype.contains = function(target) {
  var current = this.head;
  var found = false;

  do {
    if (current.value === target) {
      found = true;
    }
    current = current.next;
  } while (current);   
  return found;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};