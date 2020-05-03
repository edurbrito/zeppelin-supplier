class MyTerrain extends CGFobject{
   constructor(scene) {
      super(scene);
      this.plane = new MyPlane(scene,20);
  }

   display() {
      this.scene.pushMatrix();
      this.scene.translate(0,-24.9,0);
      this.scene.scale(50,50,50);
      this.scene.rotate(-Math.PI / 2,1,0,0);
      this.plane.display();
      this.scene.popMatrix();
   }

}