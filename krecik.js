const MAX_WIDTH = 1600;
const MAX_HEIGHT = 900;

var FieldClassMapper = {
	'#': 'wall',
	'G': 'stone',
	'.': 'ground'
};

var gameState = 0;

class Kretek {
	
	constructor(x, y) {
		this.posX = x * 50;
		this.posY = y * 50;
		this.mapX = x;
		this.mapY = y;
		this.score = 0;
	}

	init(map) {
		this.domObj = document.querySelector('#krecik');
		this.domObj.style.width = '50px';
		this.domObj.style.height = '50px';
		this.domObj.style.backgroundColor = 'red';
		this.domObj.style.position = 'absolute';
		this.domObj.style.top = this.posY + 'px';
		this.domObj.style.left = this.posX + 'px';
		this.map = map;
	}

	move (direction) {
		if (direction === 'down') {
			if (!this.isMovePossible('Y', this.posY + 50)) {
				return;
			}
			if (this.isBlocked(this.mapX, this.mapY + 1)) {
				return;
			}
			this.posY = this.posY + 50;
			this.mapY++;
		}
		if (direction === 'up') {
			if (!this.isMovePossible('Y', this.posY - 50)) {
				return;
			}
			if (this.isBlocked(this.mapX, this.mapY - 1)) {
				return;
			}			
			this.posY = this.posY - 50;
			this.mapY--;
		}
		if (direction === 'right') {
			if (!this.isMovePossible('X', this.posX + 50)) {
				return;
			}
			if (this.isBlocked(this.mapX + 1, this.mapY)) {
				return;
			}			
			this.posX = this.posX + 50;
			this.mapX++;
		}
		if (direction === 'left') {
			if (!this.isMovePossible('X', this.posX - 50)) {
				return;
			}
			if (this.isBlocked(this.mapX - 1, this.mapY)) {
				return;
			}						
			this.posX = this.posX - 50;
			this.mapX--;
		}
		this.domObj.style.top = this.posY + 'px';
		this.domObj.style.left = this.posX + 'px';
	}

	// isMovePossible(os, val) {
	// 	if (os === 'Y') {
	// 		if (val < 0 || val >= MAX_HEIGHT) {
	// 			return false;
	// 		}
	// 	}
	// 	if (os === 'X') {
	// 		if (val < 0 || val >= MAX_WIDTH) {
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// }

	isBlocked(x, y) {
		if (this.map[y][x] === '#' || this.map[y][x] === 'G') {
			return true;
		}
		return false;
	}

}

class MapMaker {
	constructor() {
		this.map = document.querySelector('#map');
		this.prevState = [];
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
				if (tt.length === 0) {
					toggleFieldClass('_' + x + '_' + y, 'none', field);
				} else {
					if (field !== tt[x][y]) {
						toggleFieldClass('_' + x + '_' + y, tt[x][y], field);
					}
				}
			});
		});
		this.prevState = map;
	}
}	

window.addEventListener('DOMContentLoaded', (event) => {

    const MapObj = new MapMaker();
	MapObj.init();

 	setInterval(function() {

 	    if (gameState === 0) {
 	        gameState = 1;
 	        loadLevel(gameState);
        } else {
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
	prev = FieldClassMapper[prev];
	thenew = FieldClassMapper[thenew];

	var field = document.querySelector('#' + id);
	field.classList.remove(prev);
	field.classList.add(thenew);
}


function createDiv (x, y) {
	var mapField = document.createElement('div');
	mapField.setAttribute('id', '_' + x + '_' + y);
	mapField.classList.add("field");
	document.querySelector('#map').appendChild(mapField);
}






