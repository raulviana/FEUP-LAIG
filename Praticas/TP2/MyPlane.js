/**
* MyPlane
* @constructor
*/
class MyPlane extends CGFobject {
    constructor(scene, npartsU, npartsV) {
        super(scene);
        this.npartsU = npartsU;
        this.npartsV = npartsV;
        this.surface = [];



        this.makeSurface();
    }
    makeSurface() {

       

        let controlvertexes = [
							[
								 [-2.0, -2.0, 0.0, 1],
								 [-2.0, 2.0, 0.0, 1]

							],
							[
								 [2.0, -2.0, 0.0, 1],
								 [2.0, 2.0, 0.0, 1]
							]
        ];


        var nurbsSurface = new CGFnurbsSurface(1, 1, controlvertexes);

        let plane = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, nurbsSurface); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)

        this.surface.push(plane);

    }

    display() {
        for (var i = 0; i < this.surface.length; i++) {
            this.scene.pushMatrix();


            this.surface[i].display();
            this.scene.popMatrix();
        }
    }

    updateBuffers(complexity) {
        this.slices = 4 + Math.round(16 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

}