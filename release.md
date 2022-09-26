# Testrapport

| Testcase | Vad som testas | Hur det testas |  Förväntat resultat |
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


# Namngivning
| Namn och förklaring | Reflektioner och regler från Clean Code|
|----|----|
| CodeAnalyzer | Intention-revealing name |
| Klassnamnet i modulen. | Namnet är tydligt, talar om vad klassen gör. |
|    | Avoid Disinformation |
|    | Möjligen att namnet är lite för ”brett”, det talar inte om exakt hur koden analyseras. Men det hade varit svårt att göra namnet för specifikt också, eftersom att det är flera olika saker som analyseras. |
|    |    |
| fileToRead(fileName) | Method Names |
| Returnerar kod från fil som en sträng. | Metodnamnet är ett verb. Skulle eventuellt beskriva vad man får tillbaka. Nu förstår man bara vad man ska använda den till, dvs vilken fil man vill ska läsas. |
|    |    |
| variablesCounter() | Use Searchable Names |
| Returnerar en sifra på hur många variabler som finns i koden. | Funktionsnamnet är enkelt att söka upp då det består utav hela ord, istället för t.ex. varCounter. Då hade det varit svårare att veta vad det är man ska söka efter. Nu är det enkelt att söka efter ”variables” exempelvis. |
|    |    |
| forLoopsCounter() | Use Pronounceable Names |
| Returnerar en sifra på hur många for-loops som finns i koden. | Det är ett namn på metoden som är enkelt att uttala. Då är det enklare att prata om metoden med någon annan utvecklare. |
|    |    |
| readFileFromGithub(owner, repo, path) | Pick One Word per Concept |
| Returnerar kod från Github som en sträng. | Jag använder mig konsekvent utav ”read” för att läsa filer i mina metodnamn, istället för att blanda med ord som ”fetch” eller ”get”. Tex fetchFileFromGithub(). |

### Kortare reflektion
Jag har en variabel som heter returnsArray. returnsArray är egentligen inget bra variabelnamn då det bryter mot regeln ”Make Meaningful Distinctions”. Array borde inte finnas med i namnet då det bara är noise. Det borde kanske istället heta bara returns. Men jag tycker inte att det hade varit något speciellt bra namn heller. Har även fler variabler som har array i namnet. Speciellt en som heter ”newArray” som förstås borde heta något annat.


# Funktioner
| Metodnamn och länk eller kod | Antal rader ( ej ws ) | Reflektion |
|----|:--:|----|
| variablesCounter | 23 | Do One Thing |
|    |    | Gör betydlig fler saker än bara en. Den matchar olika variabler, har tre olika if-satser och adderar även antalet olika variabler. |
|    |    |    |
| folderToRead | 12 | Function Arguments |
|    |    | Metoden har bara ett argument. Den är enkel att förstå. Man skickar med ett namn på en map som en sträng på den mappen man vill läsa. |
|    |    |    |
| jsdocCommentsCounter | 13 | Use Descriptive Names |
|    |    | Är ett tydligt namn där man direkt förstår vad den gör. Dvs räknar antallet jsdoc-kommentarer. |
|    |    |    |
| forLoopsCounter | 13 | Have No Side Effects |
|    |    | Den här metoden har inga sidoeffekter. Den ändrar inte på någon data. Utan den returnerar bara det man förväntar sig, dvs antalet for-loops. |
|    |    |    |
| inlineCommentsCounter | 13 | Don’t Repeat Yourself |
|    |    | Det är ingen upprepning i själva metoden, däremot så har jag andra metoder som gör liknande saker, och där blir det en hel del upprepning. Jag borde istället haft en metod som räknar på indata från en parameter. |

# Reflektion

De metoder jag har skrivit har varit för långa om man ska följa boken, de gör även för många olika saker. Vissa metoder matchar igenom strängar, har flera olika if-satser och adderar olika variabler. Allt detta hade kunnat bryta ut till egna metoder som gör en enskild sak.

Det blir också en hel del repetering utav kod. Jag tycker inte att det är repeterande kod inuti de olika metoderna, men däremot är det några metoder som är liknande varandra, där man hade kunnat bryta ut det till en egen metod för att sedan använda den inuti de andra metoderna. Då hade man både sluppit att repetera kod, metoderna hade gjort färre saker och blivit kortare.

Jag tycker att mina metodnamn har en bra namngivning. Det är inga ”roliga” namn, utan de är tydliga med vad de gör och det är enkelt att söka efter namnen då det är hela ord och inga förkortningar utav ord. De är enkla att att läsa, vilket gör det enklare att prata om dem med andra programmerare. T.ex. att den läser en fil eller map, att den räknar antalet for-loopar.

Många utav mina variabler hade kunnat ha bättre namn i sig är något som jag har märkt under tiden. Några har alldeles för mycket ”noise”, dvs att det står i variabelnamnet att det är en array etc. Det behöver inte stå i namnet på variabeln att det är en array.