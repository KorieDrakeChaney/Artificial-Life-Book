<div class="primary-header">
<span style="font-size : 30px;"><b>Patterns</b></span>
</div>

---

<script src="ConwaysGameOfLife.js"></script>

<div class="primary-header">
<span style="font-size : 30px;"><b>Game of Life</b></span>
<br>
<span style="color:grey">The Main</span>
</div>

<div class ="container">
    <div class="explanation" id="gof" style="text-align:center"></div>
</div>

<div class="primary-header">
<span style="font-size : 30px;"><b>Still Lives</b></span>
<br>
<span style="color:grey">Boring Dudes</span>
</div>

<div class ="container">

<div class="explanation" id="block" style="text-align:center"></div>
<div class="explanation" id="beehive" style="text-align:center"></div>
<div class="explanation" id="loaf" style="text-align:center"></div>
<div class="explanation" id="boat" style="text-align:center"></div>
<div class="explanation" id="tub" style="text-align:center"></div>


</div>

---

<div class="primary-header">
<span style="font-size : 30px;"><b>Oscillators</b></span>
<br>
<span style="color:grey">Amazing</span>
</div>

<div class ="container">

<div class="explanation" id="blinker" style="text-align:center"></div>
<div class="explanation" id="toad" style="text-align:center"></div>
<div class="explanation" id="beacon" style="text-align:center"></div>
<div class="explanation" id="pulsar" style="text-align:center"></div>
<div class="explanation" id="pentadecathlon" style="text-align:center"></div>
<div class="explanation" id="glidergun" style="text-align:center"></div>

</div>

---

<div class="primary-header">
<span style="font-size : 30px;"><b>Spaceships</b></span>
<br>
<span style="color:grey">Beautiful</span>
</div>

<div class ="container">

<div class="explanation" style="text-align:center"><div id="glider"></div></div>
<div class="explanation" style="text-align:center"><div id="lightweightspaceship"></div></div>
<div class="explanation" style="text-align:center"><div id="middleweightspaceship"></div></div>
<div class="explanation" style="text-align:center"><div id="heavyweightspaceship"></div></div>

</div>


<script>

    let isMobile = /mobile/i.test(navigator.userAgent);
    let templates = [
    ["blinker", {
        infinite : true, cellSize : isMobile ? 10: 20, repeatAfter : 15, useBorders : true}], 
    ["block", {
         infinite : true, cellSize : isMobile ? 10: 20, repeatAfter : 15, useBorders : true
    }], 
    ["loaf", {
        infinite : true, cellSize : isMobile ? 10: 20, repeatAfter : 15, useBorders : true
    }], 
    ["boat",  {
        infinite : true, cellSize : isMobile ? 10: 20, repeatAfter : 15, useBorders : true
    }
    ], 
    ["beehive", {
        infinite : true, cellSize : isMobile ? 10: 20, repeatAfter : 15, useBorders : true
    }], 
    ["tub", {
        infinite : true, cellSize : isMobile ? 10: 20, repeatAfter : 15, useBorders : true
    }], [
    "pulsar", {
        infinite : true, cellSize : isMobile ? 5 : 10, repeatAfter : 15, useBorders : true
    }
    ], 
    ["glidergun", {
        infinite : true, cellSize : isMobile ? 5 : 10, repeatAfter : 40, useBorders : true
    }], 
    ["beacon", {
        infinite : true, cellSize : isMobile ? 10: 20, repeatAfter : 15, useBorders : true
    }], 
    ["toad", {
        infinite : true, cellSize : isMobile ? 10: 20, repeatAfter : 15, useBorders : true
    }], 
    ["pentadecathlon", {
        infinite : true, cellSize : isMobile ? 5 : 10, repeatAfter : 25, useBorders : true
    }], 
    ["glider", {
        infinite : true, cellSize : isMobile ? 7.5 : 15, repeatAfter : 50, useBorders : true
    }], 
    [
    "lightweightspaceship", {
        infinite : true, cellSize : isMobile ? 7.5 : 15, repeatAfter : 50, useBorders : true
    }
    ], 
    [
    "middleweightspaceship", {
        infinite : true, cellSize : isMobile ? 7.5 : 15, repeatAfter : 50, useBorders : true
    }
    ], 
    ["heavyweightspaceship", {
        infinite : true, cellSize : isMobile ? 7.5 : 15, repeatAfter : 50, useBorders : true
    }
    ]]

    for(const template of templates){
        let grid = Grid.to(template[0], {...{label : template[0], relativeObject : template[0]}, ...template[1]})
        grid.startAnimating();
    }

    let grid = new Grid({
    width : 50, height : 50,
    infinite : true, cellSize : isMobile ? 5 : 10, repeatAfter : 150, useBorders : true, 
    relativeObject : "gof", label : "Game Of Life", random : true, useColor : true, useAlpha : true})
    grid.startAnimating()

</script>

<footer id="footer"></footer>