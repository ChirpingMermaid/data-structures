var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;

  newTree.children = [];  
  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var newChild = Tree(value);
  newChild.parent = this;
  this.children.push(newChild);
};

treeMethods.contains = function(target) {
  var found = false;
  if ( this.value === target ) {
    return true;
  }

  for (var i = 0; i < this.children.length; i++) {
    found = this.children[i].contains(target);
    if (found) {
      break;
    }
  }
  return found;
};
treeMethods.removeFromParent = function() {
  if (this.parent !== null) {
    for (var i = 0; i < this.parent.children.length; i++) {
      if ( this === this.parent.children[i] ) {
        this.parent.children.splice(i, 1);
      }
    }
  }
  this.parent = null;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
