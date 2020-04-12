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
        this.vertices = [];
        this.indices = [];
        this.normals = [];

		var c = 0.5;

		for(var k=0; k<3; k++){ //cada vértice tem 3 normais pois pertence a 3 faces diferentes
            // Front
            this.vertices.push(-c,c,c);
            this.vertices.push(-c,-c,c);

            // Right
            this.vertices.push(c,c,c);
            this.vertices.push(c,-c,c);

            // Back
            this.vertices.push(c,c,-c);
            this.vertices.push(c,-c,-c);

            // Left
            this.vertices.push(-c,c,-c);
            this.vertices.push(-c,-c,-c);
		}

        var nVertices = 8;

        // Sides
        for(var i=0 ; i < nVertices;i+=2){
            this.indices.push(i);
            this.indices.push(i+2);
            this.indices.push((i+3) % nVertices);
            this.indices.push((i+3) % nVertices);
            this.indices.push(i+1);
            this.indices.push(i);
        }
        
        // Top
        this.indices.push(2,0,6);
        this.indices.push(6,4,2);

        // Bottom
        this.indices.push(5,7,1);
        this.indices.push(1,3,5);

        // Top & Bottom
		for(var i = 0; i<nVertices/2; i++){
            this.normals.push(0,1,0);
            this.normals.push(0,-1,0);
        }

        // Sides
        for(var i = 0; i<nVertices/2; i++)
            this.normals.push(0,0,1);

        for(var i = 0; i<nVertices/2; i++)
            this.normals.push(0,0,-1);
            
        for(var i = 0; i<2; i++)
            this.normals.push(-1,0,0);

        for(var i = 0; i<2; i++)
            this.normals.push(1,0,0);
        
        for(var i = 0; i<2; i++)
            this.normals.push(1,0,0);
            
        for(var i = 0; i<2; i++)
            this.normals.push(-1,0,0);

        this.texCoords = [
            
            0, 1/3, // 0
            0, 2/3, // 1
            0.75, 1/3, // 2
            0.75, 2/3, // 3
            0.5, 1/3, // 4
            0.5, 2/3, // 5
            0.25, 1/3,   // 6
            0.25, 2/3,   // 7

            1, 1/3, // 0
            1, 2/3, // 1
            0.75, 1/3, // 2
            0.75, 2/3, // 3
            0.5, 1/3, // 4
            0.5, 2/3, // 5
            0.25, 1/3,   // 6
            0.25, 2/3,   // 7

            0.25, 0, // 0
            0.25, 1, // 1
            0.5, 0, // 2
            0.5, 1, // 3
            

        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
    
    display(){
        this.scene.pushMatrix();
        this.scene.scale(20,20,20);
        this.scene.scene1Material.apply();
        super.display();
        this.scene.popMatrix();
    }
}