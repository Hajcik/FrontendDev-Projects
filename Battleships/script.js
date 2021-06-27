document.addEventListener('DOMContentLoaded', () => {
  
    const userGrid = document.querySelector('.grid-user')
    const computerGrid = document.querySelector('.grid-computer')
    const displayGrid = document.querySelector('.grid-display')
    const ships = document.querySelector('.ship')
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
    
    // Const variables
    const width = 10

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

  let randomStart = Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * directions))

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

createBoard(userGrid, userSquares);
createBoard(computerGrid, computerSquares);

generate(shipsArray[0]);
})

