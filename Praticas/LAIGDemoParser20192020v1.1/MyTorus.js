/**
* MyTorus
* @constructor
*/
class MyTorus extends CGFobject {
    constructor(scene, innerRadius, outerRadius, slices, loops) {
        super(scene);

        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.slices = slices;
        this.loops = loops;

        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var angLoop = 2 * Math.PI / this.loops;
        var angSlices = 2 * Math.PI / this.slices;

        var texHeight = 1 / this.slices;
        var texWidth = 1 / this.loops;

        var tempTexHeight;
        var tempTexWidth = 0;

        // Loop that creates the vertices, normals and texCoords of the Torus

        for (var angY = 0; angY <= 2 * Math.PI + angLoop / 2; angY += angLoop) {
            tempTexHeight = 1;
            for (var angT = 0; angT <= 2 * Math.PI + angSlices / 2; angT += angSlices) {
                this.vertices.push((this.outerRadius + this.innerRadius * Math.cos(angT)) * Math.cos(angY), (this.outerRadius + this.innerRadius * Math.cos(angT)) * Math.sin(angY), this.innerRadius * Math.sin(angT));
                this.normals.push(Math.cos(angT) * Math.cos(angY), Math.cos(angT) * Math.sin(angY), Math.sin(angT));
                this.texCoords.push(tempTexWidth + texWidth, tempTexHeight - texHeight);
                tempTexHeight -= texHeight;
            }
            tempTexWidth += texWidth;
        }

        var nVertices = this.vertices.length / 3 - (this.slices + 1);

        // Loop that creates indices for the torus

        for (var i = 0; i < nVertices; i++) {

            if ((i + 1) % (this.slices + 1) != 0) {
                this.indices.push(i, i + this.slices + 1, i + this.slices + 2);
                this.indices.push(i, i + this.slices + 2, i + 1);

                this.indices.push(i + this.slices + 2, i + this.slices + 1, i);
                this.indices.push(i + 1, i + this.slices + 2, i);
            }
        }

        //this.indices.push(549, );


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