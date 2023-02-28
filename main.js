"use strict";

//import React from 'react';
//import ReactDOM from 'react-dom';

class MainElem extends React.Component {
	render() {
		return React.createElement(
			'div',
			{ className: 'mainContainer' },
			this.props.arr
		);
	}
};

var fQElem = { //квадрат
	rotated: 0,
	rotate0: [0, 0, 1, 0, 0, 1, 1, 1],
	rotate90: [0, 0, 1, 0, 0, 1, 1, 1],
	rotate180: [0, 0, 1, 0, 0, 1, 1, 1],
	rotate270: [0, 0, 1, 0, 0, 1, 1, 1],
	offset: [4, 6],

	rotate: function (nextEnbl) {
		let tmp;
		switch (this.rotated) {
			case 0:
				tmp = this.rotate90;
				if (nextEnbl) {
					this.rotated = 90;
				};
				break;
			case 90:
				tmp = this.rotate180;
				if (nextEnbl) {
					this.rotated = 180;
				};
				break;
			case 180:
				tmp = this.rotate270;
				if (nextEnbl) {
					this.rotated = 270;
				};
				break;
			case 270:
				tmp = this.rotate0;
				if (nextEnbl) {
					this.rotated = 0;
				};
				break;
		};
		return tmp;
	},

	firstFiger: function () {
		this.rotated = 0;
		return this.rotate0;
	}
};

var fTElem = { //Т
	__proto__: fQElem,
	rotate0: [0, 0, 1, 0, 2, 0, 1, 1],
	rotate90: [1, 0, 0, 1, 1, 1, 1, 2],
	rotate180: [1, 0, 0, 1, 1, 1, 2, 1],
	rotate270: [0, 0, 0, 1, 1, 1, 0, 2],
	offset: [3, 6]
};

var fIElem = { //линия
	__proto__: fQElem,
	rotate0: [0, 0, 0, 1, 0, 2, 0, 3],
	rotate90: [0, 0, 1, 0, 2, 0, 3, 0],
	rotate180: [0, 0, 0, 1, 0, 2, 0, 3],
	rotate270: [0, 0, 1, 0, 2, 0, 3, 0],
	offset: [4, 6]
};

var fZNElem = {
	__proto__: fQElem,
	rotate0: [1, 0, 0, 1, 1, 1, 0, 2],
	rotate90: [0, 0, 1, 0, 1, 1, 2, 1],
	rotate180: [1, 0, 0, 1, 1, 1, 0, 2],
	rotate270: [0, 0, 1, 0, 1, 1, 2, 1],
	offset: [4, 6]
};

var fSTElem = {
	__proto__: fQElem,
	rotate0: [0, 0, 0, 1, 1, 1, 1, 2],
	rotate90: [1, 0, 2, 0, 0, 1, 1, 1],
	rotate180: [0, 0, 0, 1, 1, 1, 1, 2],
	rotate270: [1, 0, 2, 0, 0, 1, 1, 1],
	offset: [4, 6]
};

var fLTElem = { //L
	__proto__: fQElem,
	rotate0: [0, 0, 0, 1, 0, 2, 1, 2],
	rotate90: [0, 0, 1, 0, 2, 0, 0, 1],
	rotate180: [0, 0, 1, 0, 1, 1, 1, 2],
	rotate270: [2, 0, 0, 1, 1, 1, 2, 1],
	offset: [4, 6]
};

var fJNElem = { // перевернутая L
	__proto__: fQElem,
	rotate0: [1, 0, 1, 1, 1, 2, 0, 2],
	rotate90: [0, 0, 0, 1, 1, 1, 2, 1],
	rotate180: [0, 0, 1, 0, 0, 1, 0, 2],
	rotate270: [0, 0, 1, 0, 2, 0, 2, 1],
	offset: [4, 6]
};

/*   main class   */

