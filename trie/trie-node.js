
/**
 * Represents a Node in a Trie.
 * @param {*} ch a charadcter
 */
function TrieNode(ch) {
    this.value = ch;
    this.children = new Map();
    this.leaf = false;
}

TrieNode.prototype.getChildren = function() {
    return this.children;
}

TrieNode.prototype.getValue = function() {
    return this.value;
}

TrieNode.prototype.setIsLeaf = function(val) {
    this.leaf = val;
}

TrieNode.prototype.isLeaf = function() {
    return this.leaf;
}

module.exports = TrieNode;
