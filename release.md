# Testrapport

| Testcase | Vad som testas   |      Hur det testas      |  Förväntat resultat |
|:-:|----------|-------------|------|
| TC1. | Returnera kod som sträng |  Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer(’example-app/src/code-example.js’)" | Filen skrivs ut i konsolen som en sträng. |
|    |    | Skapa en variable genom ”let file = codeAnalyzer.fileToRead()”   |    |
|    |    | Skriv ut file i console genom ”console.log(file) |    |
| TC2. | Räkna antalet rader i filen ”example-app/src/code-example.js” | Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer(’example-app/src/code-example.js’)” | Det skrivs ut ”There are 598 lines.” i console. |
|    |    | Skapa en variabel genom ”const numberOfLines = codeAnalyzer.linesCounter(file)” |    |
|    |    | Skriv ut i console genom ”console.log('There are ' + numberOfLines + ' lines.’)” |    |
| TC3. | Räkna antalet for-loops. | Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer(’example-app/src/code-example.js’)” | Det skrivs ut ” There are 3 for-loops.” i console. |
|    |    | Skapa en variabel genom ”const numberOfForLoops = codeAnalyzer.forLoopsCounter(file)” |    |
|    |    | Skriv ut i console genom ”console.log('There are ' + numberOfForLoops + ' for-loops.’)” |    |
| TC4. | Räkna antalet inline-kommentarer. | Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer(’example-app/src/code-example.js’)” | Det skrivs ut ”There are 29 inline-comments.” i console. |
|    |    | Skapa en variabel genom ”  const numberOfInlineComments = codeAnalyzer.inlineCommentsCounter(file)” |    |
|    |    | Skriv ut i console genom ”console.log('There are ' + numberOfInlineComments + ' inline-comments.’)” |    |
| TC5. | Räkna antalet while-loops. | Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer(’example-app/src/code-example.js’)” | Det skriv ut ”There are 1 while-loops.” i console. |
|    |    | Skapa en variabel genom ”const numberOfWhileLoops = codeAnalyzer.whileLoopsCounter(file)” |    |
|    |    | Skriv ut i console genom ”console.log('There are ' + numberOfWhileLoops + ' while-loops.’)” |    |
| TC6. | Räkna antalet returns. | Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer(’example-app/src/code-example.js’)” | Det skrivs ut ”There are 7 returns.” i console. |
|    |    | Skapa en variabel genom ”const numberOfreturns = codeAnalyzer.returnsCounter(file)” |    |
|    |    | Skriv ut i console genom ”console.log('There are ' + numberOfreturns + ' returns.’)" |    |
| TC7. | Räkna antalet tecken. | Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer(’example-app/src/code-example.js’)” | Det skrivs ut ”There are 17019 characters.” i console. |
|    |    | Skapa en variabel genom ”const numberOfCharacters = codeAnalyzer.charactersCounter(file)” |    |
|    |    | Skriv ut i console genom ”console.log('There are ' + numberOfCharacters + ' characters.’)" |    |
| TC8. | Räkna antalet variabler. | Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer(’example-app/src/code-example.js’)” | Det skriv ut ”There are 30 variables.” i console. |
|    |    | Skapa en variabel genom "const numberOfVariables = codeAnalyzer.variablesCounter(file)” |    |
|    |    | Skriv ut i console genom ”console.log('There are ' + numberOfVariables + ' variables.’)" |    |
| TC9. | Räkna antalet JSDOC-kommentarer. | Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer(’example-app/src/code-example.js’)” | Det skriv ut ”There are 31 jsdoc-comments.” i console. |
|    |    | Skapa en variabel genom ”const numberOfJsdocComments = codeAnalyzer.jsdocCommentsCounter(file)” |    |
|    |    | Skriv ut i console genom ”console.log('There are ' + numberOfJsdocComments + ' jsdoc-comments.’)" |    |
| TC10. | Läsa filer i folder. | Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer()” | Filen skrivs ut som en sträng i console. |
|    |    | Skapa en variabel genom ”const folder = codeAnalyzer.folderToRead(’example-app/src/my-memory-game’)" |    |
|    |    | Läs folder genom ”codeAnalyzer = new CodeAnalyzer('example-app/src/my-memory-game/' + folder[0])” |    |
|    |    | Läs filen ”example-app/src/my-memory-game/index.js” genom ”let fileFromFolder = codeAnalyzer.fileToRead()” |    |
|    |    | Skriv ut i console genom ”console.log(fileFromFolder)” |    |
| TC11. | Läsa fil från Github. | Skapa ett objekt genom ”let codeAnalyzer = new CodeAnalyzer(’example-app/src/code-example.js’)” | Det skrivs ut ”There are 139 lines in the code from GitHub.” i console. |
|    |    | Skapa en variabel genom ”const fileGithub = await codeAnalyzer.readFileFromGithub('fredrikjurgell', '1dv610-l0', ’src/server.js’)" |    |
|    |    | Skriv ut i console genom ”console.log('There are ' + codeAnalyzer.linesCounter(fileGithub) + ' lines in the code from GitHub.') |    |