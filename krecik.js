const MAX_WIDTH = 1600;
const MAX_HEIGHT = 900;


const LEVEL1 = [
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '#', '.', 'G', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '#', '.', 'G', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
];

class Kretek {
	
	constructor(x, y) {
		this.posX = x * 50;
		this.posY = y * 50;
		this.mapX = x;
		this.mapY = y;
		this.score = 0;
	}

	init() {
		this.domObj = document.querySelector('#krecik');
		this.domObj.style.width = '50px';
		this.domObj.style.height = '50px';
		this.domObj.style.backgroundColor = 'red';
		this.domObj.style.position = 'relative';
		this.domObj.style.top = this.posY + 'px';
		this.domObj.style.left = this.posX + 'px';
		this.map = LEVEL1;
		console.log(this.posX, this.posY);
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
		console.log(this.posX, this.posY);
	}

	isMovePossible(os, val) {
		console.log(os,val);
		if (os === 'Y') {
			if (val < 0 || val >= MAX_HEIGHT) {
				return false;
			}
		}
		if (os === 'X') {
			if (val < 0 || val >= MAX_WIDTH) {
				return false;
			}
		}
		return true;
	}

	isBlocked(x, y) {
		if (this.map[y][x] === '#' || this.map[y][x] === 'G') {
			return true;
		}
		return false;
	}

}

const Kreciu = new Kretek(2, 2);

window.addEventListener('DOMContentLoaded', (event) => {
    Kreciu.init();
});

document.addEventListener("keydown", event => {
	if (event.keyCode === 40) {
		Kreciu.move('down');
	}
	if (event.keyCode === 38) {
		Kreciu.move('up');
	}
	if (event.keyCode === 39) {
		Kreciu.move('right');
	}
	if (event.keyCode === 37) {
		Kreciu.move('left');
	}
});


