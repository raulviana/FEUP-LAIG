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

        let trans = [0, 1.5, 0];
        frame1.push(trans);

        let rot = [0, 0, 0];
        frame1.push(rot);

        let scale = [1, 1, 1];
        frame1.push(scale);

        this.animation.keyFrames.push(frame1);

        /*let frame2 = [];
        frame2.push(2);

        trans = [0, 5, (15.3 * this.temp)];
        frame2.push(trans);

        rot = [0, 0, 0];
        frame2.push(rot);

        scale = [1, 1, 1];
        frame2.push(scale);

        this.animation.keyFrames.push(frame2);
        
        let frame3 = [];
        frame3.push(3);

        trans = [-10.5 + (3 * (this.row - 1)), 5, (15.3 * this.temp) + 10.5 - (3 * (this.col - 1))];
        frame3.push(trans);

        rot = [0, 0, 0];
        frame3.push(rot);

        scale = [1, 1, 1];
        frame3.push(scale);

        this.animation.keyFrames.push(frame3);
        
        let frame4 = [];
        frame4.push(4);

        trans = [-10.5 + (3 * (this.row - 1)), 0, (15.3 * this.temp) + 10.5 - (3 * (this.col - 1))];
        frame4.push(trans);

        rot = [0, 0, 0];
        frame4.push(rot);

        scale = [1, 1, 1];
        frame4.push(scale);

        this.animation.keyFrames.push(frame4);*/
    }

    display() {
        if (this.scene.pickMode == false) {


            this.scene.pushMatrix();
            this.pieceMaterial.apply();
            this.animation.apply();
            this.scene.translate(-9.74169 + (this.row - 1) * 2.78334, 0, 9.74169 - (this.col - 1) * 2.78334);
            this.scene.rotate(Math.PI / 8, 0, 1, 0);
            this.scene.scale(1.5, 1, 1.5);
           
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