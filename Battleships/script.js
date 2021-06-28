document.addEventListener('DOMContentLoaded', () => {
  
    const userGrid = document.querySelector('.grid-user')
    const computerGrid = document.querySelector('.grid-computer')
    const displayGrid = document.querySelector('.grid-display')
    const ships = document.querySelectorAll('.ship')
    const destroyer = document.querySelector('.destroyer-container')
    const submarine = document.querySelector('.submarine-container')
    const cruiser = document.querySelector('.cruiser-container')
    const battleship = document.querySelector('.battleship-container')
    const carrier = document.querySelector('.carrier-container')

    const startButton = document.querySelector('#start')
    const rotateButton = document.querySelector('#rotate')
    const turnDisplay = document.querySelector('#whose-go')
    const infoDisplay = document.querySelector('#info')

    // Arrays
    const userSquares = []
    const computerSquares = []
    
    // Variables
    const width = 10
    let selectedShipNameWithIndex
    let draggedShip
    let draggedShipLength
    let isHorizontal = true;

    // Ships
    const shipsArray = [
      {
          name: 'destroyer',
          directions: [
              [0, 1],
              [0, width]
          ]
      },
  
      {
          name: 'submarine',
          directions: [
              [0, 1, 2],
              [0, width, width*2]
          ]
      },
  
      {
          name: 'cruiser',
          directions: [
              [0, 1, 2],
              [0, width, width*2]
          ]
      },
  
      {
          name: 'battleship',
          directions: [
              [0, 1, 2, 3],
              [0, width, width*2, width*3]
          ]
      },
  
      {
          name: 'carrier',
          directions: [
              [0, 1, 2, 3, 4],
              [0, width, width*2, width*3, width*4]
          ]
      }
  ]
    // Functions
    // Create boards

function createBoard(grid, squares)
{
  
  // we're creating "board" on player/computer panel with div's
    for(let i = 0; i < width * width; i++)
    {
      const square = document.createElement('div');
      grid.appendChild(square);

      squares.push(square);
    }
}

    // Draw computer's ships in random locations

function generate(ship) {

  // we're putting a randomDirection to current direction of a chosen ship
  // check data.js

  let randomDirection = Math.floor(Math.random() * ship.directions.length);
  let current = ship.directions[randomDirection]

  if(randomDirection === 0) directions = 1
  if(randomDirection === 1) directions = 10

  let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * directions)))

  // checking if space is taken
  const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
  
  // if current ship squares deeply equals we ensure that we're in the furthest to right/left column
  const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1) 
  const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0) 
  
  if(!isTaken && !isAtLeftEdge && !isAtRightEdge){
      current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
  } 

  else generate(ship);
}

    // Rotate player's ships
function rotate() {
// we want to toggle
    if(isHorizontal) {
        destroyer.classList.toggle('destroyer-container-vertical')
        submarine.classList.toggle('submarine-container-vertical')
        cruiser.classList.toggle('cruiser-container-vertical')
        battleship.classList.toggle('battleship-container-vertical')
        carrier.classList.toggle('carrier-container-vertical')
        isHorizontal = false
        console.log(isHorizontal)
        return
    }

    if(!isHorizontal) {
        destroyer.classList.toggle('destroyer-container-vertical')
        submarine.classList.toggle('submarine-container-vertical')
        cruiser.classList.toggle('cruiser-container-vertical')
        battleship.classList.toggle('battleship-container-vertical')
        carrier.classList.toggle('carrier-container-vertical')
        isHorizontal = true
        console.log(isHorizontal)
        return
    }
}


// put shipId into the variable by clicking with mouse
ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
    selectedShipNameWithIndex = e.target.id
    console.log(selectedShipNameWithIndex)
}))

    // Dragging ship start
function dragStart() {
    draggedShip = this
    draggedShipLength = draggedShip.length
    console.log(draggedShip)
}
    // Dragging ship over
function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {
    console.log('drag leave')
}

function dragDrop() {
    let shipNameWithLastId = draggedShip.lastChild.id
    let shipClass = shipNameWithLastId.slice(0, -2)
    
    console.log(shipClass)

    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
    //we exactly know where last element of the ship is
    let shipLastId = lastShipIndex + parseInt(this.dataset.id)

    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
    //console.log(selectedShipIndex)

    // we need to make sure that if we grab whenever on the ship
    // it will not break when placing it near the edges, to secure this
    // kind of situation
    selectedShipIndex
}

function dragEnd() {
    
}

// Create grids
createBoard(userGrid, userSquares);
createBoard(computerGrid, computerSquares);

// Generate AI ships on to the grid
generate(shipsArray[0]);
generate(shipsArray[1]);
generate(shipsArray[2]);
generate(shipsArray[3]);
generate(shipsArray[4]);

// Button functions exec
rotateButton.addEventListener('click', rotate)

// Move user ships
ships.forEach(ship => ship.addEventListener('dragstart', dragStart)) // to fix
userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
userSquares.forEach(square => square.addEventListener('dragover', dragOver))
userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
userSquares.forEach(square => square.addEventListener('drop', dragDrop))
userSquares.forEach(square => square.addEventListener('dragend', dragEnd))


})