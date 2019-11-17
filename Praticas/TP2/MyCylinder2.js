/**
* MyCylinder2
* @constructor
*/
class MyCylinder2 extends CGFobject {
    constructor(scene, slices, stacks, height, radius1, radius2) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.radius1 = radius1;
        this.radius2 = radius2;
        this.surface = [];
        this.makeSurface();
    }

    makeSurface() {

        let p = Math.sqrt(2) / 2;

        let controlvertexes = [
							[[0, -this.radius2, 0, 1], [0, -this.radius1, this.height, 1]],
                            [[-this.radius2, -this.radius2, 0, p], [-this.radius1, -this.radius1, this.height, p]],
                            [[-this.radius2, 0, 0, 1], [-this.radius1, 0, this.height, 1]],
                            [[-this.radius2, this.radius2, 0, p], [-this.radius1, this.radius1, this.height, p]],
                            [[0, this.radius2, 0, 1], [0, this.radius1, this.height, 1]],
                            [[this.radius2, this.radius2, 0, p], [this.radius1, this.radius1, this.height, p]],
                            [[this.radius2, 0, 0, 1], [this.radius1, 0, this.height, 1]],
                            [[this.radius2, -this.radius2, 0, p], [this.radius1, -this.radius1, this.height, p]],
                            [[0, -this.radius2, 0, 1], [0, -this.radius1, this.height, 1]]
        ];


        var nurbsSurface = new CGFnurbsSurface(8, 1, controlvertexes);

        let cyl = new CGFnurbsObject(this.scene, this.slices, this.stacks, nurbsSurface); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)

        this.surface.push(cyl);

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