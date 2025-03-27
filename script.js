const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = generateFood();
let direction = "RIGHT";
let score = 0;
let gameRunning = true;

document.addEventListener("keydown", changeDirection);
document.getElementById("restartBtn").addEventListener("click", restartGame);

// Mobile button controls
document.getElementById("btnUp").addEventListener("click", () => setDirection("UP"));
document.getElementById("btnDown").addEventListener("click", () => setDirection("DOWN"));
document.getElementById("btnLeft").addEventListener("click", () => setDirection("LEFT"));
document.getElementById("btnRight").addEventListener("click", () => setDirection("RIGHT"));

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") setDirection("LEFT");
    else if (key === 38 && direction !== "DOWN") setDirection("UP");
    else if (key === 39 && direction !== "LEFT") setDirection("RIGHT");
    else if (key === 40 && direction !== "UP") setDirection("DOWN");
}

function setDirection(newDirection) {
    if (
        (newDirection === "LEFT" && direction !== "RIGHT") ||
        (newDirection === "RIGHT" && direction !== "LEFT") ||
        (newDirection === "UP" && direction !== "DOWN") ||
        (newDirection === "DOWN" && direction !== "UP")
    ) {
        direction = newDirection;
    }
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "gold" : "#2d6a4f";
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + boxSize / 2, food.y + boxSize / 2, boxSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    if (!gameRunning) return;

    let head = { ...snake[0] };

    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "UP") head.y -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;
    if (direction === "DOWN") head.y += boxSize;

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").innerText = score;
        food = generateFood();
    } else {
        snake.pop();
    }

    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameRunning = false;
        alert("Game Over! Your score: " + score);
    }

    snake.unshift(head);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    update();
}

function restartGame() {
    snake = [{ x: 200, y: 200 }];
    food = generateFood();
    direction = "RIGHT";
    score = 0;
    document.getElementById("score").innerText = score;
    gameRunning = true;
}

setInterval(gameLoop, 200);