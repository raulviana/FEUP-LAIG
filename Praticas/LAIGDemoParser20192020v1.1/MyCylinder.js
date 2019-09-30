/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
<<<<<<< HEAD
    constructor(scene, id, slices, stacks, height, radius1, radius2) {
=======
    constructor(scene, slices, stacks, height, radius1, radius2) {
>>>>>>> bae01c1c85732498e51168ec9b36d2f78347d0de
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.radius1 = radius1;
        this.radius2 = radius2;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang;
        var alphaAng = 2 * Math.PI / this.slices;

<<<<<<< HEAD
        var stackHeight = this.height / this.stacks; //height of each stack of the cylinder
        var tempHeight = 0; //this variable will save the height of the new stack
 
=======
        // Used to build stacks
        var stackHeight = this.height / this.stacks; //height of each stack of the cylinder
        var tempHeight = 0; //this variable will save the height of the new stack
 
        // Used to build different radius's
>>>>>>> bae01c1c85732498e51168ec9b36d2f78347d0de
        var radiusDif = this.radius2 - this.radius1;
        var radiusPerStack = radiusDif / this.stacks;
        var radiusTemp = this.radius1;

<<<<<<< HEAD
=======
        // Used to build texture graph
        var texHeight = 1/this.stacks;
        var texLenght = 1/this.slices;
>>>>>>> bae01c1c85732498e51168ec9b36d2f78347d0de

        for (var j = 0; j < this.stacks; j++) {
        
            ang = 0;
            
            for (var i = 0; i < this.slices; i++) {

                var sa = Math.sin(ang) * radiusTemp;
                var saa = Math.sin(ang + alphaAng) * radiusTemp;
                var ca = Math.cos(ang) * radiusTemp;
                var caa = Math.cos(ang + alphaAng) * radiusTemp;

                var sa2 = Math.sin(ang) * (radiusTemp + radiusPerStack);
                var saa2 = Math.sin(ang + alphaAng) * (radiusTemp + radiusPerStack);
                var ca2 = Math.cos(ang) * (radiusTemp + radiusPerStack);
                var caa2 = Math.cos(ang + alphaAng) * (radiusTemp + radiusPerStack);

                // vertices of the face of the cylinder
                this.vertices.push(ca2, sa2, tempHeight + stackHeight);
                this.vertices.push(ca, sa, tempHeight);
                this.vertices.push(caa2, saa2, tempHeight + stackHeight);
                this.vertices.push(caa, saa, tempHeight);

                // normals of the face of the cylinder
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
                this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));
                this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));

                // indices of the face of the cylinder
                this.indices.push(4 * i + (this.slices * 4 * j), (4 * i + 1) + (this.slices * 4 * j), (4 * i + 2) + (this.slices * 4 * j));
                this.indices.push((4 * i + 1) + (this.slices * 4 * j), (4 * i + 3) + (this.slices * 4 * j), (4 * i + 2) + (this.slices * 4 * j));
                this.indices.push((4 * i + 2) + (this.slices * 4 * j), (4 * i + 1) + (this.slices * 4 * j), 4 * i + (this.slices * 4 * j));
                this.indices.push((4 * i + 2) + (this.slices * 4 * j), (4 * i + 3) + (this.slices * 4 * j), (4 * i + 1) + (this.slices * 4 * j));

                // text cords of the face of the cylinder
<<<<<<< HEAD
                this.texCoords.push(i * 1.0 / this.slices, 0);
                this.texCoords.push(i * 1.0 / this.slices, 1);
                this.texCoords.push(i * 1.0 / this.slices + 1.0 / this.slices, 0);
                this.texCoords.push(i * 1.0 / this.slices + 1.0 / this.slices, 1);

                ang += alphaAng;
                
            }
            tempHeight += stackHeight;
            radiusTemp += radiusPerStack;
            
=======
                var tempTexS = 0;
                var tempTexT = 1;

                this.texCoords.push(tempTexS, tempTexT - texHeight);
                this.texCoords.push(tempTexS, tempTexT);
                this.texCoords.push(tempTexS + texLenght, tempTexT - texHeight);
                this.texCoords.push(tempTexS + texLenght, tempTexT - texHeight);

                ang += alphaAng;
                tempTexS += texLenght;
                
            }
            tempHeight += stackHeight;
            
            radiusTemp += radiusPerStack;
            
            tempTexS = 0;
            tempTexT -= texHeight;
>>>>>>> bae01c1c85732498e51168ec9b36d2f78347d0de
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