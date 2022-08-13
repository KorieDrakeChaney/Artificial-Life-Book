<br>
<h1 style = "text-align: center;"> Getting Started </h1>

---
<div class="primary-header">
<span style="font-size : 30px;"><b>Conway's Game of Life</b></span>
</div>

<div class="container">

Conway's Game of Life is a very simple but rewarding project, understanding it and doing it on your own is such a great feeling. I will be walking you through it with the basic logic while creating programming building blocks along the way.

We're evolving from a one-dimensional CA to now a two-dimensional CA adding complexity as we will have a larger neighborhood of <b>9</b>, contrast to the simple neighborhood of <b>3</b>  in Elementary Cellular Automata.

<video controls>
<source src="Neighborhood.mp4" type="video/mp4">
</video>

</div>

<div class ="container"> 
This carries the same concept of a world of cells, which carry 2 states, 0 or 1, <b style="color:green;">alive</b> or <b style="color:red;">dead</b>.

As for the rules, there are 3 basic rules:

<div class="explanation">

- (1) <i>Survival</i>: If a cell is in state 1 (<b style="color:green;">alive</b>)
and has 2 or 3 neighbors in state 1,
then the cell <b style="color:green;">survives</b>, i.e., remains
in state 1.

- (2) <i>Birth</i>: If a cell is in state 0 and has
exactly 3 neighbors in state 1, then
in the next time step the cell goes to
state 1.

- (3) <i>Death</i>: A cell in state 1 <b style="color:red;">dies</b> (goes to
state 0) of loneliness if it has 0 or 1
neighbors. Also, it <b style="color:red;">dies</b> because of
overcrowding if it has 4 or more
neighbors.
</div>

<br>

<video style="background: solid 1px white" controls>
<source src="RuleExplanation.mp4" type="video/mp4">
</video>

</div>

---

<script src="ConwaysGameOfLife.js">

</script>

<script>
    let grid = new Grid({ useAlpha : true})

    grid.startAnimating();
</script>

<div class="container">

With these simple rules, many patterns can occur. Common pattern types include <b class="defintion"><a  href="https://conwaylife.com/wiki/Still_life" target="_blank">still lifes</a></b>, which do not change, <b class="defintion"><a  style="" href="https://conwaylife.com/wiki/Oscillator" target="_blank">oscillators</a></b>, which return to their initial state after several generations, and <b class="defintion"><a href="https://conwaylife.com/wiki/Spaceships" target="_blank">spaceships</a></b>, which travel across the grid !

</div>

---

<div class="primary-header">
<span style="font-size : 30px;"><b>Still Lives</b></span>
<br>
<span style="color:grey">Boring Dudes</span>
</div>

<div class ="container">

<div class="explanation" style="text-align:center"><div id="block"></div></div>
<div class="explanation" style="text-align:center"><div id="beehive"></div></div>
<div class="explanation" style="text-align:center"><div id="loaf"></div></div>
<div class="explanation" style="text-align:center"><div id="boat"></div></div>
<div class="explanation" style="text-align:center"><div id="tub"></div></div>


</div>

---

<div class="primary-header">
<span style="font-size : 30px;"><b>Oscillators</b></span>
<br>
<span style="color:grey">Amazing</span>
</div>

<div class ="container">

<div class="explanation" style="text-align:center"><div id="blinker"></div></div>
<div class="explanation" style="text-align:center"><div id="toad"></div></div>
<div class="explanation" style="text-align:center"><div id="beacon"></div></div>
<div class="explanation" style="text-align:center"><div id="pulsar"></div></div>
<div class="explanation" style="text-align:center"><div id="pentadecathlon"></div></div>
<div class="explanation" style="text-align:center"><div id="glidergun"></div></div>




</div>

<script>
    let templates = [
    ["blinker", {
        infinite : true, cellSize : 20, repeatAfter : 15, useBorders : true, useColor : false}], 
    ["block", {
         infinite : true, cellSize : 20, repeatAfter : 15, useBorders : true, useColor : false
    }], 
    ["loaf", {
        infinite : true, cellSize : 20, repeatAfter : 15, useBorders : true, useColor : false
    }], 
    ["boat",  {
        infinite : true, cellSize : 20, repeatAfter : 15, useBorders : true, useColor : false
    }
    ], 
    ["beehive", {
        infinite : true, cellSize : 20, repeatAfter : 15, useBorders : true, useColor : false
    }], 
    ["tub", {
        infinite : true, cellSize : 20, repeatAfter : 15, useBorders : true, useColor : false
    }], [
    "pulsar", {
        infinite : true, cellSize : 10, repeatAfter : 15, useBorders : true, useColor : false
    }
    ], 
    ["glidergun", {
        infinite : true, cellSize : 10, repeatAfter : 40, useBorders : true, useColor : false
    }], 
    ["beacon", {
        infinite : true, cellSize : 10, repeatAfter : 15, useBorders : true, useColor : false
    }], 
    ["toad", {
        infinite : true, cellSize : 10, repeatAfter : 15, useBorders : true, useColor : false
    }], 
    ["pentadecathlon", {
        infinite : true, cellSize : 10, repeatAfter : 25, useBorders : true, useColor : false
    }]]

    for(const template of templates){
        let grid = Grid.to(template[0], {...{label : template[0], relativeObject : template[0]}, ...template[1]})
        grid.startAnimating();
    }
</script>


<footer id="footer"></footer>