import * as fs from 'fs'

/**
 * Analyzes your code.
 */
export default class CodeAnalyzer {
  /**
   * Returns the read code as a string.
   *
   * @param {string} fileName - The name of the file.
   * @returns {string} - The code as a string..
   */
  fileToRead (fileName) {
    const readFile = fs.readFileSync(`src/${fileName}`, 'utf-8')

    return readFile
  }

  /**
   * Counts the number of lines.
   *
   * @param {string} data - The code.
   * @returns {number} - The number of lines.
   */
  linesCounter (data) {
    let numberofLines = 1

    for (let i = 0; i < data.length; i++) {
      if (data[i] === '\n') { // if new line.
        numberofLines++
      }
    }

    return numberofLines
  }

  /**
   * Counts the number of for loops.
   *
   * @param {string} data - The code.
   * @returns {number} - The number of for loops.
   */
  forLoopsCounter (data) {
    let numberOfForLoops = 0
    const forLoopsArray = data.match(/for \(/g) // match "for (".
    for (let i = 0; i < forLoopsArray.length; i++) {
      numberOfForLoops++
    }

    return numberOfForLoops
  }

  /**
   * Counts the number of inline comments.
   *
   * @param {string} data - The code.
   * @returns {number} - The number of comments.
   */
  inlineCommentsCounter (data) {
    let numberOfComments = 0
    const commentsArray = data.match(/\/\/ /g) // match "// ".

    for (let i = 0; i < commentsArray.length; i++) {
      numberOfComments++
    }

    return numberOfComments
  }

  /**
   * Counts the number of while loops.
   *
   * @param {string} data - The code.
   * @returns {number} - The number of while loops.
   */
  whileLoopsCounter (data) {
    let numberOfWhileLoops = 0
    const whileLoopsArray = data.match(/while \(/g) // match "while (".
    for (let i = 0; i < whileLoopsArray.length; i++) {
      numberOfWhileLoops++
    }

    return numberOfWhileLoops
  }
}
