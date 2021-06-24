var left = document.getElementById("canvas-container").offsetLeft;

function onResize() {
    this.left = document.getElementById("canvas-container").offsetLeft;

}

var canvas_object = c1.getContext("2d");
var canvas_width = canvas_object.canvas.width;
var canvas_height = canvas_object.canvas.height;
var jump = 10;
var time;
var MOUSE_POSITION = {
    x: 0,
    y: 0
};
var SQUARE_POSITION = {
    x: 0,
    y: 0
};

function main() {
    change_color = false;
    chessboard_width = 500;
    square_number = 10;
    square_side = chessboard_width / square_number;
    zip.value = square_number;
    ZIP_change();
    Table();
}

function Table() {
    chessboard_table = new Array(101);
    chessboard_neighbor_number = new Array(101);
    for (var canvas_width = 0; canvas_width <= 101; canvas_width++) {
        chessboard_table[canvas_width] = new Array(101);
        chessboard_neighbor_number[canvas_width] = new Array(101);
        for (var square = 0; square <= 101; square++) {
            chessboard_table[canvas_width][square] = 0;
            chessboard_neighbor_number[canvas_width][square] = 0;
        }
    }
}

function FStartStop() {
    change_color = !change_color;
    if (!change_color) {
        BUTstart.value = " START ";
    } else {
        BUTstart.value = " STOP ";
    }
}
canvas_object.canvas.onclick = function (evt) {
    MOUSE_POSITION.x = evt.clientX - left + 8;
    MOUSE_POSITION.y = evt.clientY - 8;
    SQUARE_POSITION.x = parseInt((MOUSE_POSITION.x - 10) / square_side) + 1;
    SQUARE_POSITION.y = parseInt((MOUSE_POSITION.y - 10) / square_side) + 1;
    chessboard_table[SQUARE_POSITION.x][SQUARE_POSITION.y] = !chessboard_table[SQUARE_POSITION.x][SQUARE_POSITION.y];
};

function ZIP_change() {
    square_number = zip.value;
    zip_TXT.value = square_number;
    square_side = chessboard_width / square_number;
}

function Square(x, y, side, color, color_in) {
    canvas_object.lineWidth = 1;
    canvas_object.fillStyle = color_in;
    canvas_object.fillRect(x, y, side, side);
    canvas_object.strokeStyle = color;
    canvas_object.strokeRect(x, y, side, side);
}
//szachownica
function Chess(x, y, side, number, color, color_in) {
    for (var square = 0; square < number; square++) {
        for (var canvas_width = 0; canvas_width < number; canvas_width++) {
            Square(x + side * square, y + side * canvas_width, side, color, color_in);
        }
    }
}

function Paint_chess(side, number) {
    for (var canvas_width = 1; canvas_width <= number; canvas_width++) {
        for (var square = 1; square <= number; square++) {
            var x1 = (canvas_width - 1) * side;
            var y1 = (square - 1) * side;
            if (chessboard_table[canvas_width][square] == 0) {
                Square(x1, y1, side, "black", "#ffe3fe");
            }
            if (chessboard_table[canvas_width][square] == 1) {
                Square(x1, y1, side, "black", "#93329e");
            }
        }
    }
}

function Count_chess() {
    for (var canvas_width = 1; canvas_width < square_number; canvas_width++) {
        for (var square = 1; square < square_number; square++) {
            var value = 0;
            value = value + chessboard_table[canvas_width - 1][square - 1];
            value = value + chessboard_table[canvas_width - 1][square - 0];
            value = value + chessboard_table[canvas_width - 1][square + 1];
            value = value + chessboard_table[canvas_width - 0][square - 1];
            value = value + chessboard_table[canvas_width - 0][square + 1];
            value = value + chessboard_table[canvas_width + 1][square - 1];
            value = value + chessboard_table[canvas_width + 1][square - 0];
            value = value + chessboard_table[canvas_width + 1][square + 1];
            chessboard_neighbor_number[canvas_width][square] = value;
        }
    }
}

function Count_generation() {
    for (var canvas_width = 1; canvas_width < square_number; canvas_width++) {
        for (var square = 1; square < square_number; square++) {
            if (chessboard_table[canvas_width][square] == 0 && chessboard_neighbor_number[canvas_width][square] == 3) {
                chessboard_table[canvas_width][square] = 1;
            }
            if (chessboard_table[canvas_width][square] == 1 && chessboard_neighbor_number[canvas_width][square] <= 1) {
                chessboard_table[canvas_width][square] = 0;
            }
            if (chessboard_table[canvas_width][square] == 1 && chessboard_neighbor_number[canvas_width][square] >= 4) {
                chessboard_table[canvas_width][square] = 0;
            }
        }
    }
}

function Animation() {
    canvas_object.clearRect(0, 0, canvas_width, canvas_height);
    canvas_object.strokeStyle = "black";
    canvas_object.strokeRect(0, 0, canvas_width, canvas_height);

    Paint_chess(square_side, square_number);
    if (change_color) {
        Count_chess();
        Count_generation();
    }
    clearTimeout(time);
    time = setTimeout(Animation, jump);
}
main();
Animation();