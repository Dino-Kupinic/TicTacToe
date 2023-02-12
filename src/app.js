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

window.onload = () => {
    let grid = [];
    createFields(grid);
    styleFields(grid);
    addEventListeners();
}

function addEventListeners() {
    let fields = document.querySelectorAll(".field");
    fields.forEach(field => {
        field.addEventListener("click", event => {
            event.stopPropagation();
            field.style.backgroundColor = "purple";
        });
    });
}

function createFields(grid) {
    const GRID_SIZE = 9;
    for (let i = 0; i < GRID_SIZE; i++) {
        grid.push(new Field(generateColor));
    }
}

function styleFields(grid) {
    let canvas = document.querySelector(".canvas");
    grid.forEach(field => {
        let div = document.createElement("div");
        div.setAttribute("class", "field");
        div.style.width = "90px";
        div.style.height = "90px";
        div.style.float = "left";
        div.style.margin = "5px";
        div.style.backgroundColor = field.getColor();
        createSymbolPlaceholder(div);
        canvas.appendChild(div);
    })
}

function createSymbolPlaceholder(div) {
    let paragraph = document.createElement("p");
    paragraph.setAttribute("class", "symbol");
    paragraph.textContent = "X";
    div.appendChild(paragraph);
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