import * as data from "script.js"

const shipsArray = [
        {
            name: 'destroyer',
            directions: [
                [0, 1],
                [0, data.width]
            ]
        },
    
        {
            name: 'submarine',
            directions: [
                [0, 1, 2],
                [0, data.width, data.width*2]
            ]
        },
    
        {
            name: 'cruiser',
            directions: [
                [0, 1, 2],
                [0, data.width, data.width*2]
            ]
        },
    
        {
            name: 'battleship',
            directions: [
                [0, 1, 2, 3],
                [0, data.width, data.width*2, data.width*3]
            ]
        },
    
        {
            name: 'carrier',
            directions: [
                [0, 1, 2, 3, 4],
                [0, data.width, data.width*2, data.width*3, data.width*4]
            ]
        }
    ]