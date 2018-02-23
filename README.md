# Code Search
[![NSP Status](https://nodesecurity.io/orgs/perera-io/projects/72d6f381-993c-469e-b77c-e8858eb774c2/badge)](https://nodesecurity.io/orgs/perera-io/projects/72d6f381-993c-469e-b77c-e8858eb774c2)

Searches and retrieves matching code snippets from GitHub

## Installation

  `npm install codesearch --save`

#### Get a Token
Sign up on [GitHub](https://github.com) and generate a personal access token from the [Developer Settings](https://github.com/settings/developers) page

## Functions

* `.token('TOKEN')` - pass your personal access token as an argument
* `.search('TERM', 'LANGUAGE', callback)` - returns a JSON with the results of the search via a callback
    * `TERM`: the term/word/function to search (ex: _math.pow_, _addUser_, _setCookie_ etc.)
    * `LANGUAGE`: the programming language to search in (ex: _javascript_, _php_, _ruby_ etc.)

## Usage

```javascript
const codeSearch = require('codesearch');

codeSearch.token('TOKEN');

codeSearch.search('math.pow', 'javascript', function (result) {
    // Use the result
});

```

#### JSON Structure
The following is the structure of the resulting JSON file
```javascript
{ 
  searchTerm: 'The search term used',
  searchLanguage: 'The search language used',
  generatedBy: 'The module name',
  generatedOn: 'The date in ISO format',
  searchResults: [ 
     { 
       similarityScore: 'The similarity of the result to the search term',
       codeAuthor: 'The author of the result',
       codeSnippet: 'The stringified version of the raw code snippet'
     }
  ] 
}
```

#### Example Result
The value of the `codeSnippet` key can be parsed into normal text (without escape characters and other characters like `\n` and `\t`) by using `JSON.parse()`
```javascript
{ 
  searchTerm: 'setcookie',
  searchLanguage: 'php',
  generatedBy: 'codesearch',
  generatedOn: '2018-02-22T02:12:38.813Z',
  searchResults: [ 
     { 
       similarityScore: 5.360942,
       codeAuthor: 'ManWangIT',
       codeSnippet: 'setCookie();' 
     },
     { 
       similarityScore: 5.315576,
       codeAuthor: 'eric1234',
       codeSnippet: '<?php\n  setcookie(\'cookie1\');\n  setcookie(\'cookie2\');\n?>\n' 
     },
     { 
       similarityScore: 5.0985513,
       codeAuthor: 'hugoribeiroab',
       codeSnippet: '<?php\r\n\t\t\t\tsetcookie("id");\r\n\t\t\t\tsetcookie("nome");\r\n\t\t\t\tsetcookie("sobrenome");\r\n\t\t\t\tsetcookie("ag");\r\n\t\t\t\tsetcookie("conta");\r\n\t\t\t\tsetcookie("ativo");\r\n\t\t\t\tsetcookie("agenciamoeda");\r\n\t\t\t\tsetcookie("agencianome");\r\n\t\t\t\theader("location: ./");\r\n?>' 
     }
  ] 
}
```

## Tests
Pass in your personal access token to run the tests

`npm test TOKEN`
