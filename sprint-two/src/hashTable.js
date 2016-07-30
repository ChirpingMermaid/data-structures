

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._tuples = 0;
};

function helpInsert(storage, buckets, index, key, value) {
  var tupleAdded = 1; //flag to check if new tuple is added
  if (!buckets) { //if no buckets
    buckets = [[key, value]]; //initialize buckets with a tuple array
    storage.set(index, buckets); //use set to store buckets into hash table at uniqe index
  } else { //if bucket already exists
    for (var i = 0; i < buckets.length; i++) { //look at each bucket
      if (buckets[i][0] === key) { //check if tuple's first element matches our key
        buckets[i][1] = value; //update that tuple's value 
        tupleAdded = 0; //key's value is overwritten so tupleAddes is false
      }
    }
    if (tupleAdded === 1) { //current key is not found in our buckets array
      storage.get(index).push([key, value]); //push a new key/value tuple into buckets.
    }
  }
  return tupleAdded; //returns 1 if a new tuple is added
}

HashTable.prototype.insert = function(k, v) {

  var index = getIndexBelowMaxForKey(k, this._limit);
  var buckets = this._storage.get(index); //buckets at the current index in hash table
  this._tuples += helpInsert(this._storage, buckets, index, k, v);
  var ratio = this._tuples / this._limit; //ratio of tuple count to storage array length

  if (ratio > 0.75) { //if ratio is larger than 75%, 
    this._limit *= 2; //double size of storage array
    var newStorage = LimitedArray(this._limit);
    for (var i = 0; i < this._limit / 2; i++) {
      var currentBuckets = this._storage.get(i);
      if (currentBuckets) {
        for ( var j = 0; j < currentBuckets.length; j++) {
          var key = currentBuckets[j][0];
          var value = currentBuckets[j][1];
          var newIndex = getIndexBelowMaxForKey(key, this._limit);
          var newBuckets = newStorage.get(newIndex);
          helpInsert(newStorage, newBuckets, newIndex, key, value);
        }
      }
    }
    this._storage = newStorage;
  }  
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var buckets = this._storage.get(index);
  if (buckets) {
    for (var i = 0; i < buckets.length; i++) {
      if (k === buckets[i][0]) {
        return buckets[i][1];
      }
    }
  }
    
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var buckets = this._storage.get(index);
  for (var i = 0; i < buckets.length; i++) {
    if ( k === buckets[i][0]) {
      buckets.splice(i, 1);
      //this._storage.set(index, buckets);
      this._tuples--;
    }
  }
  
  var ratio = this._tuples / this._limit; //ratio of tuple count to storage array length
  if (ratio < 0.25 ) { //if ratio is less than 25%,
    console.log(this._limit); 
    this._limit /= 2; //cut storage array size in half
    var newStorage = LimitedArray(this._limit);
    for (var i = 0; i < this._limit * 2; i++) {
      var currentBuckets = this._storage.get(i);
      if (currentBuckets) {
        for ( var j = 0; j < currentBuckets.length; j++) {
          var key = currentBuckets[j][0];
          var value = currentBuckets[j][1];
          var newIndex = getIndexBelowMaxForKey(key, this._limit);
          var newBuckets = newStorage.get(newIndex);
          helpInsert(newStorage, newBuckets, newIndex, key, value);
        }
      }
    }
    this._storage = newStorage;
  } 
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


