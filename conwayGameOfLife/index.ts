//utils
const px = (number: number) => number + 'px'
function get<T extends Element>(className: string) {
    return document.querySelector<T>('.' + className)
}

abstract class Game {
    static SPEED = 60
    static isRunning = false
    static loop: ReturnType<typeof setInterval>
    static startButton = get<HTMLButtonElement>('start')

    static init() {
        this.observeStart()
        Field.create()
    }

    static observeStart() {
        this.startButton.addEventListener('click', () => {
            this.start()
        })
    }

    static stop() {
        clearInterval(this.loop)
        this.isRunning = false
        Field.cells.forEach(cell => cell.element.style.boxShadow = '-1px -1px 0 #000')
        alert("GAME OVER")

        // this.startButton.addEventListener('click', () => {
        //     this.start()
        // })
        // this.startButton.textContent = 'start'

        this.startButton.style.display = 'block'
    }

    static start() {
        // this.startButton.addEventListener('click', () => {
        //     this.stop()
        // })
        // this.startButton.textContent = 'stop'

        this.startButton.style.display = 'none'

        this.isRunning = true
        Field.cells.forEach(cell => cell.element.style.boxShadow = 'none')

        this.loop = setInterval(() => {
            if(Field.getAliveCells() > 0) {
                this.step()
            }
            else {
                this.stop()
            }
        }, this.SPEED)
    }

    static step() {
        const snapshot = JSON.parse(JSON.stringify(Field.cells))

        Field.cells.forEach((cell, index) => {
            const getNeighbour = (offset) => snapshot[index - offset]
            const p = Field.getCellsPerColumn()

            const neighborsPattern = [1, -1, p, p - 1, p + 1, -p, -p - 1, -p + 1]
            const neighbors = neighborsPattern.map(offset => getNeighbour(offset))
            const neighborsPopulation = neighbors.filter(neighbor => {
                return neighbor?.__service__alive
            }).length

            if(neighborsPopulation === 3) {
                cell.alive = true
            }
            else if(neighborsPopulation < 2 || neighborsPopulation > 3) {
                cell.alive = false
            }
        })
    }
}

abstract class Field {
    static width = window.innerWidth
    static height = window.innerHeight

    static element = get('main')
    static ITEM_SIZE = 15

    static cells: Cell[] = []

    static getAliveCells() {
        return this.cells.filter(cell => cell.alive).length
    }

    static getCellsPerColumn() {
        return Math.round(this.width / this.ITEM_SIZE)
    }

    static getFieldArea() {
        return this.getCellsPerColumn() * Math.round(this.height / this.ITEM_SIZE)
    }

    static create() {
        const fieldArea = this.getFieldArea()
        for(let index = 0; index < fieldArea + fieldArea * 0.1; index++) {
            const cell = new Cell(index);
            const {style} = cell.element
            style.width = px(this.ITEM_SIZE)
            style.height = px(this.ITEM_SIZE)

            this.element.append(cell.element)
            this.cells.push(cell)
        }
    }
}


class Cell {
    element = document.createElement('div')
    private __service__alive = false;
    aliveColor = 'purple'
    deadColor = '#fff'

    get alive() {
        return this.__service__alive
    }
    set alive(value) {
        this.__service__alive = value
        this.element.style.background = value ? this.aliveColor : this.deadColor
    }

    index: number;

    constructor(index: number) {
        this.index = index;

        this.element.addEventListener('click', () => {
            if(!Game.isRunning) {
                this.alive = !this.alive
            }
        })

        this.element.addEventListener('mouseover', (e) => {
            if(!Game.isRunning && e.shiftKey) {
                this.alive = true
            }
        })
    }
}

Game.init()
