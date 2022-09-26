import CodeAnalyzer from '../../src/code-analyzer.js'

/**
 * The main function.
 */
const main = async function () {
  let codeAnalyzer = new CodeAnalyzer('example-app/src/code-example.js')
  let file = codeAnalyzer.fileToRead()

  const numberOfLines = codeAnalyzer.linesCounter(file)
  console.log('There are ' + numberOfLines + ' lines.')

  const numberOfForLoops = codeAnalyzer.forLoopsCounter(file)
  console.log('There are ' + numberOfForLoops + ' for-loops.')

  const numberOfInlineComments = codeAnalyzer.inlineCommentsCounter(file)
  console.log('There are ' + numberOfInlineComments + ' inline-comments.')

  const numberOfWhileLoops = codeAnalyzer.whileLoopsCounter(file)
  console.log('There are ' + numberOfWhileLoops + ' while-loops.')

  const numberOfreturns = codeAnalyzer.returnsCounter(file)
  console.log('There are ' + numberOfreturns + ' returns.')

  const numberOfCharacters = codeAnalyzer.charactersCounter(file)
  console.log('There are ' + numberOfCharacters + ' characters.')

  const numberOfVariables = codeAnalyzer.variablesCounter(file)
  console.log('There are ' + numberOfVariables + ' variables.')

  const numberOfJsdocComments = codeAnalyzer.jsdocCommentsCounter(file)
  console.log('There are ' + numberOfJsdocComments + ' jsdoc-comments.')

  const folder = codeAnalyzer.folderToRead('example-app/src/my-memory-game')
  codeAnalyzer = new CodeAnalyzer('example-app/src/my-memory-game/' + folder[0])
  let fileFromFolder = codeAnalyzer.fileToRead()

  const numberOfLinesFolder = codeAnalyzer.linesCounter(fileFromFolder)
  console.log('There are ' + numberOfLinesFolder + ' lines.')

  const fileGithub = await codeAnalyzer.readFileFromGithub('fredrikjurgell', '1dv610-l0', 'src/server.js')
  console.log('There are ' + codeAnalyzer.linesCounter(fileGithub) + ' lines in the code from GitHub.')
}

main()
