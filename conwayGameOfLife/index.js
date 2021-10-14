//utils
var px = function (number) { return number + 'px'; };
function get(className) {
    return document.querySelector('.' + className);
}
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.init = function () {
        this.observeStart();
        Field.create();
    };
    Game.observeStart = function () {
        var _this = this;
        this.startButton.addEventListener('click', function () {
            _this.start();
        });
    };
    Game.stop = function () {
        clearInterval(this.loop);
        this.isRunning = false;
        Field.cells.forEach(function (cell) { return cell.element.style.boxShadow = '-1px -1px 0 #000'; });
        alert("GAME OVER");
        // this.startButton.addEventListener('click', () => {
        //     this.start()
        // })
        // this.startButton.textContent = 'start'
        this.startButton.style.display = 'block';
    };
    Game.start = function () {
        // this.startButton.addEventListener('click', () => {
        //     this.stop()
        // })
        // this.startButton.textContent = 'stop'
        var _this = this;
        this.startButton.style.display = 'none';
        this.isRunning = true;
        Field.cells.forEach(function (cell) { return cell.element.style.boxShadow = 'none'; });
        this.loop = setInterval(function () {
            if (Field.getAliveCells() > 0) {
                _this.step();
            }
            else {
                _this.stop();
            }
        }, this.SPEED);
    };
    Game.step = function () {
        var snapshot = JSON.parse(JSON.stringify(Field.cells));
        Field.cells.forEach(function (cell, index) {
            var getNeighbour = function (offset) { return snapshot[index - offset]; };
            var p = Field.getCellsPerColumn();
            var neighborsPattern = [1, -1, p, p - 1, p + 1, -p, -p - 1, -p + 1];
            var neighbors = neighborsPattern.map(function (offset) { return getNeighbour(offset); });
            var neighborsPopulation = neighbors.filter(function (neighbor) {
                return neighbor === null || neighbor === void 0 ? void 0 : neighbor.__service__alive;
            }).length;
            if (neighborsPopulation === 3) {
                cell.alive = true;
            }
            else if (neighborsPopulation < 2 || neighborsPopulation > 3) {
                cell.alive = false;
            }
        });
    };
    Game.SPEED = 60;
    Game.isRunning = false;
    Game.startButton = get('start');
    return Game;
}());
var Field = /** @class */ (function () {
    function Field() {
    }
    Field.getAliveCells = function () {
        return this.cells.filter(function (cell) { return cell.alive; }).length;
    };
    Field.getCellsPerColumn = function () {
        return Math.round(this.width / this.ITEM_SIZE);
    };
    Field.getFieldArea = function () {
        return this.getCellsPerColumn() * Math.round(this.height / this.ITEM_SIZE);
    };
    Field.create = function () {
        var fieldArea = this.getFieldArea();
        for (var index = 0; index < fieldArea + fieldArea * 0.1; index++) {
            var cell = new Cell(index);
            var style = cell.element.style;
            style.width = px(this.ITEM_SIZE);
            style.height = px(this.ITEM_SIZE);
            this.element.append(cell.element);
            this.cells.push(cell);
        }
    };
    Field.width = window.innerWidth;
    Field.height = window.innerHeight;
    Field.element = get('main');
    Field.ITEM_SIZE = 15;
    Field.cells = [];
    return Field;
}());
var Cell = /** @class */ (function () {
    function Cell(index) {
        var _this = this;
        this.element = document.createElement('div');
        this.__service__alive = false;
        this.aliveColor = 'purple';
        this.deadColor = '#fff';
        this.index = index;
        this.element.addEventListener('click', function () {
            if (!Game.isRunning) {
                _this.alive = !_this.alive;
            }
        });
        this.element.addEventListener('mouseover', function (e) {
            if (!Game.isRunning && e.shiftKey) {
                _this.alive = true;
            }
        });
    }
    Object.defineProperty(Cell.prototype, "alive", {
        get: function () {
            return this.__service__alive;
        },
        set: function (value) {
            this.__service__alive = value;
            this.element.style.background = value ? this.aliveColor : this.deadColor;
        },
        enumerable: false,
        configurable: true
    });
    return Cell;
}());
Game.init();
