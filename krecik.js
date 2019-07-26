const MAX_WIDTH = 1600;
const MAX_HEIGHT = 900;


class Kretek {
	
	constructor(x, y) {
		this.posX = x;
		this.posY = y;
	}

	init() {
		this.domObj = document.querySelector('#krecik');
		this.domObj.style.width = '50px';
		this.domObj.style.height = '50px';
		this.domObj.style.backgroundColor = 'red';
		this.domObj.style.position = 'relative';
		this.domObj.style.top = this.posY + 'px';
		this.domObj.style.left = this.posX + 'px';
	}

	move (direction) {
		if (direction === 'down') {
			if (!this.isMovePossible('Y', this.posY + 50)) {
				return;
			}
			this.posY = this.posY + 50;
		}
		if (direction === 'up') {
			if (!this.isMovePossible('Y', this.posY - 50)) {
				return;
			}
			this.posY = this.posY - 50;
		}
		if (direction === 'right') {
			if (!this.isMovePossible('X', this.posX + 50)) {
				return;
			}
			this.posX = this.posX + 50;
		}
		if (direction === 'left') {
			if (!this.isMovePossible('X', this.posX - 50)) {
				return;
			}			
			this.posX = this.posX - 50;
		}
		this.domObj.style.top = this.posY + 'px';
		this.domObj.style.left = this.posX + 'px';
	}

	isMovePossible(os, val) {
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

}

const Kreciu = new Kretek(0,0);

window.addEventListener('DOMContentLoaded', (event) => {
    Kreciu.init();
});

document.addEventListener("keydown", event => {
	console.log(event.keyCode);
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


