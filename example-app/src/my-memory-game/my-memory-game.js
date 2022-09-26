/**
 * The my-memory-game web component module.
 *
 * @author Fredrik Jurgell <fj222qp@student.lnu.se>
 * @version 1.0.0
 */

import '../my-flipping-tile'

/*
 * Get image URLs.
 */
const NUMBER_OF_IMAGES = 9

const IMG_URLS = new Array(NUMBER_OF_IMAGES)
for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
  IMG_URLS[i] = (new URL(`images/${i}.png`, import.meta.url)).href
}

const IMG_URL_CLOSE_BUTTON = (new URL('images/close-button.svg', import.meta.url)).href

/*
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      --tile-size: 80px;
    }

    #game-board {
      display: none;
      grid-template-columns: repeat(4, var(--tile-size));
      gap: 20px;
    }

    #game-board.small {
      grid-template-columns: repeat(2, var(--tile-size));
    }

    my-flipping-tile {
      width: var(--tile-size);
      height: var(--tile-size);
    }

    my-flipping-tile::part(tile-back) {
      border-width: 5px;
      background: url("${IMG_URLS[0]}") no-repeat center/80%, radial-gradient(#fff, #ffd700);
    }

    #memoryGameDiv {
      position: absolute;
      border: 1px solid;
      background-color: #e0e0e0;
      padding-right: 25px;
      padding-left: 25px;
      padding-bottom: 25px;
    }

    #draggableDiv {
      text-align: right;
      background-color: #646464;
      width: 380px;
      height: 35px;
    }
  </style>

  <div id="memoryGameDiv">
    <div id="draggableDiv">
      <button id="deleteBtn"><img src="${IMG_URL_CLOSE_BUTTON}" height="25px" width="25px"></button>
    </div>
    <table>
      <td>Number of attempts: </td>
      <td id="numberOfAttempts">0</td>
      <td>Timer: </td>
      <td id="timer">0</td>
    </table>
    <button id="small">SMALL</button>
    <button id="medium">MEDIUM</button>
    <button id="large">LARGE</button>
    <button id="start">START</button>
    <button id="reset">RESET</button>
    <template id="tile-template">
      <my-flipping-tile>
        <img />
      </my-flipping-tile>
    </template>
    <div id="game-board">
    </div>
  </div>
`

/*
 * Define custom element.
 */
