/**
* MyTable
* @constructor
* @param scene - Reference to MyScene object
*/
class MyTable extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {

        this.tableTop = new MyUnitCubeQuad(this.scene);
        this.leg = new MyCylinder(this.scene, 20, 3, 0.2);

    }

    display() {
        // leg 1
        this.leg.display();

        //leg 2
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 4);
        this.leg.display();
        this.scene.popMatrix();

        //leg 3
        this.scene.pushMatrix();
        this.scene.translate(6, 0, 0);
        this.leg.display();
        this.scene.popMatrix();

        //leg 4
        this.scene.pushMatrix();
        this.scene.translate(6, 0, 4);
        this.leg.display();
        this.scene.popMatrix();


        // table top
        this.scene.pushMatrix();
        this.scene.translate(3, 3, 2);
        this.scene.scale(6.5, 0.2, 4.5);
        this.tableTop.display();
        this.scene.popMatrix();
    }

    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }
}