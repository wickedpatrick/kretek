
var levels = [
"", //tu nie ma nic

//level 1
"\
################################\
#  S        GGGGGGGG    GG     #\
#           G   G G G          #\
#  GG       G                  #\
#  GG       G                  #\
#  #.       G                  #\
#       K   G                  #\
#           .                  #\
#..............................#\
#                              #\
#               #              #\
#                        A     #\
#                              #\
#    B                         #\
#          C                   #\
#                              #\
#                              #\
#           E                  #\
#                              #\
#                              #\
################################\
",

//level 2
"\
################################\
#                              #\
#                              #\
#                              #\
#              K               #\
#                              #\
#                              #\
#               E              #\
#                              #\
#                              #\
#             A                #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
################################\
",

];


let getRand = function(a, b)
{
    b -= a - 1;
    return Math.floor(Math.random() * b) + a;
};


let loadLevel = function(levelNo)
{
    let textData = levels[levelNo];
    let levelData = new Array(18);

    let idx = 0;
    for (let y = 0; y < 18; ++y) {
        levelData[y] = new Array(32);
        for (let x = 0; x < 32; ++x) {
            levelData[y][x] = textData.charAt(idx++);
        }
    }

    isLeft = isRight = isUp = isDown = false;

    return levelData;
};

// " " - miejsce
// "K" - kret
// "." - ziemia
// "L" - lopata
// "A" - robal1
// "B" - robatk2
// "C" - robak3
// "G" - glaz
// "#" - ściana
// "E" - ends
// "S" - snake

var map = [];

let makeGravity = function()
{
    let pair = findObject('K');
    let kretX = pair[0];
    let kretY = pair[1];

    for (let y = 16; y >= 0; --y) {
        for (let x = 0; x < 32; ++x) {
            let c = map[y][x];

            if (c === 'G') {
                if (isFieldFree(x, y + 1, true)) {
                    map[y][x] = ' ';
                    map[y + 1][x] = c;
                    if (y + 2 === kretY && x === kretX) {
                        return 'dead';
                    }
                } else {
                    if (isFieldFree(x - 1, y, true) &&
                        isFieldFree(x + 1, y, true) &&
                        isFieldFree(x - 1, y + 1, true) &&
                        isFieldFree(x + 1, y + 1, true) &&
                        y + 1 < 17 && map[y + 1][x] === 'G'
                    ) {
                        let newX = x + (getRand(0, 1) === 0 ? 1 : -1);
                        map[y][x] = ' ';
                        map[y + 1][newX] = 'G';
                        if (y + 2 === kretY && newX === kretX) {
                            return 'dead';
                        }
                    } else if (
                        isFieldFree(x - 1, y, true) &&
                        isFieldFree(x - 1, y + 1, true) &&
                        y + 1 < 17 && map[y + 1][x] === 'G'
                    ) {
                        map[y][x] = ' ';
                        map[y + 1][x - 1] = 'G';
                        if (y + 2 === kretY && x - 1 === kretX) {
                            return 'dead';
                        }
                    } else if (
                        isFieldFree(x + 1, y, true) &&
                        isFieldFree(x + 1, y + 1, true) &&
                        y + 1 < 17 && map[y + 1][x] === 'G'
                    ) {
                        map[y][x] = ' ';
                        map[y + 1][x + 1] = 'G';
                        if (y + 1 === kretY && x + 1 === kretX) {
                            return 'dead';
                        }
                    }
                }
            }
        }
    }

    return 'ok';
};

let isFieldFree = function(x, y, forGravity = false)
{
    if (x < 0 || x >= 32 || y < 0 || y >= 18) {
        return false;
    }

    let c = map[y][x];

    if (c === '#' || c === 'G') {
        return false;
    }

    if (forGravity && (c === '.' || c === 'K' || c === 'A' || c === 'B' || c === 'C' || c === 'E')) {
        return false;
    }

    return true;
};

