
const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');
const radius = canvas.height / 2;

function drawFace() {
    ctx.translate(radius, radius);
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, radius - 5, 0, Math.PI * 2);
    ctx.fill();
    // окружность циферблата
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#777');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#777');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    // точка в центре
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#00f';
    ctx.fill();
}
function drawNumbers() {
    let ang;
    let num;
    // размер цифр на циферблате
    ctx.font = radius * 0.20 + "px arial";

    // установливаем выравнивание текста по середине и центру позиции печати:
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    // рисуем цифры по окружности
    for (num = 1; num < 13; num++) {
        angle = num * Math.PI / 6;
        ctx.rotate(angle);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-angle);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(angle);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-angle);
    }
}
function drawTime() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    // часовая стрелка
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    // минутная
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // секундная
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawClock(){
    drawFace();
    drawNumbers();
    drawTime();
}
setInterval(drawClock, 6000);
drawClock();