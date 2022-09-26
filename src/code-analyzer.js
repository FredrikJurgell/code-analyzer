import * as fs from 'fs'
import fetch from 'node-fetch'

/**
 * Analyzes your code.
 */
export default class CodeAnalyzer {
  constructor (fileName) {
    this.fileName = fileName
  }

  /**
   * Returns the read code from the file as a string.
   *
   * @param {string} this.fileName - The name of the file.
   * @returns {string} - The code as a string.
   */
  fileToRead () {
    try {
      const readFile = fs.readFileSync(this.fileName, 'utf-8')

      return readFile
    } catch (error) {
      return 'Invalid file-name.'
    }
  }

  /**
   * Returns the read folders files as a array.
   *
   * @param {string} folderName - The name of the file.
   * @returns {Array} - The code as a array.
   */
  folderToRead (folderName) {
    try {
      const readFolder = fs.readdirSync(folderName, 'utf-8')
      const newArray = []

      for (let i = 0; i < readFolder.length; i++) {
        if (readFolder[i].match(/.js/g)) {
          newArray.push(readFolder[i])
        }
      }

      return newArray
    } catch (error) {
      return 'Invalid folder-name.'
    }
  }

  /**
   * Returns the read code from a file from a github-repository as a string.
   *
   * @param {string} owner - The account owner of the repository. The name is not case sensitive.
   * @param {string} repo - The name of the repository. The name is not case sensitive.
   * @param {string} path - The path.
   * @returns {string} - The code as a string.
   */
  async readFileFromGithub (owner, repo, path) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`

    const response = await fetch(url, {
      method: 'GET'
    })

    const resonseJson = await response.json()
    const buff = Buffer.from(resonseJson.content, 'base64')

    const str = buff.toString('utf-8')

    return str
  }

  /**
   * Counts the number of lines.
   *
   * @param {string} data - The code.
   * @returns {number} - The number of lines.
   */
  linesCounter (data) {
    let numberofLines = 0

    if (data === undefined) {
      return 0
    }

    if (!data.length) {
      return 0
    }

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

    if (data === undefined) {
      return 0
    }

    const forLoopsArray = data.match(/[^a-zA-Z]for \(/g) || [] // match "for (".

    if (forLoopsArray.length === 0) {
      return 0
    } else {
      for (let i = 0; i < forLoopsArray.length; i++) {
        numberOfForLoops++
      }
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

    if (data === undefined) {
      return 0
    }

    const commentsArray = data.match(/[^a-zA-Z]\/\/ /g) || [] // match "// ".

    if (commentsArray.length === 0) {
      return 0
    } else {
      for (let i = 0; i < commentsArray.length; i++) {
        numberOfComments++
      }
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

    if (data === undefined) {
      return 0
    }

    const whileLoopsArray = data.match(/[^a-zA-Z]while \(/g) || [] // match "while (".

    if (whileLoopsArray.length === 0) {
      return 0
    } else {
      for (let i = 0; i < whileLoopsArray.length; i++) {
        numberOfWhileLoops++
      }
    }

    return numberOfWhileLoops
  }

  /**
   * Counts the number of returns.
   *
   * @param {string} data - The code.
   * @returns {number} - The number of returns.
   */
  returnsCounter (data) {
    let numberOfReturns = 0

    if (data === undefined) {
      return 0
    }

    const returnsArray = data.match(/[^a-zA-Z]return /g) || [] // match "return ".

    if (returnsArray.length === 0) {
      return 0
    } else {
      for (let i = 0; i < returnsArray.length; i++) {
        numberOfReturns++
      }
    }

    return numberOfReturns
  }

  /**
   * Returns the number of characters in the code.
   *
   * @param {string} data - The code.
   * @returns {number} - The number of characters.
   */
  charactersCounter (data) {
    if (data === undefined) {
      return 0
    }

    return data.length
  }

  /**
   * Returns the number of variables in the code.
   *
   * @param {string} data - The code.
   * @returns {number} - The number of variables.
   */
  variablesCounter (data) {
    if (data === undefined) {
      return 0
    }

    let varVariables = data.match(/[^a-zA-Z]var /g) // match "var ".
    let letVariables = data.match(/[^a-zA-Z]let /g) // match "let ".
    let constVariables = data.match(/[^a-zA-Z]const /g) // match "const ".

    if (varVariables === null) {
      varVariables = 0
    } else {
      varVariables = varVariables.length
    }

    if (letVariables === null) {
      letVariables = 0
    } else {
      letVariables = letVariables.length
    }

    if (constVariables === null) {
      constVariables = 0
    } else {
      constVariables = constVariables.length
    }

    const numberOfVariables = varVariables + letVariables + constVariables

    return numberOfVariables
  }

  /**
   * Returns the number of jsdoc-comments in the code.
   *
   * @param {string} data - The code.
   * @returns {number} - The number of jsdoc-comments.
   */
  jsdocCommentsCounter (data) {
    if (data === undefined) {
      return 0
    }

    let counter = 0
    const dataStringArray = data.split(/\n/)

    for (let i = 0; i < dataStringArray.length; i++) {
      if (dataStringArray[i].match(/\/\*\*/) || dataStringArray[i].match(/\/\*/)) { // match for /**
        if (dataStringArray[i + 1].match(/\*/) || dataStringArray[i + 1].match(/\*\//)) { // match for * or */
          counter++
        }
      }
    }

    return counter
  }
}
