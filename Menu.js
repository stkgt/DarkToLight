
window.onload = init;
window.addEventListener('resize', resizeCanvas, false);

var canvas;
var ctxt;
let tableauObjetGraphiques;
let tableauObjetImage;
let colorBasique =  "#677179";
let positionnementY=innerHeight/4;
let compt=0;
let boucle=1;
let audio;
let nbImageCree=0;


function init()
{
    tableauObjetGraphiques=[];
    tableauObjetImage=[];
    audio= document.querySelector("#audioPlayer")
    canvas = document.querySelector("#myCanvas");
    ctxt= canvas.getContext("2d");
    resizeCanvas();
    canvas.addEventListener("mousemove",onMouseMove)
    canvas.addEventListener("click",onMouseClick);
    implementationImage();
    implementatioButton();
    dessine();
    musiquePlay();

}
function implementatioButton()
{
    createButton("Jouer");
    createButton("Options");
    createButton("Score");
}
function implementationImage()
{
    createImage('./Sprites/Background/BG_5.png',0,0, window.innerWidth,window.innerHeight);
    createImage('./Sprites/Interface/Title_1366_768.png', window.innerWidth/4,-85,window.innerWidth/2,window.innerHeight/2);
}
function menuOption()
{

    implementationImage();

    if(audio.currentTime!=0)
        createImage('./Sprites/Interface/speaker-2.png', window.innerWidth/2,window.innerHeight/4,50,50);
    else
        createImage('./Sprites/Interface/speaker-1.png', window.innerWidth/2,window.innerHeight/4,50,50);

    createImage('./Sprites/Interface/back-1.png', window.innerWidth/2,window.innerHeight/2,50,50);
}
function createButton(text)
{
    let button = new Button(text);
    button.dessine();
    tableauObjetGraphiques.push(button);
    positionnementY+=(button.height+35);

}
function createImage(link,x,y,width,height)
{
    nbImageCree++;
    let img = new ImageMod(link,x,y,width,height);
    img.dessine();
    tableauObjetImage.push(img);
}
function resizeCanvas() {
    canvas.width =  window.innerWidth;
    canvas.height =  window.innerHeight;
    let theWidth;
    let theHeigth;
    let posX;
    let posY;
    if(tableauObjetGraphiques.length>0)
    {
        tableauObjetGraphiques.forEach(function (bouton) {
            bouton.setWidth(window.innerWidth / 6);
            bouton.setHeight(window.innerHeight / 8);
            bouton.setPositionX(window.innerWidth / 2);
        });

        tableauObjetImage.forEach(function (img) {
            console.log(img._leCompte);
            if(img._leCompte==0)
            {
                theWidth=window.innerWidth;
                theHeigth=window.innerHeight;
                posX=0;
                posY=0;
            }
            else
            {
                theWidth=window.innerWidth/2;
                theHeigth=window.innerHeight/2;
                posX=window.innerWidth/4;
                posY=-85;
            }
            img._width=theWidth;
            img._height=theHeigth;
            img._x=posX;
            img._y=posY;
            img.dessine();
        });
    }
}
function clear()
{
    compt=0;
    nbImageCree=0;
    tableauObjetGraphiques=[];
    tableauObjetImage=[];
    ctxt.clearRect(0, 0, canvas.width, canvas.height);
    if(boucle==1) {
        boucle=0;
        menuOption();
    }
    else
    {
        boucle=1;
        positionnementY=innerHeight/4
        menuPrincipal()
    }
}
function menuPrincipal()
{
    resizeCanvas();
    implementationImage();
    implementatioButton();
    dessine();
}

function musiquePlay()
{
    audio.play();
}
function musiqueStop()
{
    audio.currentTime = 0;
    audio.pause();
}
function dessine ()
{
    ctxt.save();
    tableauObjetGraphiques.forEach(function (bouton) {
        bouton.dessine();
    });
    ctxt.restore();
    if(boucle==1)
        requestAnimationFrame(dessine);
}

