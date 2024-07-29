const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const pointColor = '#000';

let data = [];

function resizeCanvas() {
    canvas.width = window.innerWidth*0.9;
    canvas.height = window.innerHeight*0.9;
}

function getXValue(rating) {
    return (rating + 1) * (canvas.width / 2); 
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
        ctx.fillStyle = pointColor;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, true); 
        ctx.fill();
    });
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

//testing stuff
function pointClicked(point) {
    alert(`You clicked on ${point.Name}: ${point.Description}`);
}

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

window.addEventListener('load', function(){
    resizeCanvas();
    loadData();
});
