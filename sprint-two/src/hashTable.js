

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._filled = 0;
};


HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var buckets = this._storage.get(index);
  if ( !buckets ) {
    buckets = [[k, v]];
    this._storage.set(index, buckets);
  } else {
    var found = false;
    for (var i = 0; i < buckets.length; i++) {
      if (k === buckets[i][0]) {
        found = true;
        buckets[i][1] = v;
      }
    }
    if (found === false) {
      this._storage.get(index).push([k, v]);
    }
  }


  
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var buckets = this._storage.get(index);

  for (var i = 0; i < buckets.length; i++) {
    if (k === buckets[i][0]) {
      return buckets[i][1];
    }
  }
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  this._filled--;
  var buckets = this._storage.get(index);
  for (var i = 0; i < buckets.length; i++) {
    if ( k === buckets[i][0]) {
      buckets.splice(i, 1);
    }
  }

};

/*
 * Complexity: What is the time complexity of the above functions?
 */


