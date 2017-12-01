

window.onload = init;
window.addEventListener('resize', resizeCanvas, false);

var canvas;
var ctxt;

function init()
{
    canvas = document.querySelector("#myCanvas");
    ctxt= canvas.getContext("2d");
    resizeCanvas();
    let b1 = new Button("Salut", 90);
    b1.dessine();


}
function implementatioButton(button)
{
    button.addEventListener("click",onClick);
    button.addEventListener("mouseover",onMouseOver);
    button.dessine();
}
// to do faire l'event
function onClick()
{

}
function onMouseOver()
{

}

function resizeCanvas() {
    canvas.width =  window.innerWidth;
    canvas.height =  window.innerHeight;
}

class Button {

    constructor(text) {
        this._width=window.innerWidth/6;
        this._height = window.innerHeight/8;
        this._text = text;
        this._positionX = window.innerWidth/2;
        this._positionY =  window.innerHeight/4;
        this._color =  "#ECE8E8";
    }
    get text() {
        return this._text;
    }

    get positionX() {
        return this._positionX;
    }

    get positionY() {
        return this._positionY;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }
    get color() {
        return this._color;
    }

    dessine()
    {
        ctxt.save();
        console.log("je dessine "+this.text);
        // x, y, largeur, hauteur. Origine = le coin
        ctxt.translate(this._positionX-(this.width/2), this._positionY);

        // en haut à gauche
        ctxt.fillStyle =  this.color; // valeur = une couleur CSS3
        ctxt.fillRect(0, 0, this.width, this.height);

    }
}