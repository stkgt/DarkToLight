/*
Classe Monster
*/
class Monster extends Entity{
    constructor(xPos, yPos) {
        super();
        // On nomme les propriétés avec this
        //Position
        this.x = xPos;
        this.y = yPos;
        this.width = 40;
        this.height = 40;
        this.v = 3;
        this.angle = 0;
    }


    update (poulpy, ctx) {
        super.update(poulpy, ctx);
        var dx = this.x - poulpy.x;
        var dy = this.y - poulpy.y;
        this.angle = Math.atan2(dy, dx);

        if(this.dist(poulpy.x, poulpy.y) > 100) {
            //console.log("distance de poulpy : "+dist(p.x, poulpy.x, p.y, poulpy.y));
            this.x -= this.v*Math.cos(this.angle);
            this.y -= this.v*Math.sin(this.angle);
        }
        // 2 - on dessine dans le canvas
        this.drawEntity("red", ctx);

    }

    drawEntity(couleur, ctx) {
        super.drawEntity(couleur);
    }

    dist(x2, y2) {
        super.dist(x2, y2);
    }
}