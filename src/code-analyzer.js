import * as fs from 'fs'
import fetch from 'node-fetch'

export default class CodeAnalyzer {
  constructor (fileName) {
    this.fileName = fileName
  }

  readFile () {
    try {
      const readFile = fs.readFileSync(this.fileName, 'utf-8')

      return readFile
    } catch (error) {
      return 'Invalid file-name.'
    }
  }

  readFolder (folderName) {
    try {
      const readFolder = fs.readdirSync(folderName, 'utf-8')
      const javascriptFiles = []

      for (let i = 0; i < readFolder.length; i++) {
        if (readFolder[i].match(/.js/g)) {
          javascriptFiles.push(readFolder[i])
        }
      }

      return javascriptFiles
    } catch (error) {
      return 'Invalid folder-name.'
    }
  }

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

  #checkIfDataDefined (data) {
    if (data === undefined) {
      throw new Error('The data is undefined.')
    }
  }

  countLines (data) {
    let numberofLines = 0

    this.#checkIfDataDefined(data)

    for (let i = 0; i < data.length; i++) {
      if (data[i] === '\n') { // if new line.
        numberofLines++
      }
    }

    return numberofLines
  }

  countForLoops (data) {
    let numberOfForLoops = 0

    this.#checkIfDataDefined(data)

    const matchedForLoops = data.match(/[^a-zA-Z]for \(/g) || [] // match "for (".

    for (let i = 0; i < matchedForLoops.length; i++) {
      numberOfForLoops++
    }

    return numberOfForLoops
  }

  countInlineComments (data) {
    let numberOfComments = 0

    this.#checkIfDataDefined(data)

    const matchedComments = data.match(/[^a-zA-Z]\/\/ /g) || [] // match "// ".

    for (let i = 0; i < matchedComments.length; i++) {
      numberOfComments++
    }

    return numberOfComments
  }

  countWhileLoops (data) {
    let numberOfWhileLoops = 0

    this.#checkIfDataDefined(data)

    const MatchedWhileLoops = data.match(/[^a-zA-Z]while \(/g) || [] // match "while (".

    for (let i = 0; i < MatchedWhileLoops.length; i++) {
      numberOfWhileLoops++
    }

    return numberOfWhileLoops
  }

  countReturns (data) {
    let numberOfReturns = 0

    this.#checkIfDataDefined(data)

    const matchedReturns = data.match(/[^a-zA-Z]return /g) || [] // match "return ".

    for (let i = 0; i < matchedReturns.length; i++) {
      numberOfReturns++
    }

    return numberOfReturns
  }

  countCharacters (data) {
    this.#checkIfDataDefined(data)

    return data.length
  }

  countVariables (data) {
    this.#checkIfDataDefined(data)

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

  countJsdocComments (data) {
    this.#checkIfDataDefined(data)

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

  longestLine (data) {
    this.#checkIfDataDefined(data)
    let longestLineLength = 0
    const longestLine = {}

    const splitData = data.split('\n')
    for (let i = 0; i < splitData.length; i++) {
      if (splitData[i].length > longestLineLength) {
        longestLineLength = splitData[i].length
        longestLine.string = splitData[i]
        longestLine.lineNumber = i + 1
        longestLine.lineLength = splitData[i].length
      }
    }

    return longestLine
  }
}