customElements.define('my-memory-game',
  /**
   * Represents a memory game
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the game board element in the shadow root.
      this.gameBoard = this.shadowRoot.querySelector('#game-board')

      // Get the tile template element in the shadow root.
      this.tileTemplate = this.shadowRoot.querySelector('#tile-template')

      this.timerTd = this.shadowRoot.querySelector('#timer')
      this.timeCounter = 1

      this.onTileFlip = this.onTileFlip.bind(this)

      this.attempts = 0

      this.shadowRoot.querySelector('#small').onclick = this.small
      this.shadowRoot.querySelector('#medium').onclick = this.medium
      this.shadowRoot.querySelector('#large').onclick = this.large
      this.shadowRoot.querySelector('#start').addEventListener('click', this.bindStartGame)
      this.shadowRoot.querySelector('#reset').addEventListener('click', this.bindRestartGame)
    }

    /**
     * Gets the board size.
     *
     * @returns {string} The size of the game board.
     */
    get boardSize () {
      return this.getAttribute('boardsize')
    }

    /**
     * Sets the board size.
     *
     * @param {string} value - The size of the game board.
     */
    set boardSize (value) {
      this.setAttribute('boardsize', value)
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['boardsize']
    }

    /**
     * Get the game board size dimensions.
     *
     * @returns {object} The width and height of the game board.
     */
    get gameBoardSize () {
      const gameBoardSize = {
        width: 4,
        height: 4
      }

      if (this.boardSize === 'small') {
        gameBoardSize.width = gameBoardSize.height = 2

        return gameBoardSize
      }

      if (this.boardSize === 'medium') {
        gameBoardSize.height = 2

        return gameBoardSize
      }

      if (this.boardSize === 'large') {
        gameBoardSize.width = gameBoardSize.height = 4

        return gameBoardSize
      }
    }

    /**
     * Get all tiles.
     *
     * @returns {object} An object containing grouped tiles.
     */
    get tiles () {
      const tiles = Array.from(this.gameBoard.children)
      return {
        all: tiles,
        faceUp: tiles.filter(tile => tile.hasAttribute('face-up') && !tile.hasAttribute('hidden')),
        faceDown: tiles.filter(tile => !tile.hasAttribute('face-up') && !tile.hasAttribute('hidden')),
        hidden: tiles.filter(tile => tile.hasAttribute('hidden'))
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.style.position = 'absolute'
      this.style.zIndex = (this.getMaxZIndex() + 1)

      if (!this.hasAttribute('boardsize')) {
        this.setAttribute('boardsize', 'large')
      }

      this.upgradeProperty('boardsize')

      this.bindDeleteElement = this.deleteElement.bind(this)
      this.shadowRoot.querySelector('#deleteBtn').addEventListener('click', this.bindDeleteElement)

      this.bindStartGame = this.startGame.bind(this)
      this.shadowRoot.querySelector('#start').addEventListener('click', this.bindStartGame)

      this.bindRestartGame = this.restartGame.bind(this)
      this.shadowRoot.querySelector('#reset').addEventListener('click', this.bindRestartGame)

      this.gameBoard.addEventListener('tileflip', this.onTileFlip)
      this.addEventListener('dragstart', this.onDragStart)

      this.bindDragElement = this.dragElement.bind(this)
      this.shadowRoot.querySelector('#draggableDiv').addEventListener('click', this.bindDragElement)
    }

    /**
     * A timer.
     */
    timer () {
      this.timerTd.textContent = this.timeCounter++
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'boardsize') {
        this.init()
      }
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.removeEventListener('tileflip', this.onTileFlip)
      this.removeEventListener('dragstart', this.onDragStart)
    }

    /**
     * Run the specified instance property through the class setter.
     *
     * @param {string} prop - The property's name.
     */
    upgradeProperty (prop) {
      if (Object.hasOwnProperty.call(this, prop)) {
        const value = this[prop]
        delete this[prop]
        this[prop] = value
      }
    }

    /**
     * Changes the boardsize to small.
     */
    small () {
      this.parentNode.parentNode.getRootNode().host.setAttribute('boardsize', 'small')
    }

    /**
     * Changes the boardsize to medium.
     */
    medium () {
      this.parentNode.parentNode.getRootNode().host.setAttribute('boardsize', 'medium')
    }

    /**
     * Changes the boardsize to large.
     */
    large () {
      this.parentNode.parentNode.getRootNode().host.setAttribute('boardsize', 'large')
    }

    /**
     * Initializes the game board size and tiles.
     */
    init () {
      const { width, height } = this.gameBoardSize

      const tilesCount = width * height

      if (tilesCount !== this.tiles.all.length) {
        // Remove existing tiles, if any.
        while (this.gameBoard.firstChild) {
          this.gameBoard.removeChild(this.gameBoard.lastChild)
        }

        if (width === 2) {
          this.gameBoard.classList.add('small')
        } else {
          this.gameBoard.classList.remove('small')
        }

        // Add tiles.
        for (let i = 0; i < tilesCount; i++) {
          const tile = this.tileTemplate.content.cloneNode(true)
          this.gameBoard.appendChild(tile)
        }
      }

      // Create a sequence of numbers between 0 and 15,
      // and then shuffle the sequence.
      const indexes = [...Array(tilesCount).keys()]

      for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]]
      }

      // Set the tiles' images.
      this.tiles.all.forEach((tile, i) => {
        tile.querySelector('img').setAttribute('src', IMG_URLS[indexes[i] % (tilesCount / 2) + 1])
        tile.faceUp = tile.disabled = tile.hidden = false
      })
    }

    /**
     * Handles drag start events. This is needed to prevent the
     * dragging of tiles.
     *
     * @param {DragEvent} event - The drag event.
     */
    onDragStart (event) {
      // Disable element dragging.
      event.preventDefault()
      event.stopPropagation()
    }

    /**
     * Displays the number of attempts.
     */
    numberOfAttempts () {
      this.shadowRoot.querySelector('#numberOfAttempts').textContent = this.attempts
    }

    /**
     * Starts the game.
     *
     * @param {MouseEvent} event - The mouse event.
     */
    startGame (event) {
      event.preventDefault()

      // Starts the timer.
      this.interval = setInterval(() => {
        this.timer()
      }, 1000)

      // Disables buttons.
      this.shadowRoot.querySelector('#game-board').style.display = 'grid'
      this.shadowRoot.querySelector('#start').disabled = true
      this.shadowRoot.querySelector('#small').disabled = true
      this.shadowRoot.querySelector('#medium').disabled = true
      this.shadowRoot.querySelector('#large').disabled = true
    }

    /**
     * Restets the board.
     *
     * @param {MouseEvent} event - The mouse event.
     */
    restartGame (event) {
      event.preventDefault()

      const boardsizeAttribute = this.getAttribute('boardsize')
      // Sets the boardsize to small.
      if (boardsizeAttribute === 'small') {
        this.setAttribute('boardsize', 'medium')
        this.setAttribute('boardsize', 'small')
      }
      // Sets the boardsize to medium.
      if (boardsizeAttribute === 'medium') {
        this.setAttribute('boardsize', 'large')
        this.setAttribute('boardsize', 'medium')
      }
      // Sets the boardsize to large.
      if (boardsizeAttribute === 'large') {
        this.setAttribute('boardsize', 'small')
        this.setAttribute('boardsize', 'large')
      }

      // Enables the buttons.
      this.shadowRoot.querySelector('#small').disabled = false
      this.shadowRoot.querySelector('#medium').disabled = false
      this.shadowRoot.querySelector('#large').disabled = false
      this.shadowRoot.querySelector('#start').disabled = false

      this.shadowRoot.querySelector('#game-board').style.display = 'none'

      // Stops the timer and reset it.
      clearInterval(this.interval)
      this.timeCounter = 0
      this.timerTd.textContent = this.timeCounter

      // Resets your attempts.
      this.attempts = 0
      this.shadowRoot.querySelector('#numberOfAttempts').textContent = this.attempts
    }

    /**
     * Handles flip events.
     *
     * @param {CustomEvent} event - The custom event.
     */
    onTileFlip (event) {
      const tiles = this.tiles
      const tilesToDisable = Array.from(tiles.faceUp)

      if (tiles.faceUp.length > 1) {
        tilesToDisable.push(...tiles.faceDown)
      }

      tilesToDisable.forEach(tile => (tile.setAttribute('disabled', '')))

      const [first, second, ...tilesToEnable] = tilesToDisable

      if (second) {
        const isEqual = first.isEqual(second)
        const delay = isEqual ? 1000 : 1500

        window.setTimeout(() => {
          let eventName = 'tilesmismatch'
          if (isEqual) {
            this.attempts++
            this.numberOfAttempts()

            first.setAttribute('hidden', '')
            second.setAttribute('hidden', '')
            eventName = 'tilesmatch'
          } else {
            this.attempts++
            this.numberOfAttempts()

            first.removeAttribute('face-up')
            second.removeAttribute('face-up')
            tilesToEnable.push(first, second)
          }

          this.dispatchEvent(new CustomEvent(eventName, {
            bubbles: true,
            detail: { first, second }
          }))

          if (tiles.all.every(tile => tile.hidden)) {
            // Stops timer.
            clearInterval(this.interval)

            tiles.all.forEach(tile => (tile.disabled = true))
            this.dispatchEvent(new CustomEvent('gameover', {
              bubbles: true
            }))
            this.numberOfAttempts()
            window.setTimeout(() => {
              // Resets the baord.
              const boardsizeAttribute = this.getAttribute('boardsize')
              if (boardsizeAttribute === 'small') {
                this.setAttribute('boardsize', 'medium')
                this.setAttribute('boardsize', 'small')
              }
              if (boardsizeAttribute === 'medium') {
                this.setAttribute('boardsize', 'large')
                this.setAttribute('boardsize', 'medium')
              }
              if (boardsizeAttribute === 'large') {
                this.setAttribute('boardsize', 'small')
                this.setAttribute('boardsize', 'large')
              }

              // Resets your attempts.
              this.attempts = 0
              this.shadowRoot.querySelector('#numberOfAttempts').textContent = this.attempts

              // Reset timer.
              this.timeCounter = 0
              this.timerTd.textContent = this.timeCounter

              this.shadowRoot.querySelector('#small').disabled = false
              this.shadowRoot.querySelector('#medium').disabled = false
              this.shadowRoot.querySelector('#large').disabled = false
            }, 2500)
          } else {
            tilesToEnable?.forEach(tile => (tile.removeAttribute('disabled')))
          }
        }, delay)
      }
    }

    /**
     * Find the highest z-index on the page.
     * Code is very much inspired from: https://bobbyhadz.com/blog/javascript-find-highest-z-index-on-page.
     *
     * @returns {number} - The highest z-index on the page.
     */
    getMaxZIndex () {
      return Math.max(
        ...Array.from(document.querySelectorAll('body *'), element =>
          parseFloat(window.getComputedStyle(element).zIndex)
        ).filter(zIndex => !Number.isNaN(zIndex)),
        0
      )
    }

    /**
     * Deletes the element.
     */
    deleteElement () {
      this.remove()
    }

    /**
     * Moves the element.
     */
    dragElement () {
      // The elements move to the front.
      this.style.zIndex = this.getMaxZIndex() + 1
      const element = this.shadowRoot.querySelector('#rockPaperScissorsApplicationDiv')
      let pos1 = 0
      let pos2 = 0
      let pos3 = 0
      let pos4 = 0
      if (element) {
        this.shadowRoot.querySelector('#draggableDiv').onmousedown = dragMouseDown
      }

      /**
       * Mouse drag event.
       *
       * @param {*} event The event.
       */
      function dragMouseDown (event) {
        event = event || window.event
        event.preventDefault()
        // Get the mouse cursor position at startup.
        pos3 = event.clientX
        pos4 = event.clientY
        document.onmouseup = closeDragElement
        // Call a function whenever the cursor moves.
        document.onmousemove = elementDrag
      }

      /**
       * Moves the element.
       *
       * @param {*} event - The event.
       */
      function elementDrag (event) {
        event = event || window.event
        event.preventDefault()
        // Calculate the new cursor position.
        pos1 = pos3 - event.clientX
        pos2 = pos4 - event.clientY
        // Calculate the max cursor position.
        const xMax = window.innerWidth - element.offsetWidth
        const yMax = window.innerHeight - element.offsetHeight
        // Set the element's new position.
        if ((element.offsetLeft - pos1) >= 0 && (element.offsetLeft - pos1) <= xMax) {
          element.style.left = (element.offsetLeft - pos1) + 'px'
          pos3 = event.clientX
        }
        if ((element.offsetTop - pos2) >= 0 && (element.offsetTop - pos2) <= yMax) {
          element.style.top = (element.offsetTop - pos2) + 'px'
          pos4 = event.clientY
        }
      }

      /**
       * Stops moving the element.
       */
      function closeDragElement () {
        // Stop moving when mouse button is released.
        document.onmouseup = null
        document.onmousemove = null
      }
    }
  }
)
