/**
* MyPatch
* @constructor
*/
class MyPatch extends CGFobject {
    constructor(scene, npointsU, npointsV, npartsU, npartsV, controlPoints) {
        super(scene);
        this.npointsU = npointsU;
        this.npointsV = npointsV;
        this.npartsU = npartsU;
        this.npartsV = npartsV;
        this.controlPoints = controlPoints;

        this.surface = [];
        this.makeSurface();
    }

    makeSurface() {

        let controlvertexes = [];

        for(let i = 0; i < this.npointsU; i++) {
            let empty = [];
            controlvertexes.push(empty);
        }
        
        let k = 0;
        for(let i = 0; i < this.controlPoints.length; i++) {
            controlvertexes[k].push(this.controlPoints[i]);
            if(((i+1) % this.npointsV) == 0){
                k++;
            }
        }
		var nurbsSurface = new CGFnurbsSurface(this.npointsU - 1, this.npointsV - 1, controlvertexes);

		let patch = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, nurbsSurface ); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)
		
		this.surface.push(patch);
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