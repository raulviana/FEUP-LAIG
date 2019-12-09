/**
* MyBoard
* @constructor
*/
class MyBoard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCube(this.scene);
        this.piece = new MyOctoPiece(this.scene);
            
        

        this.newMaterial = new CGFappearance(this.scene);
        this.newMaterial.setShininess(1.0);
        this.newMaterial.setAmbient(0.1, 0.1, 0.1, 0.1);
        this.newMaterial.setDiffuse(0.1, 0.1, 0.1, 0.1);
        this.newMaterial.setSpecular(0.1, 0.1, 0.1, 0.1);
        this.newMaterial.setEmission(0.1, 0.1, 0.1, 0.1);


    }

   


    display() {
        
      
        for(let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.scene.pushMatrix();
                this.scene.translate(-0.974169 + j*0.278334, 0.10101, 0.974169 - i*0.278334);
                this.scene.rotate(Math.PI/8, 0, 1, 0);
                this.scene.scale(0.15, 0.1, 0.15);
                this.scene.registerForPick(i*8 + j + 1, this.piece);
                this.piece.display();
                this.scene.popMatrix();
                
            }
        }

        this.scene.pushMatrix();
        this.newMaterial.apply();
        this.scene.scale(2.3, 0.3, 2.3);
        this.cube.display();
        this.scene.popMatrix();
    }

    
}