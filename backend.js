var boardSize = 4;
var board = [];
var boardWall = [];
var flagCountGame = 0;
var connect = []

//when click run button gonna run this command
function play(){
    for (let y = 0; y < boardWall.length; y++) {
        if (!boardWall[y].includes(2)) {
            continue;
        }
        for (let x = 0; x < boardWall[y].length; x++) {
            if (boardWall[y][x] == 2) {
                connect.push([y, x])
            }
        }
    }

    if (connect.length != 2) {
        return
    }    

    let start = connect[0]
    let end = connect[1]
    let closeNode = []
    let openNode = []
    let currentNode = new node(start, 1, 0)
    let i = 0;
    while (!(currentNode.pos()[0] == end[0] && currentNode.pos()[1] == end[1])) {
        console.log(i)
        i++
        board[currentNode.pos()[0]][currentNode.pos()[1]] = currentNode.value

        for (let y = -1; y < 2; y++) {
            for (let x = -1; x < 2; x++) {
                let pos = [currentNode.pos()[0] + y, currentNode.pos()[1] + x]
                if ([-2, 0, 2].includes(x + y)) {
                    continue
                }
                if (!((pos[0] >= 0 && pos[0] < boardSize) && (pos[1] >= 0 && pos[1] < boardSize))) {
                    continue
                }
                if ((openNode.find((x) => x.pos()[0] == pos[0] && x.pos()[1] == pos[1]) || closeNode.find((x) => x.pos()[0] == pos[0] && x.pos()[1] == pos[1]))) {
                    continue
                }
                if (boardWall[pos[0]][pos[1]] == 1) {
                    continue
                }
                let dirNode = new node(pos, currentNode.value + 1, currentNode)
                openNode.push(dirNode)
            }
        }

        closeNode.push(currentNode)
        if (openNode.length == 0){
            document.getElementById("header").innerHTML = "DEAD END"
            return
        }
        currentNode = openNode.shift()
    }
    let backtrackingPath = currentNode.backtrack()
    console.table(backtrackingPath)
    backtrackingPath.forEach(path => {
        let id = "node(" + path[1] + "," + path[0] + ")"
        document.getElementById(id).classList.add("path")
    })
}

//node for each path in maze
class node {
    
    constructor (pos, value, parent) {
        this.x = pos[0]
        this.y = pos[1]
        this.value = value
        this.parent = parent
    }
    pos() {
        return [this.x, this.y]
    }
    backtrack() {
        let path = []
        let currentNode = this
        let running = true
        while (running) {
            running = currentNode.parent != 0

            path.push(currentNode.pos())
            
            currentNode = currentNode.parent
        }

        return path
    }
}