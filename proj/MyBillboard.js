/**
* MyBillboard
* @constructor
* @param scene - Reference to MyScene object
*/
class MyBillboard extends CGFobject{
   constructor(scene) {
      super(scene);
      this.plane = new MyPlane(this.scene,1);
      this.progressBar = new MyPlane(this.scene,10);
      this.bar1 = new MyPlane(this.scene,10);
      this.bar2 = new MyPlane(this.scene,10);
  }

  display(){

   this.scene.pushMatrix();

   this.scene.translate(-2,0,-8);
   this.scene.scale(4,4,4);
   this.scene.rotate(Math.PI / 6,0,1,0);

     // Display Plane
     this.scene.pushMatrix();
     this.scene.translate(0,1.5,0);
     this.scene.scale(2,1,1);
     this.scene.billboardMaterial.apply();
     this.plane.display();
     this.scene.popMatrix();

     // Display progress Bar
     this.scene.pushMatrix();
     this.scene.translate(0.0,1.3,0.01);
     this.scene.scale(1.5,0.2,1);
     this.scene.setActiveShader(this.scene.billboardShader);
     this.plane.display();
     this.scene.popMatrix();

     this.scene.setActiveShader(this.scene.defaultShader);

     // Display Bars
     this.scene.pushMatrix();
     this.scene.translate(0.95,0.5,0);
     this.scene.scale(0.1,1,1);
     this.scene.barMaterial.apply();
     this.plane.display();
     this.scene.popMatrix();

     this.scene.pushMatrix();
     this.scene.translate(-0.95,0.5,0);
     this.scene.scale(0.1,1,1);
     this.scene.barMaterial.apply();
     this.plane.display();
     this.scene.popMatrix();

     this.scene.popMatrix();
  }
}