var glass = {
	figerMap: [fQElem, fTElem, fIElem, fZNElem, fSTElem, fLTElem, fJNElem],
	curColor: 0,
	curFiger: 0,
	arrFig: [],
	curState: [],
	glassElem: [],
	enblMovs: [true, true, true],
	downCnt: 0,
	xCntr: 0,
	rowCntr: 0,
	gameEnd: false,
	disMov: false,
	ddd: 0,

	startGame: function () {
		for (let i = 0; i < 200; i++) {
			glass.glassElem[i] = 0;
		};
		glass._newElem();
	},

	_newElem: function () {
		glass.curColor = Math.round(Math.random() * 15 + 1);
		glass.curFiger = glass.figerMap[Math.round(Math.random() * (glass.figerMap.length - 1))];
		glass.arrFig = glass.curFiger.firstFiger();
		glass.xCntr = glass.curFiger.offset[0];
		for (let i = 0; i < 4; i++) {
			glass.curState[i * 2] = glass.xCntr + glass.arrFig[i * 2];
			glass.curState[i * 2 + 1] = glass.arrFig[i * 2 + 1];
			if (glass.glassElem[glass.curState[i * 2] + glass.curState[i * 2 + 1] * 10] == 0) {
				glass.glassElem[glass.curState[i * 2] + glass.curState[i * 2 + 1] * 10] = glass.curColor;
			} else {
				glass.gameEnd = true;
				break;
			};
		};
		glass.downCnt = 0;
		glass._goToDom();
		glass._enblMoving();
	},

	gotoRight: function () {
		if (glass.enblMovs[1]) {
			glass.xCntr++;
			for (let i = 0; i < 4; i++) {
				glass.glassElem[glass.curState[i * 2] + glass.curState[i * 2 + 1] * 10] = 0;
			};
			for (let i = 0; i < 4; i++) {
				++glass.curState[i * 2];
				glass.glassElem[glass.curState[i * 2] + glass.curState[i * 2 + 1] * 10] = glass.curColor;
			};
			glass._goToDom();
			glass._enblMoving();
		};
	},

	gotoLeft: function () {
		if (glass.enblMovs[0]) {
			glass.xCntr--;
			for (let i = 0; i < 4; i++) {
				glass.glassElem[glass.curState[i * 2] + glass.curState[i * 2 + 1] * 10] = 0;
			};
			for (let i = 0; i < 4; i++) {
				--glass.curState[i * 2];
				glass.glassElem[glass.curState[i * 2] + glass.curState[i * 2 + 1] * 10] = glass.curColor;
			};
			glass._goToDom();
			glass._enblMoving();
		};
	},

	gotoDown: function () {
		if (glass.enblMovs[2]) {
			for (let i = 0; i < 4; i++) {
				glass.glassElem[glass.curState[i * 2] + glass.curState[i * 2 + 1] * 10] = 0;
			};
			for (let i = 0; i < 4; i++) {
				++glass.curState[i * 2 + 1];
				glass.glassElem[glass.curState[i * 2] + glass.curState[i * 2 + 1] * 10] = glass.curColor;
			};
			glass.downCnt++;
			glass._goToDom();
			glass._enblMoving();
		};
	},

	rotation: function () {
		let arrFig1 = glass.curFiger.rotate(false);
		let curState1 = glass.curState.slice();
		let glassElem1 = glass.glassElem.slice();
		let enblRot = true;
		for (let i = 0; i < 4; i++) {
			glassElem1[curState1[i * 2] + curState1[i * 2 + 1] * 10] = 0;
		};
		for (let i = 0; i < 4; i++) {
			if (glassElem1[glass.xCntr + arrFig1[i * 2] + (arrFig1[i * 2 + 1] + glass.downCnt) * 10] != 0) {
				enblRot = false;
				break;
			};
			if (glass.xCntr + arrFig1[i * 2] < 0 || glass.xCntr + arrFig1[i * 2] > 9) {
				enblRot = false;
				break;
			};
			if (arrFig1[i * 2 + 1] + glass.downCnt > 19 || arrFig1[i * 2 + 1] + glass.downCnt < 0) {
				enblRot = false;
				break;
			};
		};

		if (enblRot) {
			glass.arrFig = glass.curFiger.rotate(true);
			for (let i = 0; i < 4; i++) {
				glass.glassElem[glass.curState[i * 2] + glass.curState[i * 2 + 1] * 10] = 0;
			};
			for (let i = 0; i < 4; i++) {
				glass.curState[i * 2] = glass.xCntr + glass.arrFig[i * 2];
				glass.curState[i * 2 + 1] = glass.arrFig[i * 2 + 1] + glass.downCnt;
				glass.glassElem[glass.curState[i * 2] + glass.curState[i * 2 + 1] * 10] = glass.curColor;
			};
			glass._goToDom();
			glass._enblMoving();
		};
	},

	/*   react js  */
	_goToDom: function () {
		let tmp = [];
		for (let i = 0; i < 200; i++) {
			if (glass.glassElem[i] == 0) {
				tmp[i] = React.createElement(
					'div',
					{ className: 'noElem', key: i },
					' '
				);
			} else {
				tmp[i] = React.createElement(
					'div',
					{ className: 'Elem Elem' + glass.glassElem[i], key: i },
					' '
				);
			};
		};
		ReactDOM.render(React.createElement(MainElem, { arr: tmp }), document.getElementById("root"));
	},

	_enblMoving: function () {
		if (glass.disMov) {
			glass.enblMovs[0] = glass.enblMovs[1] = glass.enblMovs[2] = false;
		} else {
			glass.enblMovs[0] = glass.enblMovs[1] = glass.enblMovs[2] = true;
			let tmp = [];
			// влево
			for (let k = 0; k < 4; k++) {
				for (var t = 0; t < 4; t++) {
					if (glass.arrFig[t * 2 + 1] == k && (glass.curState[t * 2] < tmp[k * 2] || tmp[k * 2] === undefined)) {
						tmp[k * 2] = glass.curState[t * 2];
						tmp[k * 2 + 1] = glass.curState[t * 2 + 1];
					};
				};
			};
			for (let i = 0; i < tmp.length / 2; i++) {
				if (tmp[i * 2] === 0 || glass.glassElem[tmp[i * 2] + tmp[i * 2 + 1] * 10 - 1] !== 0) {
					glass.enblMovs[0] = false;
					break;
				};
			};

			//вправо
			tmp.length = 0;
			for (let k = 0; k < 4; k++) {
				for (var t = 0; t < 4; t++) {
					if (glass.arrFig[t * 2 + 1] == k && (glass.curState[t * 2] > tmp[k * 2] || tmp[k * 2] === undefined)) {
						tmp[k * 2] = glass.curState[t * 2];
						tmp[k * 2 + 1] = glass.curState[t * 2 + 1];
					};
				};
			};
			for (let i = 0; i < tmp.length / 2; i++) {
				if (tmp[i * 2] == 9 || glass.glassElem[tmp[i * 2] + tmp[i * 2 + 1] * 10 + 1] != 0) {
					glass.enblMovs[1] = false;
					break;
				};
			};

			//вниз
			tmp.length = 0;
			for (let k = 0; k < 4; k++) {
				for (var t = 0; t < 4; t++) {
					if (glass.arrFig[t * 2] == k && (glass.curState[t * 2 + 1] > tmp[k * 2 + 1] || tmp[k * 2] === undefined)) {
						tmp[k * 2] = glass.curState[t * 2];
						tmp[k * 2 + 1] = glass.curState[t * 2 + 1];
					};
				};
			};
			for (let i = 0; i < tmp.length / 2; i++) {
				if (tmp[i * 2] == 19 || glass.glassElem[tmp[i * 2] + tmp[i * 2 + 1] * 10 + 10] != 0) {
					glass.enblMovs[2] = false;
					break;
				};
			};
		};
	},

	checkRow: function () {
		let b;
		for (let i = 19; i >= 0; i--) {
			//alert(i);
			b = true;
			for (let k = 0; k < 10; k++) {
				if (glass.glassElem[i * 10 + k] == 0) {
					b = false;
					break;
				};
			};
			if (b) {
				glass.glassElem.splice(i * 10, 10);
				for (let t = 0; t < 10; t++) {
					glass.glassElem.unshift(0);
				};
				glass._goToDom();
				i = 20;
				glass.rowCntr++;
			};
		};
	},

	enMovDown: function () {
		return !glass.enblMovs[2];
	},

	checkGame: function () {
		return gameEnd;
	},

	setDisMov: function (enb) {
		glass.disMov = enb;
		glass._enblMoving();
	}
};

/* события */
let timeId;
let b1 = false;

window.onload = function () {
	document.getElementById("StartGame").onclick = function () {
		timeId = setTimeout(timeMoving, 1000);
	};

	document.getElementById("PauseGame").onclick = function () {
		clearTimeout(timeId);
	};

	document.getElementById("NewGame").onclick = function () {
		clearTimeout(timeId);
		glass.startGame();
		timeId = setTimeout(timeMoving, 2000);
	};

	//var isNew = confirm("Начать игру?");
	glass.startGame();
	timeId = setTimeout(timeMoving, 2000);
};

function timeMoving() {
	glass.gotoDown();
	if (glass.enMovDown()) {
		glass.checkRow();
		glass._newElem();
		b1 = false;
	} else {
		b1 = true;
	};
	timeId = setTimeout(timeMoving, 2000);
};

window.onkeydown = function (event) {
	switch (event.keyCode) {
		case 37:
			//влево
			glass.gotoLeft();
			break;
		case 38:
			//вверх
			glass.rotation();
			break;
		case 39:
			//вправо
			glass.gotoRight();
			break;
		case 40:
			//вниз
			glass.gotoDown();
			break;
		case 32:

			break;
	};
};