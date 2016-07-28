var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here

  newTree.children = [];  // fix me
  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  // your code here
  
  this.children.push (Tree(value));

};

treeMethods.contains = function(target) {
  var found = false;
  if ( this.value === target ) {
    found = true;
  }
  for (var i = 0; i < this.children.length; i++) {
    found = this.children[i].contains(target);
    if (found) {
      break;
    }
  }
  return found;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
