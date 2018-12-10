# curie-util-js
Javascript Library to translate CURIEs to IRIs and vice versa. 
ES5 Version based on the Java Implementation: https://github.com/prefixcommons/curie-util

## Install
```
npm install --save @geneontology/curie-util-es5
```

Use `require` or `import` to use the package in your JavaScript code

## Usage
Retrieve a JSON-LD file such as: https://github.com/prefixcommons/biocontext/blob/master/registry/go_context.jsonld

```
var map = parseContext(json);
var curie = new CurieUtil(map);
```

### Get IRI
```
curie.getIri("ZFIN:ZDB-GENE-031112-7");
curie.getIri("MGI:MGI:34340");
```

### Get CURIE
```
curie.getCurie("http://identifiers.org/zfin/ZDB-GENE-031112-7");
curie.getCurie("http://identifiers.org/mgi/MGI:34340");
```

## Notes
* Learn about [JSON-LD](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&uact=8&ved=2ahUKEwjOtNqao7ncAhX3IjQIHXhIAOcQFjADegQIAxAB&url=https%3A%2F%2Fjson-ld.org%2F&usg=AOvVaw0KYV5lDp9ZQ0M18tp93C6E)
* Learn about [IRI](https://www.w3.org/International/iri-edit/draft-duerst-iri.html)
* Learn about [CURIE](https://www.w3.org/TR/2010/NOTE-curie-20101216/)

