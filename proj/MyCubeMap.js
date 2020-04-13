/**
* MyCubeMap
* @constructor~
* @param scene - Reference to MyScene object
*/
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
        this.indices = [];
        this.normals = [];

		var c = 0.5;

		this.vertices = [
            -c,  c, c,  // 0
             c,  c, c,  // 1
            -c, -c, c,  // 2
             c, -c, c,  // 3
             c,  c, -c, // 4
             c, -c, -c, // 5
            -c, c, -c,  // 6
            -c, -c, -c,  // 7
            
            -c, c, -c,  // 6
            -c, -c, -c,  // 7

            c,  c, -c, // 4
            -c, c, -c,  // 6

            c, -c, -c, // 5
            -c, -c, -c,  // 7
        ];

        this.indices = [
            0,1,2,
            1,3,2,

            1,4,3,
            4,5,3,
            
            4,6,5,
            6,7,5,
            
            6,0,7,
            0,2,7,
            
            0,6,1,
            1,6,4,
            
            2,3,7,
            3,5,7
        ];

        for(var i = 0; i < 8; i++){
            for (var j = 0 + 3*i; j < 3 + 3*i ; j++ )
                this.normals.push(this.vertices[j] * (-1));
        }

        this.texCoords = [
            0.25,1/3,
            0.5, 1/3,
            0.25, 2/3,
            0.5, 2/3,
            0.75, 1/3,
            0.75, 2/3,
            1, 1/3,
            1, 2/3, 

            0, 1/3,
            0, 2/3,

            0.5, 0,
            0.25, 0,

            0.5, 1,
            0.25, 1
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
    
    display(){
        this.scene.pushMatrix();
        this.scene.scale(10,10,10);
        this.scene.scenes[this.scene.selectedScene].apply();
        super.display();
        this.scene.popMatrix();
    }
}