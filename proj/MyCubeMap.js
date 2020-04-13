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
        for(var i = 0; i < 4; i++){
            this.scene.pushMatrix();
            if(i % 2 == 0) this.scene.translate(factor * 0.5,0,0); 
            else this.scene.translate(0,0,factor * 0.5); 
            this.scene.rotate(graToRad(ang),0,1,0);
            this.face.updateTexCoords([i*0.25, 2/3, (i+1)*0.25, 2/3, i*0.25, 1/3, (i+1)*0.25, 1/3 ]);
            this.face.display();
            this.scene.popMatrix();
            ang -= 90;
            if(i >= 1) factor = 1;
        }

        ang = 0; // As Auxiliary Variable now
        for(var i = 0; i < 2; i++){
            this.scene.pushMatrix();
            this.scene.translate(0,factor*0.5,0);
            this.scene.rotate(graToRad(factor*90),1,0,0);
            this.face.updateTexCoords([0.25, 1/3 + ang, 0.5, 1/3 + ang, 0.25, 0 + ang, 0.5, 0 + ang]);
            this.face.display();
            this.scene.popMatrix();
            factor = -1;
            ang = 2/3;
        }

        this.scene.popMatrix();
    }
}