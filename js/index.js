/*
to do
- change dot colors
- add labels
- black to blue to white to red to black
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const pointColor = '#afafaf';
const outlineColor = 'ff0000'
let data = [];

function resizeCanvas() {
    canvas.width = window.innerWidth*0.8;
    canvas.height = window.innerHeight*0.8;
}

function getXValue(rating) {
    const padding = 50; 
    const scale = (canvas.width - 2 * padding) / 2;
    return (rating + 1) * scale + padding; 
}

function getRandomYValue() {
    return Math.random() * (canvas.height - 20) + 10;
}

function drawGradientXAxis() {
    const gradient = ctx.createLinearGradient(50, 0, canvas.width - 50, 0);
    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(1, 'red');

    ctx.fillStyle = gradient;
    ctx.fillRect(50, canvas.height - 20, canvas.width - 100, 10);
}

function drawYAxis() {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 20);
    ctx.lineTo(canvas.width / 2, canvas.height - 20);
    ctx.stroke();
}

function drawPoints() {
    data.forEach(point => {
        const x = getXValue(point.Rating);
        const y = getRandomYValue();
        point.drawX = x;
        point.drawY = y;
        drawPoint(point);
    });
}


function drawPoint(point) {
    ctx.fillStyle = pointColor;
    ctx.beginPath();
    ctx.arc(point.drawX, point.drawY, 10, 0, Math.PI * 2, true);
    ctx.fill();
    //ctx.strokeStyle = outlineColor;
    //ctx.lineWidth = 2;
    //ctx.stroke();
}

function isPointClicked(x, y, point) {
    const distance = Math.sqrt((x - point.drawX) ** 2 + (y - point.drawY) ** 2);
    return distance < 10;
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    data.forEach(point => {
        if (isPointClicked(x, y, point)) {
            pointClicked(point);
        }
    });
});


//======================================
//use this to interact with other things
//==like when connecting to other code==
//======================================
function pointClicked(point) {
    var name = point.Name;
    var description = point.Description;
    var rating = point.Rating;
    document.getElementById("title-text").innerHTML = name;
    document.getElementById("description-text").innerHTML = description;

    return [name, description, rating];
}


canvas.addEventListener('hover', (event) => {
    console.log("hovering");
})

function loadData() {
    const filePath = "../data/f1data.json";

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(fetchedData => {
            data = fetchedData;  
            draw();  
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Something has gone wrong. Please try again later or contact the developers.");
        });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawYAxis();
    drawGradientXAxis();
    drawPoints();
}

window.addEventListener('load', createStuff);
window.addEventListener('resize', createStuff);

function createStuff(){
    resizeCanvas();
    loadData();
}