import * as fs from 'fs'
import fetch from 'node-fetch'

/**
 * Analyzes your code.
 */
export default class CodeAnalyzer {
  /**
   * Returns the read code from the file as a string.
   *
   * @param {string} fileName - The name of the file.
   * @returns {string} - The code as a string.
   */
  fileToRead (fileName) {
    try {
      const readFile = fs.readFileSync(fileName, 'utf-8')

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
      method: 'GET',
      headers: {
        'bearer-token': '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'
      }
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

    const forLoopsArray = data.match(/for \(/g) || [] // match "for (".

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

    const commentsArray = data.match(/\/\/ /g) || [] // match "// ".

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

    const whileLoopsArray = data.match(/while \(/g) || [] // match "while (".

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

    const returnsArray = data.match(/return /g) || [] // match "return ".

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
    return data.length
  }

  /**
   * Returns the number of variables in the code.
   *
   * @param {string} data - The code.
   * @returns {number} - The number of variables.
   */
  variablesCounter (data) {
    let varVariables = data.match(/[^a-zA-Z]var /g)
    let letVariables = data.match(/[^a-zA-Z]let /g)
    let constVariables = data.match(/[^a-zA-Z]const /g)

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
}
