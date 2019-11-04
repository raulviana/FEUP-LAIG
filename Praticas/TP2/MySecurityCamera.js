/**
 * MySecurityCamera
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param y - Scale of rectangle in Y
 */
class MySecurityCamera extends CGFobject {
	constructor(scene) {
		super(scene);
		
        this.securCamera = new MyRectangle(scene, 1, 0, 1, 0);

        this.shader = new CGFshader(this.scene.gl, "shader/securityCamera.vert", "shader/securityCamera.frag");
        
		this.initBuffers();
    }
    
    display() {

        // activate selected shader
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.securityTexture.bind(0);
        this.securCamera.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.defaultShader);
    }
}
