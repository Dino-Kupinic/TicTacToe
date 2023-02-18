class Field {
	#color;

	constructor(generateColor) {
		this.#color = generateColor();
	}

	getColor() {
		return this.#color;
	}

	setColor(color) {
		this.#color = color;
	}
}

let grid = [];

window.onload = () => {
	createFields();
	styleFields();
	addEventListeners();
};

function convertTo2DArray(grid) {
	let arr = [];
	for (let i = 0; i < 3; i++) {
		let row = [];
		for (let j = 0; j < 3; j++) {
			row.push(grid[i * 3 + j]);
		}
		arr.push(row);
	}
	return arr;
}

function checkWin() {
	let fields = document.querySelectorAll(".field");
	let grid2D = convertTo2DArray(Array.from(fields));

	// create 2D array to loop through
	fields.forEach((field, index) => {
		let p = field.querySelector("p");
		let row = Math.floor(index / 3);
		let col = index % 3;
		grid2D[row][col] = p.textContent;
	});

	//check rows
	for (let i = 0; i < 3; i++) {
		if (grid2D[i][0] !== "" && grid2D[i][0] === grid2D[i][1] && grid2D[i][1] === grid2D[i][2]) {
			return grid2D[i][0];
		}
	}

	//check cols
	for (let j = 0; j < 3; j++) {
		if (grid2D[0][j] !== "" && grid2D[0][j] === grid2D[1][j] && grid2D[1][j] === grid2D[2][j]) {
			return grid2D[0][j];
		}
	}

	// check diagonals
	if (grid2D[0][0] === grid2D[1][1] && grid2D[1][1] === grid2D[2][2]) {
		return grid2D[0][0];
	}

	if (grid2D[0][2] === grid2D[1][1] && grid2D[1][1] === grid2D[2][0]) {
		return grid2D[0][2];
	}

	return false;
}

let count = 0;

function EventLogic(event) {
	let winnerText = document.querySelector("#winnerText");
	event.stopPropagation();
	placeCorrectSymbol(event.currentTarget.field);
	let outcome = checkWin();
	count++;
	if (count >= 3 && outcome != false) {
		winnerText.textContent = outcome + " has won!";
		disableEventListeners();
	}
}

function disableEventListeners() {
	let fields = document.querySelectorAll(".field");
	fields.forEach(field => {
		field.removeEventListener("click", EventLogic);
	});
}

function addEventListeners() {
	let fields = document.querySelectorAll(".field");
	fields.forEach(field => {
		field.addEventListener("click", EventLogic, {once: true});
		field.field = field;
	});
}

let player1Turn = true;

function placeCorrectSymbol(field) {
	const p = field.querySelector("p");
	if (player1Turn) {
		p.textContent = "X";
		player1Turn = false;
	} else {
		p.textContent = "O";
		player1Turn = true;
	}
}

const GRID_SIZE = 9;
function createFields() {
	for (let i = 0; i < GRID_SIZE; i++) {
		grid.push(new Field(generateColor));
	}
}

function styleFields() {
	const canvas = document.querySelector(".canvas");
	grid.forEach(field => {
		const div = document.createElement("div");
		div.setAttribute("class", "field");
		div.style.backgroundColor = field.getColor();
		createSymbolPlaceholder(div);
		canvas.appendChild(div);
	});
}

function createSymbolPlaceholder(div) {
	const paragraph = document.createElement("p");
	paragraph.setAttribute("class", "symbol");
	div.appendChild(paragraph);
}

function restartGame() {
	player1Turn = true;
	resetTextContents();
	addEventListeners();
	grid.forEach(field => {
		let divs = document.querySelectorAll(".field");
		divs.forEach(div => {
			field.setColor(generateColor());
			div.style.backgroundColor = field.getColor();
		})
	})
	console.log(grid)
}

function resetTextContents() {
	const fields = document.querySelectorAll(".field");
	fields.forEach(field => {
		let p = field.querySelector("p");
		p.textContent = "";
	});
	const winnerText = document.querySelector("#winnerText");
	winnerText.textContent = "‎";
}

function generateColor() {
	let randomColor = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
	let color;

	switch (randomColor) {
		case 1:
			color = "#D61355";
			break;
		case 2:
			color = "#F94A29";
			break;
		case 3:
			color = "#FCE22A";
			break;
		case 4:
			color = "#30E3DF";
			break;
		case 5:
			color = "#226F54";
			break;
	}
	return color;
}
