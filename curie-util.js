
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
//             Utility Class to convert CURIE <-> IRI
//
//=======================================================================

/**
 * 
 * @param {*} mapping A Bidirectional Map of CURIE <-> IRI created through parseContext(context.jsonld)
 */
function CurieUtil(mapping) {
    this.trie = new Trie();
    this.curieMap = mapping;

    for(var val of mapping.values()) {
        this.trie.insert(val);
    }
}

CurieUtil.prototype.getPrefixes = function() {
    return this.curieMap.keys();
}

CurieUtil.prototype.getExpansion = function(curiePrefix) {
    return this.curieMap.get(curiePrefix);
}

/**
 * Return the CURIE associated to the given IRI if any exists. Return null otherwise
 * @param {*} iri The IRI of an entity (e.g. http://identifiers.org/zfin/ZDB-GENE-031112-7, http://identifiers.org/mgi/MGI:34340)
 */
CurieUtil.prototype.getCurie = function(iri) {
    var prefix = this.trie.getMatchingPrefix(iri);
    if(!prefix || prefix == "") {
        return null;
    } else {
        var curiePrefix = this.curieMap.getInverse(prefix);
        return curiePrefix + ":" + iri.substring(prefix.length, iri.length);
    }
}

/**
 * Return the IRI associated to the given CURIE if any exists. Return null otherwise
 * @param {*} curie The CURIE of an entity (e.g. ZFIN:ZDB-GENE-031112-7, MGI:MGI:34340)
 */
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


/**
 * Returns a BiDirectional Map of the @context of a JSON-LD file
 * @param {} jsonObject A JSON-LD file with a @context field
 */
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


module.exports.parseContext = parseContext;
module.exports.CurieUtil = CurieUtil;