let moveKretAt = function(dir)
{
    kretekLastDir = dir;

    let pair = findObject('K');
    let x = pair[0];
    let y = pair[1];
    let prevX = x;
    let prevY = y;

    if (dir === 'right') ++x;
    if (dir === 'left') --x;
    if (dir === 'up') --y;
    if (dir === 'down') ++y;

    if (dir === 'right' && map[y][x] === 'G' && isFieldFree(x + 1, y, true)) {
        map[prevY][prevX] = ' ';
        map[y][x] = 'K';
        map[y][x + 1] = 'G';
        return true;
    }

    if (dir === 'left' && map[y][x] === 'G' && isFieldFree(x - 1, y, true)) {
        map[prevY][prevX] = ' ';
        map[y][x] = 'K';
        map[y][x - 1] = 'G';
        return true;
    }

    if (!isFieldFree(x, y)) {
        return false;
    }

    map[prevY][prevX] = ' ';
    map[y][x] = 'K';

    return false;
};

let findObject = function(char)
{
    for (let y = 0; y < 18; ++y) {
        for (let x = 0; x < 32; ++x) {
            if (map[y][x] === char) {
                return [x, y];
            }
        }
    }

    return [];
};

var snakeDir = 1;

let moveSnake = function()
{
    for (let y = 0; y < 18; ++y) {
        for (let x = 0; x < 32; ++x) {
            if (map[y][x] === 'S') {

                if (snakeDir === 1) {
                    if (isFieldFree(x + 1, y, true)) {
                        map[y][x] = ' ';
                        map[y][x + 1] = 'S';
                        return;
                    } else if (isFieldFree(x, y - 1, true)) {
                        map[y][x] = ' ';
                        map[y - 1][x] = 'S';
                        return;
                    } else {
                        snakeDir = -1;
                    }
                } else if (snakeDir === -1) {
                    if (isFieldFree(x - 1, y, true)) {
                        map[y][x] = ' ';
                        map[y][x - 1] = 'S';
                        return;
                    } else if (isFieldFree(x, y + 1, true)) {
                        map[y][x] = ' ';
                        map[y + 1][x] = 'S';
                        return;
                    } else {
                        snakeDir = 1;
                    }
                }
            }
        }
    }
};


map = loadLevel(1);

// setInterval(function() {
//
//     let ePair = findObject('E');
//
//     if (isDown) moveKretAt('down');
//     else if (isUp) moveKretAt('up');
//     else if (isRight) moveKretAt('right');
//     else if (isLeft) moveKretAt('left');
//
//     let kPair = findObject('K');
//     moveSnake();
//     let sPair = findObject('S');
//
//     let x1 = kPair[0], x2 = sPair[0], y1 = kPair[1], y2 = sPair[1];
//
//     if ((x1 - 1 === x2 && y1 === y2) ||
//         (x1 + 1 === x2 && y1 === y2) ||
//         (x1 === x2 && y1 + 1 === y2) ||
//         (x1 === x2 && y1 - 1 === y2)
//     ) {
//         map = loadLevel(1);
//         alert("Bitten by river snake");
//         return;
//     }
//
//     if (makeGravity() === 'dead' ) {
//         map = loadLevel(1);
//         alert("Rock hit your head!");
//         return;
//     }
//
//     if (ePair[0] === x1 && ePair[1] === y1) {
//         alert("next level");
//         ++gameState;
//         map = loadLevel(gameState);
//     }
//
//     //display
//     let str = '';
//     for (let y = 0; y < 18; ++y) {
//         for (let x = 0; x < 32; ++x) {
//             str += map[y][x];
//         }
//         str += "\n";
//     }
//     $('#test-pre').text(str);
//
// }, 100);

var kretekLastDir = "right";
var isLeft = false;
var isRight = false;
var isUp = false;
var isDown = false;
document.addEventListener("keydown", event => {
    if (event.keyCode === 40) isDown = true;
    if (event.keyCode === 38) isUp = true;
    if (event.keyCode === 39) isRight = true;
    if (event.keyCode === 37) isLeft = true;
});
document.addEventListener("keyup", event2 => {
    if (event2.keyCode === 40) isDown = false;
    if (event2.keyCode === 38) isUp = false;
    if (event2.keyCode === 39) isRight = false;
    if (event2.keyCode === 37) isLeft = false;
});
