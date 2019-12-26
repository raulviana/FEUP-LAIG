/**
* MyPiece
* @constructor
*/
class MyPiece extends CGFobject {
    constructor(scene, row, col, turn) {
        super(scene);
        this.row = row;
        this.col = col;
        this.turn = turn;
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
    }

    display() {
        this.scene.pushMatrix();
        this.pieceMaterial.apply();
        this.scene.translate(-0.974169 + (this.row - 1) * 0.278334, 0.15, 0.974169 - (this.col - 1) * 0.278334);
        this.scene.rotate(Math.PI / 8, 0, 1, 0);
        this.scene.scale(0.15, 0.1, 0.15);
        this.octoPiece.display();
        this.scene.popMatrix();
    }

}