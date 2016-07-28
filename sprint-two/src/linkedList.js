var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var newTail = Node(value);
    if ( !list.head ) {
      list.head = newTail;
    } else {
      list.tail.next = newTail;
    }
    list.tail = newTail;
  };

  list.removeHead = function() {
    var value = list.head.value;
    list.head = list.head.next;
    return value;

  };

  list.contains = function(target) {
    var current = list.head;
    var found = false;

    do {
      if (current.value === target) {
        found = true;
      }
      current = current.next;

    } while (current);   


    return found;

  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
