var itemsHTMLCollection = document.getElementsByClassName("parallax-item");
var itemsArray = Array.from(itemsHTMLCollection);

//console.log("itemsArray", itemsArray)

var input = {
    mouseX: {
        start: 0,
        end: window.innerWidth,
        current:0,
    },
    mouseY: {
        start: 0,
        end: window.innerHeight,
        current:0,
    }
};

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;


var output = {
    x: {
        start: -100,
        end: 100,
        current:0,
    },
    y: { 
        start: -100,
        end: 100,
        current:0,
    },
    zIndex: {
        range: 10000,
    },
    scale: {
        start: 1,
        end: 0.2,
    },
    blur: {
        startingDepth: -0.1,
        range: 20,
    }
};

output.scale.range = output.scale.end - output.scale.start;
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

var mouse = {
    x: window.innerWidth * .5,
    y: window.innerHeight * .5,
}

var updateInputs = function() {
    input.mouseX.current = mouse.x;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

    input.mouseY.current = mouse.y;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
}

var updateOutputs = function() {
    output.x.current = output.x.start + (input.mouseX.fraction * output.x.range);
    output.y.current = output.y.start + (input.mouseY.fraction * output.y.range);

}

var updateEachItem = function() {
itemsArray.forEach(function (item, k) {
    var depth = parseFloat(item.dataset.depth, 10);
    var itemOutput = {
        x: output.x.current - (output.x.current * depth),
        y: output.y.current - (output.y.current * depth),
        zIndex: output.zIndex.range - (output.zIndex.range * depth),
        scale: output.scale.start + (output.scale.range * depth),
        blur: (depth - output.blur.startingDepth) * output.blur.range
    };
    //console.log(k, "depth", depth)
    item.style.filter = "blur("+ itemOutput.blur +"px)"
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = "scale("+itemOutput.scale+") translate("+ itemOutput.x +"px, "+ itemOutput.y +"px)";
});
}

var handleMouseMove = function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    updateInputs();
    updateOutputs();
    updateEachItem();
}

var handleResize = function() {
    input.mouseX.end = window.innerWidth;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;

    input.mouseY.end = window.innerHeight;
    input.mouseY.range = input.mouseY.end - input.mouseY.start;

}




window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleResize);


updateInputs();
updateOutputs();
updateEachItem();

