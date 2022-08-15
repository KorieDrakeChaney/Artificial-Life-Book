<br>
<h1 style = "text-align: center;"> Basic Grid Logic</h1>


---

<div class = "container">
<h2 class="secondary-header">Tools We Will Be Using</h2>
    <div class = "example"> 

- <a  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank"><b class="reference">Classes</b></a>
- <a  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" target="_blank"><b class="reference">For Loops</b></a>
- <a  href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame" target="_blank"><b class="reference">requestAnimationFrame</b></a>
- <b>Math</b>.<a  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random" target="_blank"><b class="reference">random</b></a>
- <a  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else" target="_blank"><b class="reference">if...else</b></a>

Be familiar with these, as we will be using them, so I do not want you to be confused later on.
    </div>
</div>

--- 

<div class="container"> 
<h2 class="secondary-header">Creating The Grid Class</h2>

First we need to create a <b class="function">Grid</b> class. This will hold all the logic of our program.



```javascript

class Grid {
    constructor(){
        // some code
    }
}

```

</div>


<div class="container">
Right now it does nothing, we haven't implemented anything, but we can add two arguments, a <b class = "variable"> width</b> and a <b class = "variable">height</b>

```javascript

class Grid {
    constructor(width , height){
        this.width = width;
        this.height = height;
        // code perhaps?
    }
}

```
</div>


<div class="container">
Now we need logic. What are we going to do with these two arguments? 
Well, let's think about it, what we are trying to accomplish is a way to create a grid. Something like <b>this</b>: 

<br>
<br>


<video style="background: solid 1px white" controls>
<source src="GridCreation.mp4" type="video/mp4">
</video>


<br>

So in my mind, I am thinking of using two nested <b class="keyword">for loops</b>, using the <b class="variable">width</b> and <b class="variable">height</b> arguments, like <b>this</b>:

```javascript

for(let column = 0; column < this.width; column++){
    for(let row = 0; row < this.height; row++){
        //code code
    }
}

```

Which of course is in the <b class="function">constructor</b>. 

So right now, it does nothing, but what we can do with this logic is great. In our code, create a variable <b class="variable">grid</b> and set it's value to a <b class="keyword"> new </b> <b class="function">Grid</b>, with the arguments being whatever you like.

```javascript
    let grid = new Grid(4, 4)
```


now in the <b class="keyword">for loops</b>, you can log the column and row, and see that we ended up with the values that we saw in the video. <i style="color:grey;">assuming you watched</i>

Now what ? Well, the video has one thing we don't, cells ! Another <b>main</b> thing !

<h2 class="secondary-header">Creating The Cell Class</h2>

Now for this one, let's create a basic <b class="function">Cell</b> class. This class holds a <b class="variable">state</b>, <b class="variable">id</b> and <b class="variable">position</b>([x, y]) which will be changed through the passing arguments.

```javascript

class Cell { 
    constructor(state, id, position){
        this.state  = state // 0 or 1
        this.id = id // 0.....infinity
        this.position = position // [x, y] | [0, 0]


        // logic
    }
}

```



Now within this <b class="function">constructor</b>, let's create the graphics using the <b>document</b> api, which will allow us to create many features.

The function we will be using is <b>document</b>.<a  href="https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement" target="_blank"><b class="reference">createElement(...)</b></a>. This will return whatever Element pertaining to the argument we give it:
<div class = "example">

```javascript

    //examples

let div = document.createElement('div'); // returns a div;
let span = document.createElement('span'); // returns a span;
let h1 = document.createElement('h1'); // returns a h1;

let unknown = document.createElement('aslkdjasjlkd'); // return an HTMLUnknownElement.


```
</div>

 This will allow us to create the cell's body, in this case, a <a  href="https://www.w3schools.com/tags/tag_div.ASP" target="_blank"><b class="reference">div</b></a>.


```javascript

class Cell { 
    constructor(state, id, position){
        // earlier stuff

        this.body = document.createElement('div');
    }
}

```

Now we have the body, again, it's doing nothing, but we will start adding to it, like the color. To change the color, we have to learn about the <a  href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement" target="_blank"><b class="reference">HTMLElement</b></a>, like the div we have above. If you read through the documentation, you can find that we can grab the style of the <b>element</b> and change it. Meaning, we can change it's <a  href="https://www.w3schools.com/jsref/prop_style_backgroundcolor.asp" target="_blank"><b class="reference">backgroundColor</b></a>!

<div class="green-box">
<span style="color : rgba(23, 87, 40, 1)">Good tip : Always read through documentation! </span>
</div>

