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
            // z = c
            -c,c,c,     // 0
            -c,-c,c,    // 1
            c,c,c,      // 2
            c,-c,c,     // 3

            // x = c
            c,c,c,      // 4
            c,-c,c,     // 5
            c,c,-c,     // 6
            c,-c,-c,    // 7

            // z = -c
            c,c,-c,     // 8
            c,-c,-c,    // 9
            -c,c,-c,    // 10
            -c,-c,-c,   // 11 

            // x = -c
            -c,c,-c,    // 12
            -c,-c,-c,   // 13
            -c,c,c,     // 14
            -c,-c,c,    // 15

            // y = c  
            c,c,c,      // 16
            c,c,-c,     // 17
            -c,c,c,     // 18
            -c,c,-c,    // 19

            // y = -c
            c,-c,-c,    // 20
            c,-c,c,     // 21
            -c,-c,-c,   // 22
            -c,-c,c     // 23
        ];

        for(var i=0 ; i < 24  ;i+=4){
            this.indices.push(i);
            this.indices.push(i+2);
            this.indices.push(i+3);
            this.indices.push(i+3);
            this.indices.push(i+1);
            this.indices.push(i);
        }

        // z = c
        for(var i = 0 ; i <4 ;i++)
            this.normals.push(0,0,-1);

        // x = c
        for(var i =0 ; i <4 ;i++)
            this.normals.push(-1,0,0);

        // z = -c
        for(var i =0 ; i <4 ;i++)
            this.normals.push(0,0,1);

        // x = -c
        for(var i =0 ; i <4 ;i++)
            this.normals.push(1,0,0);

        // y = c
        for(var i =0 ; i <4 ;i++)
            this.normals.push(0,-1,0); 
            
        // y = -c
        for(var i =0 ; i <4 ;i++)
            this.normals.push(0,1,0);

        this.texCoords = [
            // z = c
            1, 1/3,      // 0
            1, 2/3,      // 1
            0.75, 1/3,   // 2
            0.75, 2/3,   // 3

            // x = c
            0.75, 1/3,   // 4
            0.75, 2/3,   // 5
            0.5, 1/3,    // 6
            0.5, 2/3,    // 7

            // z = -c
            0.5, 1/3,    // 8
            0.5, 2/3,    // 9
            0.25, 1/3,   // 10
            0.25, 2/3,   // 11 

            // x = -c
            0.25, 1/3,   // 12
            0.25, 2/3,   // 13
            0, 1/3,      // 14
            0, 2/3,      // 15

            // y = c  
            0.5, 0,      // 16
            0.5, 1/3,    // 17
            0.25, 0,     // 18
            0.25, 1/3,   // 19

            // y = -c
            0.5, 2/3,    // 20
            0.5, 1,      // 21
            0.25, 2/3,   //22
            0.25, 1      //23
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
    
    display(){
        this.scene.pushMatrix();
        this.scene.scale(50,50,50);
        this.scene.scenes[this.scene.selectedScene].apply();
        super.display();
        this.scene.popMatrix();
    }
}
