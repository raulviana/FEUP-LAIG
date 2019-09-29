/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, height, radius1, radius2) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.radius1 = radius1;
        //this.radius2 = radius2;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang;
        var alphaAng = 2 * Math.PI / this.slices;

        var stackHeight = this.height / this.stacks; //height of each stack of the cylinder
        var tempHeight = -this.height / 2; //this variable will save the height of the new stack


        console.log(this.slices);
        console.log(this.stacks);

        for (var j = 0; j < this.stacks; j++) {
        
            ang = 0;
            
            for (var i = 0; i < this.slices; i++) {

                var sa = Math.sin(ang) * this.radius1;
                var saa = Math.sin(ang + alphaAng) * this.radius1;
                var ca = Math.cos(ang) * this.radius1;
                var caa = Math.cos(ang + alphaAng) * this.radius1;

                // vertices of the face of the prism
                this.vertices.push(ca, sa, tempHeight + stackHeight);
                this.vertices.push(ca, sa, tempHeight);
                this.vertices.push(caa, saa, tempHeight + stackHeight);
                this.vertices.push(caa, saa, tempHeight);

                // normals of the face of the prism
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
                this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));
                this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));

                // indices of the face of the prism
                this.indices.push(4 * i + (this.slices * 2 * j), (4 * i + 1) + (this.slices * 2 * j), (4 * i + 2) + (this.slices * 2 * j));
                this.indices.push((4 * i + 1) + (this.slices * 2 * j), (4 * i + 3) + (this.slices * 2 * j), (4 * i + 2) + (this.slices * 2 * j));
                this.indices.push((4 * i + 2) + (this.slices * 2 * j), (4 * i + 1) + (this.slices * 2 * j), 4 * i + (this.slices * 2 * j));
                this.indices.push((4 * i + 2) + (this.slices * 2 * j), (4 * i + 3) + (this.slices * 2 * j), (4 * i + 1) + (this.slices * 2 * j));

                // text cords of the face of the prism
                this.texCoords.push(i * 1.0 / this.slices, 0);
                this.texCoords.push(i * 1.0 / this.slices, 1);
                this.texCoords.push(i * 1.0 / this.slices + 1.0 / this.slices, 0);
                this.texCoords.push(i * 1.0 / this.slices + 1.0 / this.slices, 1);

                ang += alphaAng;
                
                console.log(this.vertices.length);
                console.log(this.normals.length);
                console.log(this.indices.length);
                console.log(this.texCoords.length);
            }
            tempHeight = tempHeight + stackHeight;
            
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