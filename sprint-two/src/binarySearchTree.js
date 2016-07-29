var BinarySearchTree = function(value) {
  var bst = Object.create(bstPrototype);
  bst.value = value;
  bst.left = null;
  bst.right = null;
  return bst;
};

var bstPrototype = {};

bstPrototype.insert = function (newVal) {
  if ( newVal < this.value ) {
    if( this.left === null ) {
      this.left = BinarySearchTree(newVal);
    } else {
      this.left.insert(newVal);
    }
  } else if ( newVal > this.value ) {
    if ( this.right === null ) {
      this.right = BinarySearchTree(newVal);
    } else {
      this.right.insert(newVal);
      }
  }
};

bstPrototype.contains = function (value) {
  if ( this.value === value ) {
    return true;
  } else if ( this.left !== null && value < this.value ) {
    return this.left.contains(value);
  } else if ( this.right !== null && value > this.value ) {
    return this.right.contains(value);
  }
  
  return false;
};

bstPrototype.depthFirstLog = function (callback) {
  callback(this.value);
  if( this.left !== null ) {
    this.left.depthFirstLog(callback);
  }
  if( this.right !== null ) {
    this.right.depthFirstLog(callback);
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
