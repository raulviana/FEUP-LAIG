/**
* MyPiece
* @constructor
*/
class MyPiece extends CGFobject {
    constructor(scene, row, col, turn, animation) {
        super(scene);
        this.row = row;
        this.col = col;
        this.turn = turn;
        this.animation = animation;

        this.temp;
        this.turn == 0 ? this.temp = 1 : this.temp = -1;

        this.octoPiece = new MyOctoPiece(this.scene);
        this.boardCenter = [3, 3.2, 2];

        this.pieceMaterial = new CGFappearance(this.scene);
        if (this.turn == 1) {
            this.pieceMaterial.setShininess(1.0);
            this.pieceMaterial.setAmbient(0.1, 0.1, 0.1, 0.1);
            this.pieceMaterial.setDiffuse(0.1, 0.1, 0.1, 0.1);
            this.pieceMaterial.setSpecular(0.1, 0.1, 0.1, 0.1);
            this.pieceMaterial.setEmission(0.1, 0.1, 0.1, 0.1);
        } else {
            this.pieceMaterial.setShininess(0.1);
            this.pieceMaterial.setAmbient(0.9, 0.9, 0.9, 0.1);
            this.pieceMaterial.setDiffuse(0.9, 0.9, 0.9, 0.1);
            this.pieceMaterial.setSpecular(0.9, 0.9, 0.9, 0.1);
            this.pieceMaterial.setEmission(0.9, 0.9, 0.9, 0.1);
        }

        this.developAnimation();
        
    }

    developAnimation() {
        let frame1 = [];
        frame1.push(1);

        let trans = [0, 0.15, 0];
        frame1.push(trans);

        let rot = [0, 0, 0];
        frame1.push(rot);

        let scale = [1, 1, 1];
        frame1.push(scale);

        this.animation.keyFrames.push(frame1);
    }

    display() {
        if (this.scene.pickMode == false) {


            this.scene.pushMatrix();
            this.pieceMaterial.apply();
            this.animation.apply();
            this.scene.translate(-0.974169 + (this.row - 1) * 0.278334, 0, 0.974169 - (this.col - 1) * 0.278334);
            this.scene.rotate(Math.PI / 8, 0, 1, 0);
            this.scene.scale(0.15, 0.1, 0.15);
           
            /*if (this.turn == 1)
                this.scene.translate(0, 1.5, 15);
            else
                this.scene.translate(0, 1.5, -15);

            this.scene.rotate(Math.PI / 8, 0, 1, 0);
            this.scene.scale(1.3, 1, 1.3);*/

            this.octoPiece.display();
            this.scene.popMatrix();
        }
    }

}