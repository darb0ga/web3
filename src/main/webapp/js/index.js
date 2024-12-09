window.addEventListener("load", drawGraph(0));

function canvas() {
    const canvas = document.getElementById("graph");

    let mainForm = document.getElementById('table');

    const rect = canvas.getBoundingClientRect();

    const xDom = event.clientX - rect.left - canvas.width / 2;
    const yDom = canvas.height / 2 - (event.clientY - rect.top);

    try {
        const rs = Array.from(
            document.getElementsByName("r")).filter(e => e.checked
        );

        if (rs.length !== 1) {
            throw new Error("choose one value of r");
        }
        const r = 100 * Number(rs[0].value);

        const x = Math.round(xDom * (r / (canvas.width / 4))) / 100;
        const y = Math.round(yDom * (r / (canvas.height / 4))) / 100;

        const yBoxes = document.getElementsByName("y");

        yBoxes.forEach(checkbox => {
            if (checkbox.id !== "optional") {
                checkbox.checked = false;
            } else {
                checkbox.checked = true;
                checkbox.value = y;
            }
        });

        console.log("x: " + x + ", y: " + y + ", r: " + r / 100);

        mainForm["x"].value = x;
        mainForm["y"].value = y;
        mainForm["r"].value = r;

        onSubmit(this);
    } catch (e) {
        alert(e);
    }

}

function isItHit(x, y, r) {
    x = parseFloat(x);
    y = parseFloat(y);
    r = parseFloat(r);
    return ((x <= 0) && (x >= -r) && (y <= 0) && (y >= -r) || //in rectangle
        (x <= 0) && (y <= 1.5*r*x + r) && (y >= 0) || //in triangle
        (x * x + y * y <= r * r) && (x >= 0) && (y >= 0) //in circle
    );
} //change

function pointDot(canvas, ctx, itHit, x, y, r) {
    if (!r || x === undefined || y === undefined) {
        return;
    }

    const scale = 150;
    const k = scale / r;

    ctx.beginPath();
    ctx.arc(x * k, y * k, 4, 0, Math.PI * 2);
    ctx.fill();
}


function drawGraph(R) {
    const scale = 150;
    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1, -1);

    ctx.fillStyle = "rgb(62,224,89)";
    ctx.beginPath();

    // Top left triangle
    ctx.moveTo(0, 0);
    ctx.lineTo(-scale/2, 0);
    ctx.lineTo(0, scale);

    // Bottom right rectangle
    ctx.moveTo(0, 0);
    ctx.lineTo(scale/2, 0);
    ctx.lineTo(scale/2, -scale);
    ctx.lineTo(0, -scale);
    ctx.lineTo(0, 0);
    // Bottom left circle
    ctx.arc(0, 0, scale/2, Math.PI, Math.PI * 1.5, false);
    ctx.closePath();
    ctx.fill();

    // Axis
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(-canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, 0);
    ctx.moveTo(0, -canvas.height / 2);
    ctx.lineTo(0, canvas.height / 2);
    ctx.stroke();

    ctx.fillStyle = "black";

    var table = document.querySelector('#res')
    var rows = table.querySelectorAll('tr')


    if (rows[1] !== undefined) {
        for (var i = 1; i < rows.length; i++) {
            pointDot(canvas, ctx, isItHit(rows[i].cells[1].innerHTML.trim(), rows[i].cells[2].innerHTML.trim(), R),
                rows[i].cells[0].innerHTML.trim(), rows[i].cells[1].innerHTML.trim(), R);
        }
    }


    ctx.scale(1, -1);
    ctx.fillStyle = "black";
    ctx.font = "14px monospace";

    if (R === 0) {
        ctx.fillText("R", scale, -6);
        ctx.fillText("R/2", scale / 2, -6);
        ctx.fillText("-R/2", -scale / 2, -6);
        ctx.fillText("-R", -scale, -6);

        ctx.fillText("R", 6, -scale);
        ctx.fillText("R/2", 6, -scale / 2);
        ctx.fillText("-R/2", 6, scale / 2);
        ctx.fillText("-R", 6, scale);
    } else {
        ctx.fillText((R).toString(), scale, -6);
        ctx.fillText((R / 2).toString(), scale / 2, -6);
        ctx.fillText((-R / 2).toString(), -scale / 2, -6);
        ctx.fillText((-R).toString(), -scale, -6);

        ctx.fillText((R).toString(), 6, -scale);
        ctx.fillText((R / 2).toString(), 6, -scale / 2);
        ctx.fillText((-R / 2).toString(), 6, scale / 2);
        ctx.fillText((-R).toString(), 6, scale);
    }
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    return null;

}

function onSubmit() {
    let mainForm = document.getElementById('table');

    try {
        let formData = new FormData(mainForm);
        const values = Object.fromEntries(formData);
        validate(values.x, values.y, values.r);
        mainForm.submit();
    } catch (e) {
        alert(e.message);
    }

}