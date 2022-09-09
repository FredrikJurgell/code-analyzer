import * as fs from 'fs'

export default class CodeAnalyzer {
  fileToRead (fileName) {
    const readFile = fs.readFileSync(`src/${fileName}`, 'utf-8')
    return readFile
  }

  linesCounter (data) {
    let counter = 1

    for (let i = 0; i < data.length; i++) {
      if (data[i] === '\n') {
        counter++
      }
    }
    return counter
  }
}
