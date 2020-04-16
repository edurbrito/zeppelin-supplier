/**
* MyCubeMap
* @constructor
* @param scene - Reference to MyScene object
*/
class MyCubeMap extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.face = new MyQuad(this.scene);
	}
	display() {
        this.scene.scenes[this.scene.selectedScene].apply();

        this.scene.pushMatrix();
        this.scene.scale(50,50,50);

        var ang = 90;
        var factor = -1;
        for(var i = 0; i < 4; i++){ // Creating the Side Faces
            this.scene.pushMatrix();

            if(i % 2 == 0) this.scene.translate(factor * 0.5,0,0); // Translating to the left or the right position
            else this.scene.translate(0,0,factor * 0.5); // Translating to the front or the back position

            this.scene.rotate(graToRad(ang),0,1,0); // Rotating in Y, accordingly to the angle 

            this.face.updateTexCoords([i*0.25, 2/3, (i+1)*0.25, 2/3, i*0.25, 1/3, (i+1)*0.25, 1/3 ]); // Assigning the respective texCoordinates 
            this.face.display(); // Drawing the current face on the screen

            this.scene.popMatrix(); // Saving the scene state

            ang -= 90;
            if(i >= 1) factor = 1;
        }

        ang = 0; // As Auxiliary Variable now

        for(var i = 0; i < 2; i++){ // Creating the Top and Bottom Faces
            this.scene.pushMatrix();

            this.scene.translate(0,factor*0.5,0); // Translating to the top or the bottom position
            this.scene.rotate(graToRad(factor*90),1,0,0); // Rotating in X, accordingly to the angle & the factor

            this.face.updateTexCoords([0.25, 1/3 + ang, 0.5, 1/3 + ang, 0.25, 0 + ang, 0.5, 0 + ang]); // Assigning the respective texCoordinates 
            this.face.display(); // Drawing the current face on the screen

            this.scene.popMatrix(); // Saving the scene state

            factor = -1;
            ang = 2/3;
        }

        this.scene.popMatrix();
    }
}
