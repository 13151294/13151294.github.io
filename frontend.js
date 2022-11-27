var tool = 0;
var flagCount = 0;
function start() {
    // add board
    createBoard()
    // add keyblinding
    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case '1':
                toolSelection(0);
                break;
            case '2':
                toolSelection(1);
                break;
            case '3':
                toolSelection(2);
                break;
            default:
                break;
        }
    });
}
function createBoard() {
    let boardhtml = document.getElementById("board");
    boardhtml.replaceChildren();
    for (let i = 0; i < Math.pow(boardSize, 2); i++) {
        //set board setting
        boardhtml.style.gridTemplateColumns = "auto ".repeat(boardSize)
        document.documentElement.style.setProperty("--nodeSize", 64 / boardSize + "vmin")

        let x = Math.floor(i / boardSize);
        let y = i % boardSize;
        let node = document.createElement("button");
        node.id = "node(" + x + "," + y + ")";
        node.className = "node";
        node.type = "button";
        node.addEventListener('click', () => {nodeClicked(x, y)});
        //add function to click to button
        boardhtml.appendChild(node);
        let icon = document.createElement("i");
        icon.className = "fa fa-flag";
        node.appendChild(icon);
    }
    //add board
    for (let i = 0; i < boardSize; i++) {
        board.push([])
        boardWall.push([])
        for (let j = 0; j < boardSize; j++) {
            board[i].push(0)
            boardWall[i].push(0)
        }
    }
}
function updateBoard() {
    document.getElementsByName("blocks").forEach(element => {
        if (element.checked) {
            boardSize = parseInt(element.value);
        }
    });
    flagCount = 0;
    createBoard();
    document.getElementById("setting-panel").className = "disable";
    document.getElementById("setting").className = "tool-item disable";
}
function nodeClicked(x, y) {
    let node = document.getElementById("node(" + x + "," + y + ")");
    if (node.classList.contains("flag")) {flagCount = flagCount - 1;}
    node.className = "node";
    switch (tool) {
        case 0:
            node.classList.add("wall");
            boardWall[y][x] = 1;
            break;
        case 1:
            if (flagCount < 2) {
                node.classList.add("flag");
                flagCount = flagCount + 1;
            }
            boardWall[y][x] = 2;
            break;
        case 2:
            boardWall[y][x] = 0;
            break;
    }
}
function toolSelection(num) {
    tool = num;
    let idTool = "blank"
    switch (num) {
        case 0:
            idTool = "wall";
            break;
        case 1:
            idTool = "flag";
            break;
        case 2:
            idTool = "eraser";
            break;
    }
    //set choose tool bg and icon color to selected color
    let tools = document.getElementsByClassName("tool-item")
    for (let index = 0; index < tools.length; index++) {
        let selectedTool = tools[index]
        selectedTool.classList.remove("enable")
        selectedTool.classList.add("disable")
    }
    //set choose tool bg and icon color to selected color
    let selectedTool = document.getElementById(idTool)
    selectedTool.classList.remove("disable")
    selectedTool.classList.add("enable")
}
function setting() {
    let panelClass = document.getElementById("setting-panel");
    let setting = document.getElementById("setting");
    console.log(panelClass)
    switch (panelClass.className) {
        case "enable":
            panelClass.className = "disable";
            setting.className = "tool-item disable";
            break;
        case "disable":
            panelClass.className = "enable";
            setting.className = "tool-item enable";
            break;
    }
}
function run() {
    let tools = document.getElementById("tool")
    
    tools.className = "disable"
    tools.innerHTML = ''

    document.getElementById("play").classList.add("disable")
    document.getElementById("restart").classList.remove("disable")
}