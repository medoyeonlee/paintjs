const canvas = document.getElementById('jsCanvas');
let painting = false;
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange')
//letting know canvas's size
canvas.width=700;
canvas.height=700;

ctx.stokeStyle='#2c2c2c'; //drawing lines have this color
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
    console.log(ctx.strokeStyle)
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth=size;
}
if(canvas){
    canvas.addEventListener('mousemove',onMouseMove)
    canvas.addEventListener('mousedown',startPainting)
    canvas.addEventListener('mouseup',stopPainting);
    canvas.addEventListener('mouseleave',stopPainting);
}
if(colors){
    Array.from(colors).forEach(color => 
        color.addEventListener('click',handleColorClick)
    )
}



if(range){
    range.addEventListener('input',handleRangeChange);
}