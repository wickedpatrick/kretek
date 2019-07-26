const MAX_WIDTH = 1600;
const MAX_HEIGHT = 900;

var FieldClassMapper = {
	'#': 'wall',
	'G': 'stone',
	'.': 'ground',
	'A': 'w1',
	'B': 'w2',
	'C': 'w3',
	'S': 'snake',
};

var KretStateMapper = {
	'right': 'kr',
	'left': 'kl',
	'down': 'kf',
	'up': 'kb',
};

var gameState = 0;

class MapMaker {
	constructor() {
		this.map = document.querySelector('#map');
		this.prevState = new Array(18);
		   for (let y = 0; y < 18; ++y) {
		       this.prevState[y] = new Array(32);
		   }
	}

	init () {
		map.forEach(function (row, x) {
			row.forEach(function (field, y) {
				createDiv(x, y);
			});
		});
	}

	draw() {
		let tt = this.prevState;
		map.forEach(function (row, x) {
			row.forEach(function (field, y) {
				//console.log(tt);
				if (tt.length === 0) {
					toggleFieldClass('_' + x + '_' + y, 'none', field);
				} else {
					if (field !== tt[x][y]) {
						toggleFieldClass('_' + x + '_' + y, tt[x][y], field);
					}
				}
			});
		});
	    for (let y = 0; y < 18; ++y) {
    		for (let x = 0; x < 32; ++x) {
    			this.prevState[y][x] = 0;
	        }
	    }
	}
}	


    var globalCounter = 0;

window.addEventListener('DOMContentLoaded', (event) => {

    const MapObj = new MapMaker();
	MapObj.init();

 	setInterval(function() {

 	    if (gameState === 0) {
 	        gameState = 1;
 	        loadLevel(gameState);
        } else {

            let ePair = findObject('E');

            if (globalCounter % 2 === 0) {
                if (isDown) moveKretAt('down');
                else if (isUp) moveKretAt('up');
                else if (isRight) moveKretAt('right');
                else if (isLeft) moveKretAt('left');
            }

            ++globalCounter;


            let kPair = findObject('K');
            moveSnake();
            let sPair = findObject('S');

            let x1 = kPair[0], x2 = sPair[0], y1 = kPair[1], y2 = sPair[1];

            if ((x1 - 1 === x2 && y1 === y2) ||
                (x1 + 1 === x2 && y1 === y2) ||
                (x1 === x2 && y1 + 1 === y2) ||
                (x1 === x2 && y1 - 1 === y2)
            ) {
                gameState = 1;
                map = loadLevel(gameState);
                alert("Bitten by river snake");
                return;
            }

            if (makeGravity() === 'dead' ) {
                gameState = 1;
                map = loadLevel(gameState);
                alert("Rock hit your head!");
                return;
            }

            if (ePair[0] === x1 && ePair[1] === y1) {
                alert("next level");
                ++gameState;
                map = loadLevel(gameState);
                return;
            }

            if (isDown) moveKretAt('down');
            else if (isUp) moveKretAt('up');
            else if (isRight) moveKretAt('right');
            else if (isLeft) moveKretAt('left');

            moveSnake();
            makeGravity(0, 0);

            // //display debug
            // let str = '';
            // for (let y = 0; y < 18; ++y) {
            //     for (let x = 0; x < 32; ++x) {
            //         str += map[y][x];
            //     }
            //     str += "\n";
            // }
            //
            // console.log(str);

            MapObj.draw();
        }
	}, 100);
});

// document.addEventListener("keydown", event => {
// 	if (event.keyCode === 40) {
// 		Kreciu.move('down');
// 	}
// 	if (event.keyCode === 38) {
// 		Kreciu.move('up');
// 	}
// 	if (event.keyCode === 39) {
// 		Kreciu.move('right');
// 	}
// 	if (event.keyCode === 37) {
// 		Kreciu.move('left');
// 	}
// });

function toggleFieldClass(id, prev, thenew)
{
	var field = document.querySelector('#' + id);
	field.classList.remove('kl');
	field.classList.remove('kr');
	field.classList.remove('kf');
	field.classList.remove('kb');
	field.classList.remove('ground');
	field.classList.remove('stone');
	field.classList.remove('wall');
	field.classList.remove('w1');
	field.classList.remove('w2');
	field.classList.remove('w3');
	field.classList.remove('snake');

	if (thenew === 'K') {
		thenew = KretStateMapper[kretekLastDir];
	} else {
		prev = FieldClassMapper[prev];
		thenew = FieldClassMapper[thenew];
	}

	
	field.classList.remove(prev);
	field.classList.add(thenew);
}


function createDiv (x, y) {
	var mapField = document.createElement('div');
	mapField.setAttribute('id', '_' + x + '_' + y);
	mapField.classList.add("field");
	document.querySelector('#map').appendChild(mapField);
}
