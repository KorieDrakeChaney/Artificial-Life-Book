

class Cell { 
    constructor(state, id, position){
        this.state = state;
        this.id = id;
        this.position = position;


        this.body = document.createElement('div');
        this.body.style.backgroundColor = 'red'

        document.body.appendChild(this.body);
    }
}


class Grid {
    constructor(width, height){
        this.width = width;
        this.height = height;
        for(let column = 0; column < this.width; column++){
            for(let row = 0; row < this.height; row++){
                let cell = new Cell(0, 0, [column, row]);
            }
        }
    }
}


new Grid(4, 4);