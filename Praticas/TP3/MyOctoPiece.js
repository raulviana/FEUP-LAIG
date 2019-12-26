/**
* MyOctoPiece
* @constructor
*/
class MyOctoPiece extends CGFobject {
    constructor(scene) {
        super(scene);
		this.cyl = new MyCylinder(this.scene, 8, 1, 0.5, 1, 1);
		this.base = new MyCylinderBase(this.scene, 8, 1);

		this.blackMaterial = new CGFappearance(this);
        this.blackMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.blackMaterial.setDiffuse(0, 0, 0, 1.0);
        this.blackMaterial.setSpecular(0, 0, 0, 1.0);
        this.blackMaterial.setShininess(10.0);
    }
    display() {
		

        this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.cyl.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.base.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.base.display();
		this.scene.popMatrix();


    }

    
}