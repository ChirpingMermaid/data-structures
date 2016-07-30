

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._tuples = 0;
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var buckets = this._storage.get(index);
  if (!buckets) {
    buckets = [[k, v]];
    this._storage.set(index, buckets);
    this._tuples++;
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
      this._tuples++;
    }
  }
  this._storage.each(function(key, value, collection) {
    console.log('length', collection.length);
    console.log('index', key[0]);
    console.log('value', value);
  });

  // if (this._tuples / this._limit > 0.75) {
  //   this._limit *= 2;
  //   var newStorage = LimitedArray(this._limit);
  //   for ( var i = 0; i < this._limit / 2; i++) {
  //     var current = this._storage.get(i);
  //     if (current) {
  //       for ( var j = 0; j < current.length; j++) {
  //         var key = current[j][0];
  //         var value = current[j][1];
  //         var newIndex = getIndexBelowMaxForKey(key, this._limit);
  //         var newCurrent = newStorage.get(newIndex);
  //         if (!newCurrent) {
  //           newCurrent = [[key, value]];
  //           newStorage.set(newIndex, newCurrent);
  //         } else {
  //           var newfound = false;
  //           for (var x = 0; x < newCurrent.length; x++) {
  //             if ( key === newCurrent[x][0] ) {
  //               newfound = true;
  //               newCurrent[x][1] = value;
  //             }
  //           }
  //           if ( newfound === false ) {
  //             newStorage.get(newIndex).push([key, value]);
  //           } 
  //         }

  //       }

  //     }
  //   }
  //   this._storage = newStorage;
  // }  
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
  var buckets = this._storage.get(index);
  for (var i = 0; i < buckets.length; i++) {
    if ( k === buckets[i][0]) {
      buckets.splice(i, 1);
      this._tuples--;
    }
  }

};

/*
 * Complexity: What is the time complexity of the above functions?
 */


