

const lerp = (a, b, t) =>{
    return a + (b - a) * t
}

const Rand = (min = 0, max = 1) => { 
    return Math.floor(Math.random() * (max - min)) + min
}

class Color { 
    constructor(r = 1, g = 1, b = 1, a = 1){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        this._initState = [this.r, this.g, this.b, this.a]
    }

    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})` 
    }

    initState() {
        return new Color(this._initState[0], this._initState[1], this._initState[2], this._initState[3])
    }

    copy(){
        return new Color(this.r, this.g, this.b, this.a);
    }

    static lerpColors(colorA, colorB, alpha){
        let r = lerp(colorA.r, colorB.r, alpha)
        let g = lerp(colorA.g, colorB.g, alpha)
        let b = lerp(colorA.b, colorB.b, alpha)
        let a = lerp(colorA.a, colorB.a, alpha)
        return new Color(r, g, b, a);
    }

    static isColorsEqual(colorA, colorB){
        if(colorA.r != colorB.r) return false;
        if(colorA.g != colorB.g) return false;
        if(colorA.b != colorB.b) return false;
        if(colorA.a != colorB.a) return false;
        return true
    }

    isEqual(colorB){
        if(this.r  <= colorB.r * 0.9) return false;
        if(this.g  <= colorB.g * 0.9) return false;
        if(this.b  <= colorB.b * 0.9) return false;
        if(this.a  <= colorB.a * 0.9) return false;
        return true
    }
}

let blackColor = new Color(0, 0, 0, 0);
let whiteColor = new Color(255, 255, 255, 1);

class Cell {
    constructor(data ={
        position : [0, 0], 
        size : 20, 
        useColor : false, 
        interactive : true, 
        relative : false
    }){

        this.state = 0;
        this.prevState = 0;
        this.id = 0;
        this.pos = data.position;
        this.borderColor = new Color()
        this.staticColor =  new Color(Rand(0, 255), Rand(0, 255), Rand(0, 255))
        this.aliveColor = new Color(Rand(0, 255), Rand(0, 255), Rand(0, 255), 0.875)
        if(data.position == undefined) data.position = [0, 0];
        if(data.size == undefined) data.size = 20;
        if(data.useColor == undefined) data.useColor = false;
        if(data.interactive == undefined) data.position = true;
        if(data.relative == undefined) data.relative = false;
        this.useColor = data.useColor;
        this.size = data.size;
        this.body =  document.createElement('div');
        this.body.style.left = `${(data.position[0] * this.size)}px`;
        this.body.style.top = `${(data.position[1] * this.size)}px`;
        if(this.useColor){
            this.color = this.state == 0 ? blackColor : this.aliveColor
        }
        else { 
            this.color = this.state == 0 ? blackColor : whiteColor
        }
        this.body.style.zIndex = "10000000"
        if(data.relative){
            this.body.style.gridColumn = data.position[0] + 1;
            this.body.style.gridRow = data.position[1] + 1;
        }
        else { 
            this.body.style.position = 'absolute'
        }

        this.body.style.width = `${this.size}px`
        this.body.style.height = `${this.size}px`
        this.aliveNeighbors = 0;
        this.body.style.backgroundColor = this.color.toString()

        if(data.interactive){
            this.body.addEventListener('click', () => {
                this.state = this.state == 1 ? 0 : 1;
                if(this.useColor){
                    this.color = this.state == 0 ? blackColor : this.aliveColor;
                }
                else { 
                    this.color = this.state == 0 ? blackColor : whiteColor
                }
                this.body.style.backgroundColor = this.color.toString()
            })
        }
    }
}

class Grid { 
    constructor(data = {
        width : 20, 
        height : 20,
        fps : 10, 
        useAlpha : false,
        useColor : false,
        infinite : false, 
        cellSize : 20, 
        generationLimit : 30, 
        interactiveCells : true,
        interactive : false,
        repeatAfter : 0,
        initCells : [], 
        offset : [0, 0],
        relativeObject : "", 
        label : "", 
        useBorders : false, 
        borderColor : new Color(255, 255, 255, 0.5),
        random : false,
        spread : false,
         
    }){
        if(data.width == undefined) data.width = 20;
        if(data.height == undefined) data.height = 20;
        if(data.useBorders == undefined) data.useBorders = false;
        if(data.borderColor == undefined) data.borderColor = new Color(255, 255, 255, 0.5);
        if(data.fps == undefined) data.fps = 10;
        if(data.useColor == undefined) data.useColor = false;
        if(data.useAlpha == undefined) data.useAlpha = false;
        if(data.cellSize == undefined) data.cellSize = 20;
        if(data.infinite == undefined) data.infinite = false;
        if(data.generationLimit == undefined) data.generationLimit = 30;
        if(data.interactiveCells == undefined) data.interactiveCells = true;
        if(data.interactive == undefined) data.interactive = false;
        if(data.repeatAfter == undefined) data.repeatAfter = 0;
        if(data.initCells == undefined) data.initCells = [];
        if(data.offset == undefined) data.offset = [0, 0];
        if(data.relativeObject == undefined) data.relativeObject =  "";
        if(data.label == undefined) data.label =  "";
        if(data.random == undefined) data.random =  false;
        if(data.spread == undefined) data.spread =  false;


        this.pause = false;
        this.cellItterator = 0;
        this.borderCells = [];
        this.currentBorderCell = 0;
        this.useBorderColor = true
        this.cells = [];
        this.fpsInterval = 1000 / data.fps;
        this.startTime;
        this.spread = data.spread;
        this.now;
        this.then;
        this.elapsed;
        this.generation = 0;
        this.cellSize = data.cellSize;
        this.offset = data.offset;
        this.width = data.width;
        this.height = data.height;
        this.generationLimit = data.generationLimit;
        this.repeatAfter = data.repeatAfter;
        this.repeat = data.repeatAfter > 0;
        this.fps = data.fps;
        this.useAlpha = data.useAlpha;
        this.useColor = data.useColor;

        this.useBorders = data.useBorders;
        this.borderColor = data.borderColor;
        this.infinite = data.infinite;
        this.interactiveCells = data.interactiveCells;
        this.interactive = data.interactive;
        this.relativeObject = document.getElementById(data.relativeObject);
        this.relative = this.relativeObject != undefined;
        this.label = data.label;
        this.hasLabel = data.label.length > 0;
        this.random = data.random;
        this.gridObject = this.relative ? this.relativeObject.appendChild(document.createElement('div')) : document.body;
        if(this.relative){
            if(this.interactive) this.gridObject.tabIndex = "0"
            this.relativeObject.style.alignText = "center"
            this.gridObject.style.justifyContent = "center"
            this.gridObject.style.display = 'grid'
            this.gridObject.style.gridTemplateColumns = `repeat(${this.width } , ${this.cellSize}px)`
            this.gridObject.style.gridTemplateRows = `repeat(${this.height} , ${this.cellSize}px)`
        }
        if(this.hasLabel){
            let text = document.createElement('div');
            text.class = "label"
            text.innerHTML = this.label;
            text.style.marginTop = "5px"
            text.style.fontWeight = "bold"

            if(this.relative) this.relativeObject.appendChild(text)
            else document.body.appendChild(text);
        }

        this.count = 0;
        this.playing = true;
        this.initCells = data.initCells;
        for(let x = 0; x < this.width; x++){
            for(let y = this.height - 1; y >= 0; y--){
                const cell = new Cell({
                    position : [x, y], size : this.cellSize, useColor : this.useColor, interactive : this.interactiveCells, relative: this.relative})
                cell.id = this.cells.length;
                this.cells.push(cell)
                if(this.useBorders)
                {
                    if(x == 0 && y == 0){
                        cell.body.style.borderLeft = `solid ${this.borderColor.toString()} 1px`
                        cell.body.style.borderTop = `solid ${this.borderColor.toString()} 1px`
                        cell.bordercolor = this.borderColor;
                    }
                    else if(x == 0 && y == this.height - 1){
                        cell.body.style.borderLeft = `solid ${this.borderColor.toString()} 1px`
                        cell.bordercolor = this.borderColor;
                        cell.body.style.borderBottom = `solid ${this.borderColor.toString()} 1px`
                    }
                    else if(y == this.height - 1 && x == this.width -1){
                        cell.body.style.borderRight = `solid ${this.borderColor.toString()} 1px`
                        cell.bordercolor = this.borderColor;
                        cell.body.style.borderBottom = `solid ${this.borderColor.toString()} 1px`
                    }
                    else if(x == this.width -1 && y == 0){ 
                        cell.body.style.borderRight = `solid ${this.borderColor.toString()} 1px`
                        cell.bordercolor = this.borderColor;
                        cell.body.style.borderTop = `solid ${this.borderColor.toString()} 1px`
                    }
                    else if(x == this.width -1){
                        cell.bordercolor = this.borderColor;
                        cell.body.style.borderRight = `solid ${this.borderColor.toString()} 1px`
                    }
                    else if(x == 0){
                        cell.body.style.borderLeft = `solid ${this.borderColor.toString()} 1px`
                        cell.bordercolor = this.borderColor;
                    }
                    else if(y == this.height - 1){
                        cell.bordercolor = this.borderColor;
                        cell.body.style.borderBottom = `solid ${this.borderColor.toString()} 1px`
                    }
                    else if(y == 0){ 
                        cell.body.style.borderTop = `solid ${this.borderColor.toString()} 1px`
                        cell.bordercolor = this.borderColor;
                    }
                }

                this.gridObject.appendChild(cell.body)
                if(this.spread){
                    if(Rand(0, 100) > 50 && (x < Math.floor(this.width * 0.2) || x >  Math.floor(this.width * 0.8))){
                        cell.state = 1;
                        console.log(cell.state);
                    }
    
                }
            }

        }
        if(this.interactive){
            document.addEventListener('keydown', function(event){
                if(this.gridObject == document.activeElement){
                    if(event.key == "p") this.pause = !this.pause;
                    if(event.key == "r") this.randomize();
                    if(event.key == "c") this.useColor = !this.useColor;
                    if(event.key == "a") this.useAlpha = !this.useAlpha;
                    if(event.key == "v") this.clear()
                }
            }.bind(this))
        }

        this.highlightColor = new Color(Rand(0, 255), Rand(0, 255), Rand(0, 255), 0.875)
        
        if(this.random) this.randomize()

        for(let i = this.cells.length - 1; i >= 0; i--){
            if(this.cells[i].pos[0] == 0 && this.cells[i].pos[1] == 0){
                this.borderCells.push(this.cells[i].id)
            }
            else if(this.cells[i].pos[0] == 0 && this.cells[i].pos[1] != this.height - 1 && this.cells[i].pos[1] != 0){
                this.borderCells.push(this.cells[i].id)
            }
        }

        for(const cell of this.cells){
            if(cell.pos[0] == 0 && cell.pos[1] == this.height - 1){
                this.borderCells.push(cell.id)
            }
            else if(cell.pos[1] == this.height - 1 && cell.pos[0] != 0 && cell.pos[0] != this.width -1){
                this.borderCells.push(cell.id)
            }
        }

        for(const cell of this.cells){
            if(cell.pos[0] == this.width - 1 && cell.pos[1] == this.height - 1){
                this.borderCells.push(cell.id)
            }
            else if(cell.pos[0] == this.width - 1 && cell.pos[1] != 0 && cell.pos[1] != this.height - 1){
                this.borderCells.push(cell.id)
            }
        }
        for(let i = this.cells.length - 1; i >= 0; i--){
            if(this.cells[i].pos[0] == this.width - 1 && this.cells[i].pos[1] == 0){
                this.borderCells.push(this.cells[i].id)
            }
            else if(this.cells[i].pos[1] == 0 && this.cells[i].pos[0] != 0 && this.cells[i].pos[0] != this.width - 1){
                this.borderCells.push(this.cells[i].id)
            }
        }
    }

 checkNeighbor(){ 
    const RIGHT = this.height;
    const LEFT = -this.height;
    const TOP = -1;
    const BOTTOM = 1;
    for(const cell of this.cells){
        cell.aliveNeighbors = 0;
        cell.prevState = cell.state;
        const hasLeft = cell.id > (this.height - 1);
        const hasRight = cell.id < (this.cells.length - this.height);
        const hasTop = cell.id % this.height != 0;
        const hasBottom = (cell.id + 1) % this.height != 0;

        if(hasLeft){
            cell.aliveNeighbors += this.cells[cell.id + LEFT].state;
        }
        if(hasRight){
            cell.aliveNeighbors += this.cells[cell.id + RIGHT].state;
        }
        if(hasTop){
            cell.aliveNeighbors += this.cells[cell.id + TOP].state;
        }
        if(hasBottom){
            cell.aliveNeighbors += this.cells[cell.id + BOTTOM].state;
        }

        if(hasTop && hasLeft){
            cell.aliveNeighbors += this.cells[cell.id + TOP + LEFT].state;
        }
        if(hasTop && hasRight){
            cell.aliveNeighbors += this.cells[cell.id + TOP + RIGHT].state;
        }
        if(hasBottom && hasLeft){
            cell.aliveNeighbors += this.cells[cell.id + BOTTOM + LEFT].state;
        }
        if(hasBottom && hasRight){
            cell.aliveNeighbors += this.cells[cell.id + BOTTOM + RIGHT].state;
        }
        }
    }

    MainLoop(){ 
    if(!this.infinite){
        if(this.generation == Math.floor(this.generationLimit / 2)) this.toggleColor();
        if(this.generation == this.generationLimit) this.clear();
        if(this.generation == this.generationLimit + 5) this.fullClear();
    }else{
        if(this.repeat){
            if(this.generation % this.repeatAfter == 0){
                this.clear()
                if(this.random) this.randomize();
                else for(const id of this.initCells) this.cells[id].state = 1
            }
            if(this.generation % (this.borderCells.length + 1) == 0){
                this.toggleBorderColor()
            }
        }
    }

    this.checkNeighbor()

    for(const cell of this.cells){
        if(!this.pause){
            if(cell.aliveNeighbors == 2){
            }
            else if(cell.aliveNeighbors == 3){
                cell.state = 1
            }
            else {
                cell.state = 0
            }
        }
        
        if(this.useColor){
            if (cell.state == 0) {
                let alpha = this.useAlpha ? 0.25 * 0.25 * (3 - 2 * 0.25) : 1.0;
                cell.color = Color.lerpColors(cell.color, blackColor, alpha)
                cell.body.style.backgroundColor = cell.color.toString()
            }
            else if(cell.prevState == 0 && cell.state == 1){
                let alpha = this.useAlpha ? 0.5 * 0.5 * (3 - 2 * 0.5) : 1.0;
                cell.color = Color.lerpColors(cell.color, this.cells[this.cellItterator].aliveColor, alpha)
                cell.body.style.backgroundColor = cell.color.toString()
            }
            else if(cell.prevState == 1 && cell.state == 1){
                cell.color = Color.lerpColors(cell.color, this.cells[this.cellItterator].staticColor, this.useAlpha ? 0.25 : 1.0)
                cell.body.style.backgroundColor = cell.color.toString()
            }
        }
        else { 
          if(cell.state == 1){
                let alpha = this.useAlpha ? 0.1 : 1.0;
                cell.color = Color.lerpColors(cell.color, whiteColor, alpha)
                cell.body.style.backgroundColor = cell.color.toString()

          }else { 
                let alpha = this.useAlpha ? 0.25 * 0.25 * (3 - 2 * 0.25) : 1.0;

                cell.color = Color.lerpColors(cell.color, blackColor, alpha)
                cell.body.style.backgroundColor = cell.color.toString()
          }

          
          
        }
    }

    if(this.useBorders){
        let cell = this.cells[this.borderCells[this.currentBorderCell]]
        if(this.currentBorderCell == 0){
            cell = this.cells[this.borderCells[0]]
        }   
        else if(this.currentBorderCell == this.borderCells.length){
            cell = this.cells[this.borderCells[0]]
        }
        if(cell){
            if(this.currentBorderCell == 0){
                let alpha = this.useAlpha ? 0.25 * 0.25 * (3 - 2 * 0.25) : 1.0;
                cell.borderColor = Color.lerpColors(cell.borderColor, this.highlightColor, alpha);
                cell.body.style.borderLeftColor = cell.borderColor.toString()
            }
            else if(this.currentBorderCell == this.borderCells.length){
                let alpha = this.useAlpha ? 0.25 * 0.25 * (3 - 2 * 0.25) : 1.0;
                cell.borderColor = Color.lerpColors(cell.borderColor, this.highlightColor, alpha);
                cell.body.style.borderTopColor = cell.borderColor.toString()
      
            }
            else { 
                let alpha = this.useAlpha ? 0.25 * 0.25 * (3 - 2 * 0.25) : 1.0;
                cell.borderColor = Color.lerpColors(cell.borderColor, this.highlightColor, alpha);
                cell.body.style.borderColor = cell.borderColor.toString()
            }
            if(this.currentBorderCell == this.borderCells.length) this.currentBorderCell = 0;
            else this.currentBorderCell++;
        }
    }
        this.generation +=1;
    }

  

    toggleColor(){
        this.useColor = !this.useColor;
        for(const cell of this.cells)cell.useColor = this.useColor;
    }

    toggleBorderColor(){
        this.highlightColor = new Color(Rand(0, 255), Rand(0, 255), Rand(0, 255), 0.875)
    }


    clear(){ 
        for(const cell of this.cells) cell.state = 0;
    }

    randomize() {
        for(const cell of this.cells) 
        {
            cell.state = Rand(0, 100) > 75 ? 1 : 0
            if(cell.state == 1) {this.initCells.push(cell.id)}

        }

        this.cellItterator = this.cellItterator + 1 == this.cells.length ? 0 : this.cellItterator + 1;
    }

    fullClear(){ 
        for(const cell of this.cells){
            this.gridObject.removeChild(cell.body)
            this.playing = false;
    }
    }

    startAnimating(){
        this.then = Date.now();
        this.startTime = this.then;
        this.animate();
    }

    animate(){
        if(this.playing) requestAnimationFrame(this.animate.bind(this));

        this.now = Date.now();
        this.elapsed = this.now - this.then;
        if (this.elapsed > this.fpsInterval) {

            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.MainLoop()
    }
    }

    static to(type, data){
        let grid;
        let alive;
        let newData;
        let label;
        switch (type){
            case "block":
                label = "Block";
                let width = 4, height = 4
                alive = [
                    5, 6, 9, 10
                ]
                


                newData = {...data, ...{width, height , initCells : alive, label}}
                grid = new Grid(newData)
                
                break;
            case "beehive":
                label = "Beehive"
                alive = [
                    7, 11, 13, 16, 18, 22
                ]
                newData = {...data, ...{width : 6, height : 5, initCells : alive, label}}
                grid = new Grid(newData)
                
                break;
            case "loaf":
                label = "Loaf"
                alive = [
                    8, 13, 15, 19, 22, 26, 27
                ]
                newData = {...data, ...{width : 6, height : 6, initCells : alive, label}}
                grid = new Grid(newData)
                
                break;
            case "boat":
                label = "Boat"
                alive = [
                    6, 7, 11, 13, 17
                ]
                newData = {...data, ...{width : 5, height : 5, initCells : alive, label}}
                grid = new Grid(newData)
                
                break;
            case "tub":
                label = "Tub"
                alive = [
                    7, 11, 13, 17
                ]
                newData = {...data, ...{width : 5, height : 5, initCells : alive, label}}
                grid = new Grid(newData)
                
                break;
            case "blinker":
                label = "Blinker"
                alive = [
                    7, 12, 17
                ]
                newData = {...data, ...{width : 5, height : 5, initCells : alive, label}}
                grid = new Grid(newData)
                
                break;
            case "toad":
                label = "Toad"
                alive = [
                    9, 14, 15, 20, 21, 26
                ]
                newData = {...data, ...{width : 6, height : 6, initCells : alive, label}}
                grid = new Grid(newData)
                
                break;
            case "beacon":
                label = "Beacon";
                alive = [
                    7, 8, 13, 22, 27, 28
                ]
                newData = {...data, ...{width : 6, height : 6, initCells : alive, label}}
                grid = new Grid(newData)
                
                break;
            case "pulsar":
                label = "Pulsar"
                alive = [
                    38, 39, 45, 46, 
                    56, 57, 61, 62, 
                    70, 73, 75, 77, 79, 82, 
                    87, 88, 89, 91, 92, 94, 95, 97, 98, 99, 
                    105, 107, 109, 111, 113, 115, 
                    123, 124, 125, 129, 130, 131, 

                    157, 158, 159, 163, 164, 165, 
                    173, 175, 177, 179, 181, 183, 
                    189, 190, 191, 193, 194, 196, 197, 199, 200, 201, 
                    206, 209, 211, 213, 215, 218, 
                    226, 227, 231, 232, 
                    242, 243, 249, 250


                ]
                newData = {...data, ...{width : 17, height : 17, initCells : alive, label}}
                grid = new Grid(newData)
                
                break;
            case "pentadecathlon":
                label = "Pentadecathlon"
                alive = [
                    58, 59, 66, 67, 75, 78, 83, 86, 
                    93, 96, 101, 104, 111, 114, 119, 122, 
                    130, 131, 138, 139
                ]
                newData = {...data, ...{width : 11, height : 18, initCells : alive, label}}
                grid = new Grid(newData)
                
                break;
            case "glidergun":
                label = "Glidergun"
                alive = [
                    45, 46, 65, 66, 245, 246, 247, 264, 268, 283, 289, 303, 309, 326, 344, 348, 365, 366, 367, 386, 443, 444, 445, 463, 464, 465, 482, 486, 521, 522, 526, 527, 723, 724, 743, 744]
                newData = {...data, ...{width : 40, height : 20, initCells : alive, label}}
                grid = new Grid(newData)
                break;
            case "glider":
                label = "Glider"
                alive = [56, 76, 78, 96, 97]
                newData = {...data, ...{width : 20, height : 20, initCells : alive, label}}
                grid = new Grid(newData)
                break;
            case "lightweightspaceship":
                label = "Lightweight Spaceship"
                alive = [204, 205, 206, 213, 216, 226, 236, 243, 245]
                newData = {...data, ...{width : 25, height : 10, initCells : alive, label}}
                grid = new Grid(newData)
                break;
            case "middleweightspaceship":
                label = "Middleweight Spaceship"
                alive = [194, 195, 196, 203, 206, 216, 222, 226, 236, 243, 245]
                newData = {...data, ...{width : 25, height : 10, initCells : alive, label}}
                grid = new Grid(newData)
                break;
            case "heavyweightspaceship":
                label = "Heavyweight Spaceship"
                alive = [184, 185, 186, 194, 197, 204, 214, 218, 224, 228, 234, 245, 247]
                newData = {...data, ...{width : 25, height : 10, initCells : alive, label}}
                grid = new Grid(newData)
                break;
            default:
                grid = new Grid();
        }

        return grid
    }
}

