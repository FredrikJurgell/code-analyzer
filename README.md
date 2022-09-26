# CODE ANALYZER
The Code Analyzer is used to give you information about whats in your code. Such as number of for-loops, number of characters, number of lines and so on.

## Example
```
let codeAnalyzer = new CodeAnalyzer('example-app/src/code-example.js')
let file = codeAnalyzer.fileToRead()

const numberOfLines = codeAnalyzer.linesCounter(file)
console.log('There are ' + numberOfLines + ' lines.')
```

## Methods

```fileToRead()``` - Returns the read code from the file as a string.

```folderToRead(folderName)``` - Returns the read folders files as a array.

```readFileFromGithub(owner, repo, path)``` - Returns the read code from a file from a github-repository as a string.

```linesCounter(data)``` - Counts the number of lines.

```forLoopsCounterdata(data)``` - Counts the number of for loops.

```inlineCommentsCounter(data)``` - Counts the number of inline comments.

```whileLoopsCounter(data)``` - Counts the number of while loops.

```returnsCounter(data)``` - Counts the number of returns.

```charactersCounter(data)``` - Returns the number of characters in the code.

```variablesCounter(data)``` - Returns the number of variables in the code.

```jsdocCommentsCounter(data)``` - Returns the number of jsdoc-comments in the code.