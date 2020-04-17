/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        var sa, ca;
        // Last vertices need to be repeated for the cylinder to close
        for(var i = 0; i <= this.slices; i++){

            sa = Math.sin(ang);
            ca = Math.cos(ang);
            
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(ca, 1,-sa);
            
            this.normals.push(ca, 0, -sa);
            this.normals.push(ca, 0,-sa);

            ang += alphaAng;
        }

        /*
            i+1_____i+3
              |     |
              |     |
              i_____i+2
        */

        var i = 0;
        for(var j = 0; j < this.slices; j++){
            this.indices.push(i, (i+2), (i+1));
            this.indices.push((i+1), (i+2), (i+3));
            i += 2;
        }
                
        var side = 1 / (this.slices);
        for(var i = 0; i <= this.slices; i++){
            this.texCoords.push(i*side, 1);
            this.texCoords.push(i*side, 0);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}   