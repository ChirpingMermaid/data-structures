

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._filled = 0;
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if ( !this._storage.get(index) ) {
    this._storage.set(index, {});
  }
  this._storage.get(index)[k] = v;
  this._filled++;
  
  if (this._filled > this._limit/2) {
    objAll = {};
    for( var i = 0; i < this._limit; i++ ) {
      _.extend(objAll, this._storage.get(i) );
    }
    this._limit *= 2;
    this._storage = LimitedArray(this._limit);
    for( key in objAll ) {
      var newIndex = getIndexBelowMaxForKey(key, this._limit);
      if ( !this._storage.get(newIndex) ) {
        this._storage.set(newIndex, {});
      }
      this._storage.get(newIndex)[key] = objAll[key];
    }
  }
  
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  return this._storage.get(index)[k];
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  this._filled--;
  delete this._storage.get(index)[k];
  
  if (this._limit > 8 && this._filled < this._limit/2) {
    objAll = {};
    for( var i = 0; i < this._limit; i++ ) {
      _.extend(objAll, this._storage.get(i) );
    }
    this._limit /= 2;
    this._storage = LimitedArray(this._limit);
    for( key in objAll ) {
      var newIndex = getIndexBelowMaxForKey(key, this._limit);
      if ( !this._storage.get(newIndex) ) {
        this._storage.set(newIndex, {});
      }
      this._storage.get(newIndex)[key] = objAll[key];
    }
    

  }

};

/*
 * Complexity: What is the time complexity of the above functions?
 */


