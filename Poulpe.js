/*
    Classe Poulpe

    var rect = {x:(window.innerWidth-22)/2, y:(window.innerHeight-22)/2, width:40, height:40, v:3};
     */
class Poulpe extends Entity {

    constructor() {
        super();
        // On nomme les propriétés avec this
        //Position
        this.x = (window.innerWidth-22)/2;
        this.y = (window.innerHeight-22)/2;
        this.width = 40;
        this.height = 40;
        this.v = 3;
        this.angle = 0;
    }

    update(mousepos, ctx) {
        super.update(mousepos, ctx);
        // 2) move object
        var dx = this.x - mousepos.x;
        var dy = this.y - mousepos.y;
        this.angle = Math.atan2(dy, dx);

        if(this.dist(mousepos.x, mousepos.y) > 10) {
            this.x -= this.v*Math.cos(this.angle);
            this.y -= this.v*Math.sin(this.angle);
        }
        // 2 - on dessine dans le canvas
        this.drawEntity("black", ctx);

    }

    drawEntity(couleur, ctx) {
        super.drawEntity(couleur, ctx);
    }

    poulpeAttack() {
        console.log("poulpeAttack");
        ctx.save();

        ctx.translate(rect.width/2,-rect.height/2);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 30, 30);
        // ctx.beginPath();
        // ctx.arc(0, 0, 50, 0, 2*Math.PI);
        // ctx.fill();
        ctx.restore();
    }

    dist(x2, y2) {
        super.dist(x2, y2);
    }
}