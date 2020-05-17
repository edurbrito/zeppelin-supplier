/**
* MySupply
* @constructor
* @param scene - Reference to MyScene object
*/

const SupplyStates = {
   INACTIVE: 0,
   FALLING: 1,
   LANDED: 2
};

class MySupply extends CGFobject {
   
	constructor(scene) {
        super(scene);

        this.face = new MyQuad(this.scene);
        
        this.side = 1;
        this.last_t = 0;
        this.speed = 0;
        this.fallTime = 3;
        this.dropPosition = [0, 0, 0];
        this.state = SupplyStates.INACTIVE;
   }
   
	display() {
      if(this.state == SupplyStates.FALLING){
         this.displayFalling();
      }
      else if(this.state == SupplyStates.LANDED){
         this.displayOnLanded();
      }
   }

   update(t){
   
      var delta_t = (t-this.last_t)/1000; // Time in seconds

      if(this.state == SupplyStates.FALLING){
         this.dropPosition[1] += this.speed * delta_t;

         // Y = 0 >> End falling animation and start landing
         if(this.dropPosition[1] <= this.side/2){
            this.dropPosition[1] = this.side/2;
            this.land();
         }

      }  
      this.last_t = t;
   }

   drop(dropPosition){
      this.state = SupplyStates.FALLING;
      this.dropPosition[0] = dropPosition[0];
      this.dropPosition[1] = dropPosition[1];
      this.dropPosition[2] = dropPosition[2];

      var distance = (this.dropPosition[1] - this.side / 2);
      this.speed = - distance / this.fallTime;
   }

   land(){
      this.state = SupplyStates.LANDED;
   }

   displayFalling(){

      this.scene.pushMatrix();

      this.scene.woodMaterial.apply();
      
      this.scene.scale(this.side,this.side,this.side);
      this.scene.translate(this.dropPosition[0],this.dropPosition[1],this.dropPosition[2]);

      var ang = -90;
      var factor = -1;

      for(var i = 0; i < 4; i++){ // Creating the Side Faces
         this.scene.pushMatrix();

         if(i % 2 == 0) this.scene.translate(factor * 0.5,0,0); // Translating to the left or the right position
         else this.scene.translate(0,0,factor * 0.5); // Translating to the front or the back position

         this.scene.rotate(degreesToRad(ang),0,1,0); // Rotating in Y, accordingly to the angle 

         this.face.updateTexCoords([i*0.25, 2/3, (i+1)*0.25, 2/3, i*0.25, 1/3, (i+1)*0.25, 1/3 ]); // Assigning the respective texCoordinates 
         
         this.face.display(); // Drawing the current face on the screen

         this.scene.popMatrix(); // Saving the scene state

         ang -= 90;
         if(i >= 1) factor = 1;
      }

      var aux = 0; // As Auxiliary Variable

      for(var i = 0; i < 2; i++){ // Creating the Top and Bottom Faces
         this.scene.pushMatrix();

         this.scene.translate(0,factor*0.5,0); // Translating to the top or the bottom position
         this.scene.rotate(degreesToRad(-factor*90),1,0,0); // Rotating in X, accordingly to the angle & the factor

         this.face.updateTexCoords([0.25, 1/3 + aux, 0.5, 1/3 + aux, 0.25, 0 + aux, 0.5, 0 + aux]); // Assigning the respective texCoordinates 

         this.face.display(); // Drawing the current face on the screen

         this.scene.popMatrix(); // Saving the scene state

         factor = -1;
         aux = 2/3;
      }

      this.scene.popMatrix();
   }

   reset(){
      this.state = SupplyStates.INACTIVE;
      this.dropPosition = [0, 0, 0];
      this.speed = 0;
   }
   
   displayOnLanded(){

      this.scene.pushMatrix();
      
      this.scene.woodMaterial.apply();

      this.scene.scale(this.side,this.side,this.side);
      this.scene.translate(this.dropPosition[0],this.dropPosition[1],this.dropPosition[2]);

      var angY = -180;
      var angX = -90;
      var factor = -1;

      for(var i = 0; i < 4; i++){ // Creating the Side Faces
         this.scene.pushMatrix();

         this.scene.translate(0,-0.5,0);

         if(i % 2 == 0) this.scene.translate(factor,0,0); // Translating to the left or the right position
         else this.scene.translate(0,0,factor); // Translating to the front or the back position

         this.scene.rotate(degreesToRad(angY),0,1,0); // Rotating in Y, accordingly to the angle 

         this.scene.rotate(degreesToRad(angX),1,0,0); // Rotating in X, accordingly to the angle

         this.face.updateTexCoords([i*0.25, 2/3, (i+1)*0.25, 2/3, i*0.25, 1/3, (i+1)*0.25, 1/3 ]); // Assigning the respective texCoordinates 
         this.face.display(); // Drawing the current face on the screen

         this.scene.popMatrix(); // Saving the scene state

         angY -= 90;
         if(i >= 1) factor = 1;
      }

      // Creating the Bottom Face

      angY = 0; // As Auxiliary Variable now
      factor = -1;

      this.scene.pushMatrix();

      this.scene.translate(0,factor*0.5,0); // Translating to the top or the bottom position

      this.scene.rotate(degreesToRad(angX),0,1,0); // Rotating in Y, accordingly to the angle

      this.scene.rotate(degreesToRad(factor*90),1,0,0); // Rotating in X, accordingly to the angle & the factor

      this.face.updateTexCoords([0.25, 1/3 + angY, 0.5, 1/3 + angY, 0.25, 0 + angY, 0.5, 0 + angY]); // Assigning the respective texCoordinates 
      this.face.display(); // Drawing the current face on the screen

      this.scene.popMatrix(); // Saving the scene state


      // Creating the Top Face

      angY = -45;

      this.scene.pushMatrix();

      this.scene.translate(1,factor*0.5+0.01,0.5); // Translating to the top or the bottom position

      this.scene.rotate(degreesToRad(angY),0,1,0); // Rotating in Y, accordingly to the angle

      this.scene.rotate(degreesToRad(factor*90),1,0,0); // Rotating in X, accordingly to the angle & the factor

      this.face.updateTexCoords([0.25, 1/3 + angY, 0.5, 1/3 + angY, 0.25, 0 + angY, 0.5, 0 + angY]); // Assigning the respective texCoordinates 
      this.face.display(); // Drawing the current face on the screen

      this.scene.popMatrix(); // Saving the scene state

      this.scene.popMatrix();
   }

   enableNormalViz(){
      this.face.enableNormalViz();
   }

   disableNormalViz(){
      this.face.disableNormalViz();
   }
}
