class MyTerrain extends MyPlane {
   constructor(scene) {
      super(scene,20);
  }

   display() {
      this.scene.pushMatrix();
		
		this.scene.terrainMaterial.apply();
		this.scene.setActiveShader(this.scene.terrainShader);
		this.scene.terrainTextureP.bind(0);
      this.scene.terrainTextureH.bind(1);
      
		this.scene.pushMatrix();
      this.scene.translate(0,-24.9,0);
      this.scene.scale(50,50,50);
      this.scene.rotate(-Math.PI / 2,1,0,0);
      super.display();
      this.scene.popMatrix();

      this.scene.popMatrix();
   }
}