/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
		this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new Plane(this, 32);
		this.octoPiece = new MyOctoPiece(this);
		this.squarePiece = new MySquarePiece(this);

        //Objects connected to MyInterface
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.setShininess(10.0);
    }
	initMaterials() {
        // White Piece
        this.whiteMaterial = new CGFappearance(this);
        this.whiteMaterial.setAmbient(1, 1, 1, 1.0);
        this.whiteMaterial.setDiffuse(1, 1, 1, 1.0);
        this.whiteMaterial.setSpecular(1, 1, 1, 1.0);
        this.whiteMaterial.setShininess(10.0);

        // Black Piece
        this.blackMaterial = new CGFappearance(this);
        this.blackMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.blackMaterial.setDiffuse(0, 0, 0, 1.0);
        this.blackMaterial.setSpecular(0, 0, 0, 1.0);
        this.blackMaterial.setShininess(10.0);
	}
    update(t){

    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.pushMatrix();
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.plane.display();
        this.popMatrix();

		
		this.pushMatrix();
		this.whiteMaterial.apply();
		this.rotate(Math.PI/8,0,1,0);
		this.octoPiece.display();
		this.popMatrix();

		this.pushMatrix();
		this.blackMaterial.apply();
		this.translate(1.84791, 0, 0);
		this.rotate(Math.PI/8,0,1,0);
		this.octoPiece.display();
		this.popMatrix();

		this.pushMatrix();
		this.whiteMaterial.apply();
		this.translate(1.84791, 0, 1.84791);
		this.rotate(Math.PI/8,0,1,0);
		this.octoPiece.display();
		this.popMatrix();

		this.pushMatrix();
		this.blackMaterial.apply();
		this.translate(0, 0, 1.84791);
		this.rotate(Math.PI/8,0,1,0);
		this.octoPiece.display();
		this.popMatrix();

		

		this.pushMatrix();
		this.whiteMaterial.apply();
		this.translate(0.923955, 0, 0.923955);
		this.rotate(Math.PI/4, 0, 1, 0);
		this.squarePiece.display();
		this.popMatrix();
        // ---- END Primitive drawing section
    }
}