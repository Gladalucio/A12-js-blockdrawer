var tileCount = 25;

var _isPainting = false;
colors = ["white", "red", "green", "blue"];
var color = colors[0];

var x = 0;
var y = 0;

var x_old = 0;
var y_old = 0;

window.onload = function () {
    canvas = document.getElementById("gamescreen");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);

    reset();
};
// https://www.w3schools.com/js/js_htmldom_html.asp
// document.getElementById("p1").innerHTML = "New text!";

// https://keycode.info/
function keyPush(key) {
    x_old = x;
    y_old = y;

    switch (key.which) {
        // UP
        case 87:
            if (y > 0) {
                y--;
            }
            break;
        // DOWN
        case 83:
            if (y < canvas.height / tileCount - 1) {
                y++;
            }
            break;
        // LEFT
        case 65:
            if (x > 0) {
                x--;
            }
            break;
        // RIGHT
        case 68:
            if (x < canvas.width / tileCount - 1) {
                x++;
            }
            break;
        // Arrow RIGHT Scroll Color
        case 39:
            switchcolor(1);
            break;
        // Arrow LEFT Reverse Scroll Color
        case 37:
            switchcolor(-1);
            break;
        // RESET
        case 46:
            reset();
            break;
    }

    refresh();

    // ENTER && SPACE
    if (key.which == 13 || key.which == 32) {
        _isPainting = !_isPainting;
    }
}

function refresh() {
    context.fillStyle = color;
    context.fillRect(x * tileCount, y * tileCount, tileCount, tileCount);

    //  && (x_old != x && y_old != y)

    if (!_isPainting) {
        context.fillStyle = "black";
    } else {
        context.fillStyle = color;
    }

    context.fillRect(
        x_old * tileCount,
        y_old * tileCount,
        tileCount,
        tileCount
    );

    document.getElementById("colorselect").innerHTML = color.toUpperCase();
    document.getElementById("currentlocation").innerHTML = `x = ${x}, y = ${y}`;
}

function switchcolor(direction) {
    var pos = colors.indexOf(color);
    // ++
    if (direction > 0) {
        if (pos < colors.length - 1) {
            color = colors[++pos];
        } else {
            color = colors[0];
        }
    }
    // --
    else if (direction < colors.length) {
        if (pos > 0) {
            color = colors[--pos];
        } else {
            color = colors[colors.length - 1];
        }
    }
}

function reset() {
    _isPainting = false;

    x_old = 0;
    y_old = 0;

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width * tileCount, canvas.height * tileCount);

    refresh();
}
