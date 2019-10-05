/**
* MySphere
* @constructor
*/
class MySphere extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);

        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
    
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];


        var angStacks = (Math.PI / 2) / this.stacks;
        var angSlices = 2 * Math.PI / this.slices;

        var texHeight = 1 / (this.stacks * 2);
        var texWidht = 1/this.slices;
        var tempS = 0;
        var tempT;

       
        for (var angY = 0; angY <= 2 * Math.PI; angY += angSlices) {
            tempT = 1
            for (var angT = -Math.PI/2; angT <= Math.PI/2; angT += angStacks) {
                this.vertices.push(this.radius * Math.cos(angT) * Math.cos(angY), this.radius * Math.cos(angT) * Math.sin(angY), this.radius * Math.sin(angT));
                this.normals.push(Math.cos(angT) * Math.cos(angY), Math.cos(angT) * Math.sin(angY), Math.sin(angT));
                this.texCoords.push(tempS, tempT);
                tempT -= texHeight;
            }
            tempS += texWidht;
        }

        var nVertices = this.vertices.length / 3;
        var verticesToSee = nVertices - (2*this.stacks + 1);

        for (var i = 0; i < verticesToSee; i++) {

            if ((i+ 1) % (2 * this.stacks + 1) != 0) {

                this.indices.push(i, i + 2 * this.stacks + 1, i + 2 * this.stacks + 2);
                this.indices.push(i + 2 * this.stacks + 2, i + 2 * this.stacks + 1, i);

                this.indices.push(i, i + 2 * this.stacks + 2, i + 1);
                this.indices.push(i + 1, i + 2 * this.stacks + 2, i);
            }
        }


       

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