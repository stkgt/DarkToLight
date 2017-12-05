

window.onload = init;
window.addEventListener('resize', resizeCanvas, false);

var canvas;
var ctxt;
let tableauObjetGraphiques;
let colorBasique =  "#677179";
let positionnementY=innerHeight/4;


function init()
{
    tableauObjetGraphiques=[];
    canvas = document.querySelector("#myCanvas");
    ctxt= canvas.getContext("2d");
    canvas.addEventListener("mousemove",onMouseMove)
    //canvas.addEventListener("click",onMouseOver)
    resizeCanvas();
    implementatioButton();

}
function implementatioButton()
{
    createButton("Jouer");
    createButton("Options");
    createButton("Score");
    /*createButton("Options");
    createButton("Score");*/


}
function createButton(texte)
{
    let button = new Button(texte);
    button.dessine();
    tableauObjetGraphiques.push(button);
    positionnementY+=(button.height+35);

}
/*function anime() {
    tableauObjetGraphiques.forEach(function (bouton) {
        bouton.dessine();
    });
    requestAnimationFrame(anime);
}*/

// to do faire l'event
/*function onClick()
{

}*/
function onMouseMove(event)
{
    let posX= event.pageX;
    let posY= event.pageY;
   // console.log("X|"+event.pageX|"|Y|"+event.pageY);
    console.log(event.pageX+"|"+event.pageY);
    tableauObjetGraphiques.forEach(function (bouton) {
        if((posX>=(bouton._positionX-bouton._width/2) && posX<=(bouton._positionX+bouton._width/2)) // divisé par deux la taille car la positionX = le milieux
        && (posY>=bouton._positionY && posY<=(bouton._positionY+bouton._height)))
        {
            bouton._color = "#FFFFFF";
            bouton._colorTexte = "#000000";

            console.log("Couleur onMove" + bouton._color);
        }
        else {
            bouton._color = colorBasique;
            bouton._colorTexte = "#FFFFFF";
        }
        bouton.dessine();

    })

   /* if((posX>tableauObjetGraphiques[0].positionX && posX<tableauObjetGraphiques[0].positionX+tableauObjetGraphiques[0].width)
        && posY<tableauObjetGraphiques[0].positionY && posX<tableauObjetGraphiques[0].positionY+tableauObjetGraphiques[0].height)
    {
        console.log("caMarche");
    }*/


}

function resizeCanvas() {
    canvas.width =  window.innerWidth;
    canvas.height =  window.innerHeight;
}

class Button {
    get rect() {
        return this._rect;
    }

    set rect(value) {
        this._rect = value;
    }
    get fillStyle() {
        return this._fillStyle;
    }
    set fillStyle(value) {
        this._fillStyle = value;
    }

    constructor(text) {
        this._width=window.innerWidth/6;
        this._height = window.innerHeight/8;
        this._text = text;
        this._positionX = window.innerWidth/2;
        this._positionY =  positionnementY;
        this._color =  "#677179";
        this._colorTexte =  "#FFFFFF";
        this._fillStyle=0;
        this._rect=0;
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
        // x, y, largeur, hauteur. Origine = le coin
        ctxt.translate(this.positionX-(this.width/2), this.positionY);

        ctxt.fillStyle =  this.color; // valeur = une couleur CSS3
        this._fillStyle = ctxt.fillStyle;
        this._rect = ctxt.fillRect(0, 0, this.width, this.height);
        ctxt.strokeStyle=this._colorTexte;
        ctxt.strokeText(this.text,this.width/3+20,this.height/2);
        ctxt.restore();
    }
}