/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, id, slices, height, radius) {
        super(scene);
        this.slices = slices;
        this.height = height;
        this.radius = radius;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {

            var sa = Math.sin(ang) * this.radius;
            var saa = Math.sin(ang + alphaAng) * this.radius;
            var ca = Math.cos(ang) * this.radius;
            var caa = Math.cos(ang + alphaAng) * this.radius;

            // vertices of the face of the prism
            this.vertices.push(ca, this.height, sa);
            this.vertices.push(ca, 0, sa);
            this.vertices.push(caa, this.height, saa);
            this.vertices.push(caa, 0, saa);

            // normals of the face of the prism
            this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));
            this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));

            // indices of the face of the prism
            this.indices.push(4 * i, (4 * i + 1), (4 * i + 2));
            this.indices.push((4 * i + 1), (4 * i + 3), (4 * i + 2));
            this.indices.push((4 * i + 2), (4 * i + 1), 4 * i);
            this.indices.push((4 * i + 2), (4 * i + 3), (4 * i + 1));

            // text cords of the face of the prism
            this.texCoords.push(i * 1.0 / this.slices, 0);
            this.texCoords.push(i * 1.0 / this.slices, 1);
            this.texCoords.push(i * 1.0 / this.slices + 1.0 / this.slices, 0);
            this.texCoords.push(i * 1.0 / this.slices + 1.0 / this.slices, 1);



            ang += alphaAng;
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