# Mall för inlämning laboration 1, 1dv610
Jag missade att man skulle följa den här mallen först, och har redan skapat en annan fil: **old-release.md**. Jag hoppas att den är okej med de tabeller som jag har i den och reflektionen.
​
## Checklista
  - [x] Jag har skrivit all kod och reflektioner själv. Jag har inte använt mig av andras kod för att lösa uppgiften.
  - [x] Mina testresultat är skrivna utifrån utförd testning ( och inte teoretiskt: "det bör fungera" :) )
  - [x] Koden är objektorienterad
  - [x] Jag har skrivit en modul som riktar sig till programmerare
​
## Egenskattning och mål
  - [ ] Jag är inte klar eftersom jag vet att jag saknar något. (Då skall du inte lämna in! Lämna då istället in på restlaboration.)
  - [x] Jag eftersträvar med denna inlämning godkänt betyg (E-D)
    - [x] De flesta testfall fungerar
    - [x] Koden är förberedd på Återanvändning
    - [x] All kod samt historik finns i git 
    - [x] Kodkvaliterskraven är ifyllda
    - [x] Reflektion är skriven utifrån bokens kapitel 
  - [ ] Jag eftersträvar med denna inlämning högre betyg (C-B) och anser mig uppfylla alla extra krav för detta. 
    - [ ] Samtliga testfall är skrivna    
    - [ ] Testfall är automatiserade
    - [ ] Det finns en tydlig beskrivning i hur modulen skall användas (i git)
    - [ ] Kodkvalitetskraven är varierade 
  - [ ] Jag eftersträvar med denna inlämning högsta betyg (A) 
​
Förtydligande: Examinator kommer sätta betyg oberoende på vad ni anser. 
​
## Återanvändning
Man lägger in katalogen i sitt projekt och importerar klassen.
Importera koden som nedan och gör följande:
```
import CodeAnalyzer from '../../src/code-analyzer.js'
let codeAnalyzer = new CodeAnalyzer('example-app/src/code-example.js')
let file = codeAnalyzer.fileToRead()

const numberOfLines = codeAnalyzer.linesCounter(file)
console.log('There are ' + numberOfLines + ' lines.')
```
​
## Beskrivning av min kod
Jag har en klass som heter CodeAnalyzer. De viktigaste metoderna skulle jag säga är fileToRead(). Den läser filen och returnerar en sträng. readFileFromGithub() läser en fil från Github och returnerar en sträng. linesCounter() räknar på antalet rader i koden från en läst fil.
​
## Hur jag testat
Jag har testat min kod genom att köra exempelapplikationen som jag har skapat och tittat på outputen i consolen för att jämföra med koden manuellt.
​