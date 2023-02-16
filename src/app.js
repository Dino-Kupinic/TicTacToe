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
}

function convertTo2DArray() {
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
    let grid2D = convertTo2DArray();
}

function addEventListeners() {
    let fields = document.querySelectorAll(".field");
    fields.forEach(field => {
        field.addEventListener("click", event => {
            event.stopPropagation();
            placeCorrectSymbol(field);
            checkWin();
        }, {once : true});
    });
}

let player1Turn = true;

function placeCorrectSymbol(field) {
    let p = field.querySelector("p");
    if (player1Turn) {
        p.textContent = "X";
        player1Turn = false;
    } else {
        p.textContent = "O";
        player1Turn = true;
    }
}


function createFields() {
    const GRID_SIZE = 9;
    for (let i = 0; i < GRID_SIZE; i++) {
        grid.push(new Field(generateColor));
    }
}

function styleFields() {
    let canvas = document.querySelector(".canvas");
    grid.forEach(field => {
        let div = document.createElement("div");
        div.setAttribute("class", "field");
        div.style.backgroundColor = field.getColor();
        createSymbolPlaceholder(div);
        canvas.appendChild(div);
    });
}

function createSymbolPlaceholder(div) {
    let paragraph = document.createElement("p");
    paragraph.setAttribute("class", "symbol");
    div.appendChild(paragraph);
}

function restartGame() {
    let fields = document.querySelectorAll(".field");
    fields.forEach(field => {
        let p = field.querySelector("p");
        p.textContent = "";
    });
    player1Turn = true;
    addEventListeners();
    //TODO: Fix bug when clicking Restart multiple times
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
