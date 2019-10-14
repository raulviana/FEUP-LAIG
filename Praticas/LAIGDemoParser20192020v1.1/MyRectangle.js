/**
 * MyRectangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param y - Scale of rectangle in Y
 */
class MyRectangle extends CGFobject {
	constructor(scene, x1, x2, y1, y2) {
		super(scene);
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;

		this.initBuffers();
	}
	
	initBuffers() {
		/*this.vertices = [
			this.x1, this.y1, 0,	//0
			this.x2, this.y1, 0,	//1
			this.x1, this.y2, 0,	//2
			this.x2, this.y2, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];*/
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		/*this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]*/

		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		this.indices = [];

		var yDif = (this.y2 - this.y1) / 10;
		var xDif = (this.x2 - this.x1) / 10;
		
		for (var i = 0; i < 11; i++) {
			for (var j = 0; j < 11; j++) {
				this.vertices.push(this.x1 + j * xDif, this.y1 + i * yDif, 0);
				this.normals.push(0, 0, 1);
				this.texCoords.push(0.1 * j, 1 - 0.1 * i);
			}
		}

		for(var i = 0; i < 110; i++) {
			if((i+1) % 11 != 0) {
				this.indices.push(i, i + 1, i + 12);
				this.indices.push(i + 12, i + 1, i);

				this.indices.push(i, i + 12, i + 11);
				this.indices.push(i + 11, i + 12, i);
			}
		}


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		console.log("coords:");
		console.log(coords);
		var minS = 0;
    	var minT = 0;
    	var maxS = (this.x2 - this.x1) / coords[0];
    	var maxT = (this.y1 - this.y2) / coords[1];

    this.texCoords = [
        minS, maxT,
        maxS, maxT,
        minS, minT,
        maxS, minT
    ];

    this.updateTexCoordsGLBuffers();
	}
}

