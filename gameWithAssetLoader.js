var assetsToLoadURLs = {
    //Poulpy images
    poulpyNeutreSRC: { url :  './Sprites/Poulpe/Neutre/Neutre.png'},
    poulpyDeplSRC: { url: './Sprites/Poulpe/Deplacement/Deplacement.png'},
    //poulpyAttackSRC: { url: './Sprites/Poulpe/Deplacement/Deplacement.png'},

    //Montre images
    monsterDeplSRC: { url: './Sprites/Enemies/Poisson_move.png'},
    monsterAttackSRC: { url: './Sprites/Enemies/JoySimple/Attaque/Poisson_attaque.png'}
};

var loadedAssets;

function init() {

    var game = new GameFramework();

    loadAssets(game.start);
    //game.start();
}

//==========================

function loadAssets(callback) {
    // here we should load the sounds, the sprite sheets etc.
    // then at the end call the callback function
    loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);
}

// You do not have to understand in details the next parts of the code...
// just use the above function

/* ############################
    BUFFER LOADER for loading multiple files asyncrhonously. The callback functions is called when all
    files have been loaded and decoded
 ############################## */
function isImage(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function loadAssetsUsingHowlerAndNoXhr(assetsToBeLoaded, callback) {
    var assetsLoaded = {};
    var loadedAssets = 0;
    var numberOfAssetsToLoad = 0;

    // define ifLoad function
    var ifLoad = function () {
        if (++loadedAssets >= numberOfAssetsToLoad) {
            callback(assetsLoaded);
        }
        console.log("Loaded asset " + loadedAssets);
    };

    // get num of assets to load
    for (var name in assetsToBeLoaded) {
        numberOfAssetsToLoad++;
    }

    console.log("Nb assets to load: " + numberOfAssetsToLoad);

    for (name in assetsToBeLoaded) {
        var url = assetsToBeLoaded[name].url;
        console.log("Loading " + url);
        if (isImage(url)) {
            assetsLoaded[name] = new Image();

            assetsLoaded[name].onload = ifLoad;
            // will start async loading.
            assetsLoaded[name].url = url;
        } else {
            // // We assume the asset is an audio file
            console.log("asset is not an image");
            // console.log("loading " + name + " buffer : " + assetsToBeLoaded[name].loop);
            // assetsLoaded[name] = new Howl({
            //     urls: [url],
            //     buffer: assetsToBeLoaded[name].buffer,
            //     loop: assetsToBeLoaded[name].loop,
            //     autoplay: false,
            //     volume: assetsToBeLoaded[name].volume,
            //     onload: function () {
            //         if (++loadedAssets >= numberOfAssetsToLoad) {
            //             callback(assetsLoaded);
            //         }
            //         console.log("Loaded asset " + loadedAssets);
            //     }
            // }); // End of howler.js callback
        } // if

    } // for
} // function

var GameFramework = function () {

    var canvas, ctx, width, height;
    var mousepos = {x: (window.innerWidth - 20) / 2, y: (window.innerHeight - 20) / 2};
    var poulpy;
    var tableauMonster = [];
    var spawnInterval;
    var scoreInterval;
    var score = 0;


    var start = function (assetsReadyToBeUsed) {
        loadedAssets = assetsReadyToBeUsed;

        canvas = document.querySelector("#myCanvas");
        canvas.width = window.innerWidth - 22;
        canvas.height = window.innerHeight - 22;
        ctx = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;

        poulpy = new Poulpe();

        //tableauMonster.push(new Monster(poulpy.x - 800,poulpy.y));
        tableauMonster.push(new Monster(poulpy.x - 100, poulpy.y - 400));

        canvas.addEventListener('mousemove', function (evt) {
            mousepos = getMousePos(canvas, evt);
        }, false);
        canvas.addEventListener('mousedown', clicked);

        spawnInterval = setInterval(function () {
            var cote = Math.floor(Math.random() * 4) + 1;
            if((Math.floor(Math.random() * 1000) + 1)<=250){
                if(cote === 1){
                    tableauMonster.push(new Monster(-20, (Math.floor(Math.random() * canvas.height) + 1)));
                }
                switch (cote) {
                    case 1:
                        tableauMonster.push(new Monster(-20, (Math.floor(Math.random() * canvas.height) + 1)));
                        break;
                    case 2:
                        tableauMonster.push(new Monster((Math.floor(Math.random() * canvas.width) + 1), -20 ));
                        break;
                    case 3:
                        tableauMonster.push(new Monster(canvas.width+20, (Math.floor(Math.random() * canvas.height) + 1)));
                        break;
                    case 4:
                        tableauMonster.push(new Monster((Math.floor(Math.random() * canvas.width) + 1), canvas.height+20));
                        break;
                }
            }
            //console.log("spawnInterval");

        }, 1500);

        scoreInterval = setInterval(function () {
            score++;

        }, 1000);

        // spritesInterval = setInterval(function(){
        //     poulpy.deplSRC = './Sprites/Poulpe/Deplacement/Deplacement_01.png';
        //     poulpy.neutreSRC = './Sprites/Poulpe/Neutre/Neutre_01.png'; }, 700);


        mainloop();
    };

    function mainloop() {
        // 1) clear screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Affichage Score
        ctx.save();
        ctx.translate(0, 0);
        ctx.font = "30px Arial";
        ctx.fillText("Score = " + score,60,60);
        ctx.restore();


        tableauMonster.forEach(function (p) {
            p.update();
        });

        // 3) draw object
        poulpy.update();
        //drawRectangle(angle);

        // 4) request new frame
        window.requestAnimationFrame(mainloop);
    }

    function clicked(evt) {
        if (evt.button == "0") {
            poulpy.isOnAttack = true;
            poulpy.frameIndex = 0;
            poulpy.poulpeAttack();
        } else if (evt.button == "2") {

        }
    }

    function circleCollide(x1, y1, r1, x2, y2, r2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return ((dx * dx + dy * dy) < (r1 + r2) * (r1 + r2));
    }

    function dist(x1, x2, y1, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }


    function getMousePos(canvas, evt) {
        // necessary to take into account CSS boudaries
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    /*
    Classe Poulpe

    var rect = {x:(window.innerWidth-22)/2, y:(window.innerHeight-22)/2, width:40, height:40, v:3};
     */
    class Poulpe {

        constructor() {
            // On nomme les propriétés avec this
            //Position
            this.x = (window.innerWidth - 22) / 2;
            this.y = (window.innerHeight - 22) / 2;
            this.width = 40;
            this.height = 40;
            this.v = 3;
            this.angle = 0;
            this.img = new Image();
            // this.neutreSRC = './Sprites/Poulpe/Neutre/Neutre.png';
            // this.deplSRC = './Sprites/Poulpe/Deplacement/Deplacement.png';
            // this.attackSRC = './Sprites/Poulpe/Deplacement/Deplacement.png';
            this.isMooving = false;

            this.frameIndex = 1;
            this.tickCount = 0;
            this.ticksPerFrame = 32;

            this.isOnAttack = false;
            this.tickAttack = 0;
            this.nbTickAtack = 30;
        }

        update() {
            // 2) move object
            var dx = this.x - mousepos.x;
            var dy = this.y - mousepos.y;
            this.angle = Math.atan2(dy, dx);

            this.tickCount += 1;

            if (dist(this.x, mousepos.x, this.y, mousepos.y) > 20) {
                this.isMooving = true;
                this.x -= this.v * Math.cos(this.angle);
                this.y -= this.v * Math.sin(this.angle);
            }
            else {
                this.isMooving = false;
            }
            // 2 - on dessine dans le canvas
            this.drawPoulpe();

        }

        drawPoulpe() {

            // bonne pratique: sauver au début et restaurer le contexte à la fin
            ctx.save();

            // These two lines move the coordinate system
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle - 90);
            // recenter the coordinate system in the middle
            // the rectangle. Like that it will rotate around
            // this point instead of top left corner
            ctx.translate(-this.width / 2, -this.height / 2);

            //ctx.drawImage(this.img, 0, 0, 70, 85, 0, 0, 70, 85);

            this.tickCount++;

            if (this.tickCount === this.ticksPerFrame) {
                if (this.isOnAttack) {
                    this.frameIndex++;
                     this.img.src = loadedAssets.poulpyDeplSRC;
                    ctx.drawImage(this.img, this.frameIndex * 70, 0, 70, 85, 0, 0, 70, 85);
                    this.isOnAttack = this.frameIndex < 2 ? true : false;
                }
                else if (this.isMooving) {
                    this.frameIndex = this.frameIndex === 1 ? 2 : 1;
                    this.img.src = loadedAssets.poulpyDeplSRC;
                    ctx.drawImage(this.img, this.frameIndex * 70, 0, 70, 85, 0, 0, 70, 85);
                }
                else {
                    this.frameIndex = this.frameIndex === 1 ? 2 : 1;
                    this.img.src = loadedAssets.poulpyNeutreSRC;
                    ctx.drawImage(this.img, this.frameIndex * 70, 0, 70, 85, 0, 0, 70, 85);
                }
                this.tickCount = 0;
            }

            //ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();

        }

        poulpeAttack() {
            console.log("poulpeAttack");
            /*ctx.save();

            this.tickAttack++;
            if (this.tickAttack < this.nbTickAtack) {
                ctx.translate(rect.width / 2, -rect.height / 2);
                ctx.fillStyle = "white";
                //ctx.fillRect(0, 0, 30, 30);

                ctx.beginPath();
                ctx.arc(0, 0, 50, 0, 2*Math.PI);
                ctx.fill();
            }
            else {
                this.tickAttack = 0;
                this.isOnAttack = false;
            }


            ctx.restore();*/
        }
    }

    /*
    Classe Monster
    */
    class Monster {
        constructor(xPos, yPos) {
            // On nomme les propriétés avec this
            //Position
            this.x = xPos;
            this.y = yPos;
            this.width = 40;
            this.height = 40;
            this.v = 3;
            this.angle = 0;


            this.img = new Image();
            this.deplSRC = './Sprites/Enemies/Poisson_move.png';
            this.attackSRC = './Sprites/Enemies/JoySimple/Attaque/Poisson_attaque.png';
            this.isMooving = false;

            this.frameIndex = 1;
            this.tickCount = 0;
            this.ticksPerFrame = 16;

            this.isOnAttack = false;
        }


        update() {
            var dx = this.x - poulpy.x;
            var dy = this.y - poulpy.y;
            this.angle = Math.atan2(dy, dx);

            this.tickCount += 1;

            if (dist(this.x, poulpy.x, this.y, poulpy.y) > 200) {
                this.isMooving = true;
                //console.log("distance de poulpy : "+dist(p.x, poulpy.x, p.y, poulpy.y));
                this.x -= this.v * Math.cos(this.angle);
                this.y -= this.v * Math.sin(this.angle);
            }
            else{
                this.isMooving = false;
            }
            // 2 - on dessine dans le canvas
            this.drawMonster();

        }

        drawMonster() {
            // bonne pratique: sauver au début et restaurer le contexte à la fin
            ctx.save();

            // These two lines move the coordinate system
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            // recenter the coordinate system in the middle
            // the rectangle. Like that it will rotate around
            // this point instead of top left corner
            ctx.translate(-this.width / 2, -this.height / 2);

            ctx.drawImage(this.img, 0, 0, 70, 85, 0, 0, 70, 85);

            this.tickCount++;

            if (this.tickCount === this.ticksPerFrame) {
                if (this.isOnAttack) {
                    this.frameIndex++;
                    this.img.src = this.deplSRC;
                    ctx.drawImage(this.img, this.frameIndex * 280, 0, 280, 280, 0, 0, 280, 280);
                    this.isOnAttack = this.frameIndex < 2 ? true : false;
                }
                else {
                    this.frameIndex = this.frameIndex === 1 ? 2 : 1;
                    this.img.src = this.deplSRC;
                    ctx.drawImage(this.img, this.frameIndex * 280, 0, 280, 280, 0, 0, 280, 280);
                }
                this.tickCount = 0;
            }

            //ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        }
    }


    //our GameFramework returns a public API visible from outside its scope
    return {
        start: start
    };
};
