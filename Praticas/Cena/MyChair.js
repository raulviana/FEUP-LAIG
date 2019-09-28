/**
* MyChair
* @constructor
* @param scene - Reference to MyScene object
*/
class MyChair extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {

        this.chairBody = new MyUnitCubeQuad(this.scene);
        this.leg = new MyCylinder(this.scene, 20, 1.7, 0.1);

    }

    display() {
        // leg 1
        this.leg.display();

        //leg 2
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 2);
        this.leg.display();
        this.scene.popMatrix();

        //leg 3
        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.leg.display();
        this.scene.popMatrix();

        //leg 4
        this.scene.pushMatrix();
        this.scene.translate(2, 0, 2);
        this.leg.display();
        this.scene.popMatrix();


        // chair base
        this.scene.pushMatrix();
        this.scene.translate(1, 1.7, 1);
        this.scene.scale(2.2, 0.2, 2.2);
        this.chairBody.display();
        this.scene.popMatrix();

        // chair back support
        this.scene.pushMatrix();
        this.scene.translate(0, 2.7, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(2.2, 0.2, 2.2);
        this.chairBody.display();
        this.scene.popMatrix();
    }

    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }
}