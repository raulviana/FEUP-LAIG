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

        this.shader = new CGFshader(this.scene.gl, "./shaders/securityCamera.vert", "./shaders/securityCamera.frag");
        this.shader.setUniformsValues({ uSampler: 0 });
       
       
        
        this.initBuffers();
    }

    updateTime(t){
        this.shader.setUniformsValues({ timeFactor: t / 100 % 1000});
    }
    
    display() {

        
        this.scene.setActiveShader(this.shader);     // activate selected shader
        
        this.scene.pushMatrix();
        
        this.scene.secTexture.bind(0);              // bind RTTtexture
        
        this.securCamera.display();                 //display retangle

        this.scene.popMatrix();
    }
}
