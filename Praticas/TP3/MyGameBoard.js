/**
* MyGameBoard
* @constructor
*/
class MyGameBoard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCube(this.scene);
        this.square = new MySquarePiece(this.scene);
        this.tile = new MyOctoPiece(this.scene);

        this.boardMaterial = new CGFappearance(this.scene);
        this.boardMaterial.setShininess(1.0);
        this.boardMaterial.setAmbient(0.9, 0.6, 0.2, 1);
        this.boardMaterial.setDiffuse(0.9, 0.6, 0.2, 1);
        this.boardMaterial.setSpecular(0.9, 0.6, 0.2, 1);
        this.boardMaterial.setEmission(0.9, 0.6, 0.2, 1);

        this.tileMaterial = new CGFappearance(this.scene);
        this.tileMaterial.setShininess(1.0);
        this.tileMaterial.setAmbient(0.6445, 0.164, 0.164, 1);
        this.tileMaterial.setDiffuse(0.6445, 0.164, 0.164, 1);
        this.tileMaterial.setSpecular(0.6445, 0.164, 0.164, 1);
        this.tileMaterial.setEmission(0.6445, 0.164, 0.164, 1);

        this.blackMaterial = new CGFappearance(this.scene);
        this.blackMaterial.setShininess(1.0);
        this.blackMaterial.setAmbient(0.1, 0.1, 0.1, 0.1);
        this.blackMaterial.setDiffuse(0.1, 0.1, 0.1, 0.1);
        this.blackMaterial.setSpecular(0.1, 0.1, 0.1, 0.1);
        this.blackMaterial.setEmission(0.1, 0.1, 0.1, 0.1);

        this.whiteMaterial = new CGFappearance(this.scene);
        this.whiteMaterial.setShininess(0.1);
        this.whiteMaterial.setAmbient(0.9, 0.9, 0.9, 0.1);
        this.whiteMaterial.setDiffuse(0.9, 0.9, 0.9, 0.1);
        this.whiteMaterial.setSpecular(0.9, 0.9, 0.9, 0.1);
        this.whiteMaterial.setEmission(0.9, 0.9, 0.9, 0.1);


    }


    display() {


        this.tileMaterial.apply();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.scene.pushMatrix();
                this.scene.translate(-9.74169 + j * 2.78334, 1.0101, 9.74169 - i * 2.78334);
                this.scene.rotate(Math.PI / 8, 0, 1, 0);
                this.scene.scale(1.5, 1, 1.5);
                this.scene.registerForPick(i * 8 + j + 1, this.tile);
                this.tile.display();
                this.scene.popMatrix();

            }
        }

        this.boardMaterial.apply();
        if (this.scene.pickMode == false) {
            this.scene.pushMatrix();
            this.scene.scale(24, 3, 24);
            this.cube.display();
            this.scene.popMatrix();

            for (let j = 0; j < 7; j++) {
                this.whiteMaterial.apply();
                this.scene.pushMatrix();
                this.scene.translate(11.13336, 1.0101, -8.35002 + j * 2.78334);
                this.scene.rotate(Math.PI / 4, 0, 1, 0);
                this.scene.scale(1.5, 1, 1.5);
                this.square.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(-11.13336, 1.0101, -8.35002 + j * 2.78334);
                this.scene.rotate(Math.PI / 4, 0, 1, 0);
                this.scene.scale(1.5, 1, 1.5);
                this.square.display();
                this.scene.popMatrix();
            }

            for (let j = 0; j < 7; j++) {
                this.blackMaterial.apply();
                this.scene.pushMatrix();
                this.scene.translate(-8.35002 + j * 2.78334, 1.0101, 11.13336);
                this.scene.rotate(Math.PI / 4, 0, 1, 0);
                this.scene.scale(1.5, 1, 1.5);
                this.square.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(-8.35002 + j * 2.78334, 1.0101, -11.13336);
                this.scene.rotate(Math.PI / 4, 0, 1, 0);
                this.scene.scale(1.5, 1, 1.5);
                this.square.display();
                this.scene.popMatrix();
            }
        }
    }


}