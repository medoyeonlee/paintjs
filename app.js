const canvas = document.getElementById('jsCanvas');
let painting = false;
let filling = true;
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode');

const INITIAL_COLOR='#2c2c2c';
const CANVAS_SIZE=700;

//letting know canvas's size
canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.stokeStyle=INITIAL_COLOR; //drawing lines have this color
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5; // same above. but line


function startPainting(){
    painting=true;
}
function stopPainting(){
    painting=false;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y= event.offsetY;
    
    if(!painting){
        ctx.beginPath();  //path is a line. where the mouse cursor located.
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y); //start drawing path to line
        ctx.stroke();
    }
}


const rgbToHex = function(rgb){
    let hex = Number(rgb).toString(16);
    if(hex.length<2){
        hex="0"+hex;
    }
    return hex;
}
const fullColorHex = function(r,g,b){
    const red = rgbToHex(r);
    const green = rgbToHex(g);
    const blue = rgbToHex(b);
    return '#'+red+green+blue;

}
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
  
    console.log(color)
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(event){
    if(filling){
        filling=false;
        mode.innerText='Fill';
    }else{
        filling=true;
        mode.innerText='Paint';
        
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height)
    }
}
if(canvas){
    canvas.addEventListener('mousemove',onMouseMove)
    canvas.addEventListener('mousedown',startPainting)
    canvas.addEventListener('mouseup',stopPainting);
    canvas.addEventListener('mouseleave',stopPainting);
    canvas.addEventListener('click',handleCanvasClick);
}
if(colors){
    Array.from(colors).forEach(color => 
        color.addEventListener('click',handleColorClick)
    )
}



if(range){
    range.addEventListener('input',handleRangeChange);
}
if(mode){
    mode.addEventListener('click',handleModeClick);
}