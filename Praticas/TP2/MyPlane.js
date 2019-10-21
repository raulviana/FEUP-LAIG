/**
* MyPlane
* @constructor
*/
class MyPlane extends CGFobject {
    constructor(scene, npartsU, npartsV) {
        super(scene);
        this.uParts = npartsU;
        this.vParts = npartsV;
     
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Creates vertices, normals and texCoords
        var cou = 0;
        for(var i = 0; i < this.uParts+1; i++) {
            for(var j = 0; j < this.vParts+1; j++) {
                this.vertices.push(-0.5 + j/this.vParts,0,-0.5 + i/this.uParts);
                cou++;
            }
        }

        // Creates indices

		for(var i = 0; i < ((this.uParts+1)*(this.vParts+1) - (this.vParts+1)); i++) {
			if((i+1) % (this.vParts + 1) != 0) {
				this.indices.push(i + this.vParts + 2, i + 1, i);
                this.indices.push(i, i + this.vParts + 1, i + this.vParts + 2)

			}
		}
        console.log(cou);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity) {
        this.slices = 4 + Math.round(16 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

}