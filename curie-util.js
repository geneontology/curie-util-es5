
var Trie = require("./trie/trie");






//=======================================================================
//
//             Simple Implementation of a Bidirectional Map
//
//=======================================================================
function BiMap() {
    this.mapDirect = new Map();
    this.mapInverse = new Map();
}

BiMap.prototype.set = function(key, value) {
    this.mapDirect.set(key, value);
    this.mapInverse.set(value, key);
}

BiMap.prototype.get = function(key) {
    return this.mapDirect.get(key);
}

BiMap.prototype.getInverse = function(value) {
    return this.mapInverse.get(value);
} 

BiMap.prototype.has = function(key) {
    return this.mapDirect.has(key);
}

BiMap.prototype.keys = function() {
    return this.mapDirect.keys();
}

BiMap.prototype.values = function() {
    return this.mapDirect.values();
}


//=======================================================================
//
//             Utility function to convert CURIE <-> IRI
//
//=======================================================================
function CurieUtil(mapping) {
    this.trie = new Trie();
    this.curieMap = mapping;

    for(val of mapping.values()) {
        this.trie.insert(val);
    }
}

CurieUtil.prototype.getPrefixes = function() {
    return this.curieMap.keys();
}

CurieUtil.prototype.getExpansion = function(curiePrefix) {
    return this.curieMap.get(curiePrefix);
}

CurieUtil.prototype.getCurie = function(iri) {
    var prefix = this.trie.getMatchingPrefix(iri);
    if(!prefix || prefix == "") {
        return null;
    } else {
        var curiePrefix = this.curieMap.getInverse(prefix);
        return curiePrefix + ":" + iri.substring(prefix.length, iri.length);
    }
}

CurieUtil.prototype.getIri = function(curie) {
    if(!curie)
      return null;
    var split = curie.split(":");
    if(split.length == 0)
      return null;
    
    var prefix = split[0];
    if(this.curieMap.has(prefix)) {
        return this.curieMap.get(prefix) + curie.substring(curie.indexOf(":") + 1);
    }
    return null;
}

CurieUtil.prototype.getCurieMap = function() {
    return this.curieMap;
}


function parseContext(jsonObject) {
    try {
        var jsonContext = jsonObject["@context"];
        var map = new BiMap();
        Object.keys(jsonContext).forEach(elt => {
            map.set(elt, jsonContext[elt]);
        })        
        return map;
    } catch(err) {
        return null;
    }
}