function onMouseClick(evnt)
{
    let positionX = evnt.pageX;
    let positionY = evnt.pageY;
    if(boucle==1) {
        tableauObjetGraphiques.forEach(function (bouton) {
            if (bouton._text == "Jouer" && (positionX >= (bouton._positionX - bouton._width / 2) && positionX <= (bouton._positionX + bouton._width / 2)) // divisé par deux la taille car la positionX = le milieux
                && (positionY >= bouton._positionY && positionY <= (bouton._positionY + bouton._height))) {
                window.location = 'game.html';
            }
            else if (bouton._text == "Options" && (positionX >= (bouton._positionX - bouton._width / 2) && positionX <= (bouton._positionX + bouton._width / 2)) // divisé par deux la taille car la positionX = le milieux
                && (positionY >= bouton._positionY && positionY <= (bouton._positionY + bouton._height)))
                clear();
        });
    }
    else
    {
        tableauObjetImage.forEach(function (img) {
            if (img._leCompte == 2 && (positionX >= (img._x - img._width) && positionX <= (img._x + img._width)) // divisé par deux la taille car la positionX = le milieux
                && (positionY >= img._y && positionY <= (img._y + img._height))) {
                ctxt.clearRect(img._x, img._y, img._width, img._height)
                if (audio.currentTime != 0) {
                    musiqueStop();
                    img._link = './Sprites/Interface/multimedia-1.png';
                }
                else {
                    musiquePlay();
                    img._link = './Sprites/Interface/multimedia-2.png';
                }
                img.dessine();
            }
            else if(img._leCompte == 3 && (positionX >= (img._x - img._width) && positionX <= (img._x + img._width)) // divisé par deux la taille car la positionX = le milieux
                && (positionY >= img._y && positionY <= (img._y + img._height)))
            {
                clear();
            }
        });
    }
}
function onMouseMove(event)
{
    let posX= event.pageX;
    let posY= event.pageY;
    if(boucle==1) { // menu principal
        tableauObjetGraphiques.forEach(function (bouton) {
            if ((posX >= (bouton._positionX - bouton._width / 2) && posX <= (bouton._positionX + bouton._width / 2)) // divisé par deux la taille car la positionX = le milieux
                && (posY >= bouton._positionY && posY <= (bouton._positionY + bouton._height))) {
                bouton._colorTexteBorder = "#FFFFFF";
                bouton._colorTexte = "#000000";
            }
            else {
                bouton._colorTexte = "#FFFFFF";
                bouton._colorTexteBorder = "#000000";
            }

        });
    }
    else
    { //menu option
        tableauObjetImage.forEach(function (img) {
            if(img._leCompte==2) {
                if ((posX >= (img._x - img._width) && posX <= (img._x + img._width)) // divisé par deux la taille car la positionX = le milieux
                    && (posY >= img._y && posY <= (img._y + img._height))) {
                    console.log("dedans");
                    ctxt.clearRect(img._x, img._y, img._width, img._height)
                    if (audio.currentTime != 0) {

                        img._link = './Sprites/Interface/multimedia-2.png';
                    }
                    else
                        img._link = './Sprites/Interface/multimedia-1.png';

                }
                else {
                    if (audio.currentTime != 0)
                        img._link = './Sprites/Interface/speaker-2.png';
                    else
                        img._link = './Sprites/Interface/speaker-1.png';
                }

            }
            else if(img._leCompte==3) {
                if ((posX >= (img._x - img._width) && posX <= (img._x + img._width)) // divisé par deux la taille car la positionX = le milieux
                    && (posY >= img._y && posY <= (img._y + img._height))) {
                    console.log("dedans");
                    ctxt.clearRect(img._x, img._y, img._width, img._height)
                    img._link = './Sprites/Interface/back-2.png';
                }
                else
                    img._link = './Sprites/Interface/back-1.png';
            }

            img.dessine();
        });
    }

}
class ImageMod extends Image
{
    constructor(link,x,y,width,height)
    {
        super();
        this._link=link;
        this._leCompte = compt;
        this._x =x;
        this._y=y;
        this._width=width;
        this._height= height;
    }
    dessine()
    {
        compt++;
        super.src=this._link;
        if(compt<=nbImageCree) {
            super.onload =function () {
                ctxt.save();
                ctxt.drawImage(this, this._x, this._y, this._width, this._height);
                ctxt.restore();
            }
        }
        else
        {
            ctxt.save();
            ctxt.drawImage(this, this._x, this._y, this._width, this._height);
            ctxt.restore();
        }

    }
}
class Button {
    setPositionX(value) {
        this._positionX = value;
    }
    setWidth(value) {
        this._width = value;
    }

    setHeight(value) {
        this._height = value;
    }

    constructor(text) {
        this._width=window.innerWidth/6;
        this._height = window.innerHeight/8;
        this._text = text;
        this._positionX = window.innerWidth/2;
        this._positionY =  positionnementY;
        this._colorTexte =  "#FFFFFF";
        this._colorTexteBorder =  "#000000";
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
        ctxt.fillStyle = "rgba(0, 0, 0, 0)"; // transparent
        this._rect = ctxt.fillRect(0, 0, this.width, this.height);
        ctxt.font = "50px serif";
        ctxt.strokeStyle = this._colorTexteBorder ;
        ctxt.lineWidth = 8;
        ctxt.strokeText(this.text,this.width/3-20,this.height/2);
        ctxt.fillStyle = this._colorTexte;
        ctxt.fillText(this.text,this.width/3-20,this.height/2);
        ctxt.restore();
    }
}