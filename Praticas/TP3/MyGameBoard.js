/**
* MyGameBoard
* @constructor
*/
class MyGameBoard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCube(this.scene);
        this.tile = new MyOctoPiece(this.scene);

        this.boardMaterial = new CGFappearance(this.scene);
        this.boardMaterial.setShininess(1.0);
        this.boardMaterial.setAmbient(0.57, 0.351, 0.12, 1);
        this.boardMaterial.setDiffuse(0.57, 0.351, 0.12, 1);
        this.boardMaterial.setSpecular(0.57, 0.351, 0.12, 1);
        this.boardMaterial.setEmission(0.57, 0.351, 0.12, 1);

        this.tileMaterial = new CGFappearance(this.scene);
        this.tileMaterial.setShininess(1.0);
        this.tileMaterial.setAmbient(0.6445, 0.164, 0.164, 1);
        this.tileMaterial.setDiffuse(0.6445, 0.164, 0.164, 1);
        this.tileMaterial.setSpecular(0.6445, 0.164, 0.164, 1);
        this.tileMaterial.setEmission(0.6445, 0.164, 0.164, 1);


    }

   
    display() {
        
        
        this.tileMaterial.apply();
        for(let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.scene.pushMatrix();
                this.scene.translate(-0.974169 + j*0.278334, 0.10101, 0.974169 - i*0.278334);
                this.scene.rotate(Math.PI/8, 0, 1, 0);
                this.scene.scale(0.15, 0.1, 0.15);
                this.scene.registerForPick(i*8 + j + 1, this.tile);
                this.tile.display();
                this.scene.popMatrix();
                
            }
        }

        this.boardMaterial.apply();
        if (this.scene.pickMode == false) {
        this.scene.pushMatrix();
        this.scene.scale(2.3, 0.3, 2.3);
        this.cube.display();
        this.scene.popMatrix();
        }
    }

    
}