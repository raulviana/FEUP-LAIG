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

        this.vertices.push(0, 0, -this.radius);
        this.vertices.push(0, 0, this.radius);
        this.normals.push(0, 0, -1);
        this.normals.push(0, 0, 1);

        for (var angT = -Math.PI/2 + angStacks; angT < Math.PI/2; angT += angStacks) {
            for (var angY = 0; angY <= 2 * Math.PI; angY += angSlices) {
                this.vertices.push(this.radius * Math.cos(angT) * Math.cos(angY), this.radius * Math.cos(angT) * Math.sin(angY), this.radius * Math.sin(angT));
                this.normals.push(Math.cos(angT) * Math.cos(angY), Math.cos(angT) * Math.sin(angY), Math.sin(angT))
            }
        }

        /*for (var angY = 0; angY <= 2 * Math.PI; angY += angSlices) {
            for (var angT = -Math.PI/2 + angStacks; angT < Math.PI/2; angT += angStacks) {
                this.vertices.push(this.radius * Math.cos(angT) * Math.cos(angY), this.radius * Math.cos(angT) * Math.sin(angY), this.radius * Math.sin(angT));
                this.normals.push(Math.cos(angT) * Math.cos(angY), Math.cos(angT) * Math.sin(angY), Math.sin(angT))
            }
        }*/

        var nVertices = this.vertices.length/3 - this.slices - 1;

        console.log(this.vertices.length);
        console.log(nVertices);

        for (var i = 0; i < this.slices; i++) {
            this.indices.push(1, nVertices + i, nVertices + i + 1);
            //this.indices.push(nVertices + i + 1, nVertices + i, 1);
        }

        for (var i = 0; i < this.slices; i++) {
            this.indices.push(i + 2 + 1, i + 2, 0);
        }



        for (var i = 2; i <= ((this.stacks - 1) * 2) * (this.slices + 1); i++) {
            this.indices.push(i, i + 1, i + this.slices + 1);

            this.indices.push(i + 1, i + this.slices + 2, i + this.slices + 1);
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