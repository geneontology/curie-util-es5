var TrieNode = require('./trie-node');

/** 
* Data structure specific for characters, to efficiently resolve IRI prefixes to CURIEs prefixes.
*/
function Trie() {
    this.root = new TrieNode(String.fromCharCode(0));
}

/**
 * 
 * @param {*} word to insert into the Trie
 */
Trie.prototype.insert = function (word) {
    //    console.log("insert(" + word + ")");

    // Find length of the given word
    var length = word.length;
    var crawl = this.root;

    // Traverse through all characters of given word
    for (var level = 0; level < length; level++) {
        var child = crawl.getChildren();
        var ch = word.charAt(level);

        //        console.log("level(" + level + " / " + length + ") - char(" + ch + ") with children: " + child);

        // If there is already a child for current character of given word
        if (child.has(ch)) {
            crawl = child.get(ch);
            // Else create a child
        } else {
            var temp = new TrieNode(ch);
            child.set(ch, temp);
            crawl = temp;
        }
    }

    // Set isLeaf true for last character
    crawl.setIsLeaf(true);
}

Trie.prototype.getMatchingPrefix = function (input) {
    // Initialize resultant string
    var result = "";

    // Find length of the input string
    var length = input.length;

    // Initialize reference to traverse through Trie
    var crawl = this.root;

    var level;
    var prevMatch = 0;
    // Iterate through all characters of input string 'str' and traverse
    // down the Trie
    for (var level = 0; level < length; level++) {
        // Find current character of str
        var ch = input.charAt(level);

        var child = crawl.getChildren();

        if (child.has(ch)) {
            result += ch;
            crawl = child.get(ch);

            if (crawl.isLeaf()) {
                prevMatch = level + 1;
            }
        } else {
            break;
        }
    }

    if (!crawl.isLeaf()) {
        return result.substring(0, prevMatch);
    } else {
        return result;
    }
}

module.exports = Trie;
