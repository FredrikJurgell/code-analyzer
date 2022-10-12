import CodeAnalyzer from '../../src/code-analyzer.js'

/**
 * The main function.
 */
const main = async function () {
  let codeAnalyzer = new CodeAnalyzer('example-app/src/code-example.js')
  let file = codeAnalyzer.readFile()

  const numberOfLines = codeAnalyzer.countLines(file)
  console.log('There are ' + numberOfLines + ' lines.')

  const numberOfForLoops = codeAnalyzer.countForLoops(file)
  console.log('There are ' + numberOfForLoops + ' for-loops.')

  const numberOfInlineComments = codeAnalyzer.countInlineComments(file)
  console.log('There are ' + numberOfInlineComments + ' inline-comments.')

  const numberOfWhileLoops = codeAnalyzer.countWhileLoops(file)
  console.log('There are ' + numberOfWhileLoops + ' while-loops.')

  const numberOfreturns = codeAnalyzer.countReturns(file)
  console.log('There are ' + numberOfreturns + ' returns.')

  const numberOfCharacters = codeAnalyzer.countCharacters(file)
  console.log('There are ' + numberOfCharacters + ' characters.')

  const numberOfVariables = codeAnalyzer.countVariables(file)
  console.log('There are ' + numberOfVariables + ' variables.')

  const numberOfJsdocComments = codeAnalyzer.countJsdocComments(file)
  console.log('There are ' + numberOfJsdocComments + ' jsdoc-comments.')

  const folder = codeAnalyzer.readFolder('example-app/src/my-memory-game')
  codeAnalyzer = new CodeAnalyzer('example-app/src/my-memory-game/' + folder[0])
  let fileFromFolder = codeAnalyzer.readFile()

  const numberOfLinesFolder = codeAnalyzer.countLines(fileFromFolder)
  console.log('There are ' + numberOfLinesFolder + ' lines.')

  const fileGithub = await codeAnalyzer.readFileFromGithub('fredrikjurgell', '1dv610-l0', 'src/server.js')
  console.log('There are ' + codeAnalyzer.countLines(fileGithub) + ' lines in the code from GitHub.')
}

main()
