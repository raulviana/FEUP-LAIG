/**
* MySideBoard
* @constructor
*/
class MySideBoard extends CGFobject {
    constructor(scene, mat) {
        super(scene);
        this.mat = mat;
        this.cube = new MyUnitCube(this.scene);
        this.octoPiece = new MyOctoPiece(this.scene);

        this.boardMaterial = new CGFappearance(this.scene);
        this.boardMaterial.setShininess(1.0);
        this.boardMaterial.setAmbient(0.57, 0.351, 0.12, 1);
        this.boardMaterial.setDiffuse(0.57, 0.351, 0.12, 1);
        this.boardMaterial.setSpecular(0.57, 0.351, 0.12, 1);
        this.boardMaterial.setEmission(0.57, 0.351, 0.12, 1);

        this.pieceMaterial = new CGFappearance(this.scene);
        if(this.mat == 1) {
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
        
        
        
        if (this.scene.pickMode == false) {
        this.pieceMaterial.apply();
        for(let i = 0; i < 32; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0.0, 0.15, 1.5 * this.mat);
            this.scene.rotate(Math.PI/8, 0, 1, 0);
            this.scene.scale(0.15, 0.1, 0.15);
            this.octoPiece.display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.boardMaterial.apply();
        this.scene.translate(0, 0, 1.5 * this.mat);
        this.scene.scale(1.15, 0.3, 0.4);
        this.cube.display();
        this.scene.popMatrix();
        }
    }

    
}