```javascript

    //earlier stuff

    this.body.style.backgroundColor = 'red' // whatever, your choice. 
```

In the <b>' '</b> you can put any valid 
<a  href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value" target="_blank"><b class="reference">color</b></a>

<div class="example">

```javascript

        //examples

    this.body.style.backgroundColor = 'red' // returns red;
    this.body.style.backgroundColor = 'rgb(255, 0, 0)' // returns red, again;
    this.body.style.backgroundColor = 'rgba(255, 0, 0, 0.5)' // returns red, but half opacity!;
    this.body.style.backgroundColor = '#ff0000' // returns red, again again;
    this.body.style.backgroundColor = 'hsl(0, 100%, 50%)' // returns red, again again again;

```
</div>

Now, we have changed the cells color. How can we see it ? Well for one, we haven't even added it to the document yet, in order to this, we must use the <b>Node</b>.<a  href="https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild" target="_blank"><b class="reference">appendChild(...)</b></a> function. The <b>Node</b> that we will be appending our cell to, is the <b>body</b>, in order to retrieve the body(not to be confused with the cell's body), we must go through the <b>document</b>:

```javascript

class Cell { 
    constructor(state, id, position){
        // earlier stuff

        this.body = document.createElement('div');
        this.body.style.backgroundColor = 'red'
        document.body.appendChild(this.body); // now whenever we initialize the cell, we should see it !
    }
}

```

Now let's create the cells! Remember the nested <b class="keyword">for loops</b> we had earlier? Let's go back into the <b class="function">Grid</b> class , and add some new lines of code.


```javascript
class Grid {
    constructor(width , height){
        //earlier stuff
        for(let column = 0; column < this.width; column++){
            for(let row = 0; row < this.height; row++){
                let cell = new Cell(0, 0, [column, row]);
            }
        }
    }
}
```

let's see what we get !


Wait... A BLANK SCREEN ? Well, the reason for this is that the cell's body, has no <b>width</b> and <b>height</b>

For this problem, I want to add a new variable within the <b class="function">Grid</b> class, that will be passed into the <b>cell</b>. The new variable will be called <b class="variable">cellSize</b>, which we can have a default set to <b>20</b>(px).

```javascript

    constructor(width , height){
        //earlier stuff
        this.cellSize = 20;

        // for loops and stuff
    }
```

Now in the <b class="function">Cell</b> class, we will add a the new variable and argument:

```javascript

class Cell { 
    constructor(state, id, position, size){
        this.state  = state // 0 or 1
        this.id = id // 0.....infinity
        this.position = position // [x, y] | [0, 0]
        this.size = size; // 0.....infinity

        
    }
}

```

Then we set the change the <b>width</b> and <b>height</b> of the body, using again, the style.


```javascript
class Cell { 
    constructor(state, id, position, size){
        // earlier stuff

        this.body.style.width = `${this.size}px`
        this.body.style.height = `${this.size}px`
    }
}

```

Now, if we did this right, we should have red squares ! Next chapter will be how to set up more of the grid logic : D.

End Result : <div id="GameOfLifeExample1"></div>

<script>
    const element = document.getElementById("GameOfLifeExample1")
    class Cell {
    constructor(state, id, position, size) {
    this.state = state;
    this.id = id;
    this.position = position;
    this.size = size;

    this.body = document.createElement("div");
    this.body.style.backgroundColor = "red";
    this.body.style.width = `${this.size}px`
    this.body.style.height = `${this.size}px`

    element.appendChild(this.body);
    }
    }

    class Grid {
    constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cellSize = 20;
    for (let column = 0; column < this.width; column++) {
        for (let row = 0; row < this.height; row++) {
        let cell = new Cell(0, 0, [column, row], this.cellSize);
        }
    }
    }
    }

    new Grid(4, 4);

</script>


Code should be : 

```javascript

class Cell {
  constructor(state, id, position, size) {
    this.state = state;
    this.id = id;
    this.position = position;
    this.size = size;

    this.body = document.createElement("div");
    this.body.style.backgroundColor = "red";
    this.body.style.width = `${this.size}px`
    this.body.style.height = `${this.size}px`

    document.body.appendChild(this.body);
  }
}

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cellSize = 20;
    for (let column = 0; column < this.width; column++) {
      for (let row = 0; row < this.height; row++) {
        let cell = new Cell(0, 0, [column, row], this.cellSize);
      }
    }
  }
}

new Grid(4, 4);


```

</div>
