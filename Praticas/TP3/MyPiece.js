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
            this.pieceMaterial.setEmission(0.18, 0.18, 0.18, 0.1);
        } else {
            this.pieceMaterial.setShininess(0.1);
            this.pieceMaterial.setAmbient(0.5, 0.5, 0.5, 0.1);
            this.pieceMaterial.setDiffuse(0.8, 0.8, 0.8, 0.1);
            this.pieceMaterial.setSpecular(0.8, 0.8, 0.8, 0.1);
            this.pieceMaterial.setEmission(0.6, 0.6, 0.6, 0.1);
        }

        this.developAnimation();
        
    }

    developAnimation() {
        let frame1 = [];
        frame1.push(1);

        let trans = [0, 0.5, 0];
        frame1.push(trans);

        let rot = [0, 0, 0];
        frame1.push(rot);

        let scale = [1, 1, 1];
        frame1.push(scale);

        this.animation.keyFrames.push(frame1);

        // let frame2 = [];
        // frame2.push(2);

        // trans = [0, 0.5, (1.53 * this.temp)];
        // frame2.push(trans);

        // rot = [0, 0, 0];
        // frame2.push(rot);

        // scale = [1, 1, 1];
        // frame2.push(scale);

        // this.animation.keyFrames.push(frame2);
        
        let frame3 = [];
        frame3.push(3);

        trans = [parseFloat(-1.05 + (0.3 * (this.row - 1))).toFixed(3), 0.5, parseFloat((1.53 * this.temp) + 1.05 - (0.3 * (this.col - 1))).toFixed(3)];
        frame3.push(trans);

        rot = [0, 0, 0];
        frame3.push(rot);

        scale = [1, 1, 1];
        frame3.push(scale);

        this.animation.keyFrames.push(frame3);
        
        let frame4 = [];
        frame4.push(4);

        trans = [parseFloat(-1.05 + (0.3 * (this.row - 1))).toFixed(3), 0, parseFloat((1.53 * this.temp) + 1.05 - (0.3 * (this.col - 1))).toFixed(3)];
        console.log("trans: " + trans);
        frame4.push(trans);

        rot = [0, 0, 0];
        frame4.push(rot);

        scale = [1, 1, 1];
        frame4.push(scale);

        this.animation.keyFrames.push(frame4);
    }

    display() {
        if (this.scene.pickMode == false) {
            this.scene.pushMatrix();
            this.pieceMaterial.apply();
            //this.scene.translate(-0.974169 + (this.row - 1) * 0.278334, 0.15, 0.974169 - (this.col - 1) * 0.278334);
            //this.scene.rotate(Math.PI / 8, 0, 1, 0);
            //this.scene.scale(0.15, 0.1, 0.15);
            this.animation.apply();
            if (this.turn == 1)
                this.scene.translate(0, 0.15, 1.5);
            else
                this.scene.translate(0, 0.15, -1.5);

            this.scene.rotate(Math.PI / 8, 0, 1, 0);
            this.scene.scale(0.13, 0.1, 0.13);

            this.octoPiece.display();
            this.scene.popMatrix();
        }
    }

}