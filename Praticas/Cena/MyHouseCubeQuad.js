/**
* MyHouseCubeQuad
* @constructor
* @param scene - Reference to MyScene object
*/
class MyHouseCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {

        this.scene.quadHouse = new MyQuad(this.scene);

    }

    display() {

        this.scene.material.setTexture(this.scene.texture3);
        this.scene.gl.TEXTURE_2D;
        this.scene.material.apply();
      

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);

        this.scene.quadHouse.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        
        this.scene.quadHouse.display();
        this.scene.popMatrix();
        
        this.scene.material.setTexture(this.scene.texture7);
        this.scene.gl.TEXTURE_2D;
        this.scene.material.apply();
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        this.scene.quadHouse.display();
        this.scene.popMatrix();

        this.scene.material.setTexture(this.scene.texture8);
        this.scene.gl.TEXTURE_2D;
        this.scene.material.apply();
        
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        this.scene.quadHouse.display();
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);

        this.scene.quadHouse.display();
        this.scene.popMatrix();


        this.scene.material.setTexture(this.scene.texture6);
        this.scene.gl.TEXTURE_2D;
        this.scene.material.apply();
        

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);

        this.scene.quadHouse.display();
        this.scene.popMatrix();
    }
    
    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }
}
