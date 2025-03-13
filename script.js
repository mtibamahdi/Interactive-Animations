const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "white";
ctx.fillRect(10, 20, 50, 150);
