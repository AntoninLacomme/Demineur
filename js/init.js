
window.addEventListener ('load', loadDemineur);


var canvas, ctx, domchrono, dompp, domcomptmine;
var game, line, columns;
function loadDemineur () {

    canvas = document.querySelector ("#canvasDemineur");
    ctx = canvas.getContext("2d");

    domchrono = document.querySelector ("#chronometre");
    dompp = document.querySelector ("play-pause");
    domcomptmine = document.querySelector ("#compteurMines");

    canvas.onmouseup = eventClickNewGame;
    line = 16;
    column = 28;

    canvas.width = Demineur.calcWidth (column);
    canvas.height = Demineur.calcHeight (line);
    running ();
}

function running () {
    drawing ();

    requestAnimationFrame (running);
}

function drawing () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
        Demineur.drawDemineur (ctx, game.getGrille());
    }
    catch (error) { }

    Demineur.drawQuadrillage (ctx, column, line);
}


function eventClickNewGame (event) {
    if (event.button == 0) {
        game = new Game (column, line, 99, Demineur.calcCoordonates (event.offsetX, event.offsetY));

        canvas.onmouseup = clicDemineur;
        clicDemineur (event);
    }
}

function clicDemineur (event) {
    switch (event.button) {
        case 0:
            game.leftClickAtPosition(Demineur.calcCoordonates (event.offsetX, event.offsetY));
            break;

        case 2:
            game.rightClickAtPosition(Demineur.calcCoordonates (event.offsetX, event.offsetY));
            break;

        default:
            console.log("Bouton non reconnu");
    }

}
