<br>
<h1 style = "text-align: center;"> Programming The Game of Life</h1>


---

<div class = "container">
<h2 class="secondary-header">Tools We Will Be Using</h2>
    <div class = "example"> 

- <a class="reference" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank">Classes</a>
- <a class="reference" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" target="_blank">For Loops</a>
- <a class="reference" href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame" target="_blank">requestAnimationFrame</a>
- <b>Math</b>.<a class="reference" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random" target="_blank">random</a>
- <a class="reference" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else" target="_blank">if...else</a>

Be familiar with these, as we will be using them, so I do not want you to be confused later on.
    </div>
</div>

--- 

<div class="container"> 
<h2 class="secondary-header">Creating The Grid</h2>

First we would need to create the grid, it's the main thing, without it, no cells, no anything.

```js
const createGrid = (width, height) => {
    for(let column = 0; column < width; column++){
        for(let row = 0; row < height; row++){
            // fun stuff
        }
    }
}
```
</div>


<div class="container"> 
    Here we have the <b class="function">createGrid</b> function, or whatever you name it. Right now, on it's own, does nothing, 


    
</div>