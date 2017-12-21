/*
Classe Entity
*/
class Entity {

    constructor() {
        //Abstract class
        if (new.target === Entity) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this.x;
        this.y;
        this.width;
        this.height;
        this.v;
        this.angle;


    }

    dist(x2, y2) {
        return Math.sqrt((this.x-x2)*(this.x-x2)+(this.y-y2)*(this.x-y2));
    }

    update(entity, ctx){
    }

    drawEntity(couleur, ctx){

        // bonne pratique: sauver au début et restaurer le contexte à la fin
        ctx.save();

        // These two lines move the coordinate system
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        // recenter the coordinate system in the middle
        // the rectangle. Like that it will rotate around
        // this point instead of top left corner
        ctx.translate(-this.width/2, -this.height/2);

        ctx.fillStyle = couleur;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();

    }
}