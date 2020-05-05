/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.loadMaterials();

        // Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this,30,10);
        this.vehicle = new MyVehicle(this);
        this.supplies = new Array();
        this.nSuppliesDelivered = 0;
        this.nSupplies = 5;
        for (var i = 0; i < this.nSupplies; i++)
            this.supplies.push(new MySupply(this));

        this.objects = [this.cylinder,this.incompleteSphere, this.vehicle];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 'Cylinder': 0 , 'Sphere': 1, 'Vehicle': 2};

        // Labels and ID's for scene selection on MyInterface
        this.sceneIDs = { 'Scene1': 0 , 'Scene2': 1, 'Scene3': 2};

        // Objects connected to MyInterface
        this.cubeMap = new MyCubeMap(this);
        this.terrain = new MyTerrain(this);

        this.selectedObject = 2;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.selectedScene = 0;
        this.displayAxis = true;
        this.displayNormals = false;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(0, 0,0, 0);
        this.lights[1].setAmbient(0.7, 0.7, 0.7, 1.0);
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 38, 50), vec3.fromValues(0, 15, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys() {
        var text = "Keys pressed: ";

        var keysPressed = false;
        
        // Check for key codes e.g. in https://keycode.info/

        if(!this.vehicle.autoPilot){
            if (this.gui.isKeyPressed("KeyW")) {
                text += " W ";
                this.vehicle.accelerate(0.6 * this.speedFactor);
                keysPressed=true;
            }
            if (this.gui.isKeyPressed("KeyS")) {
                text += " S ";
                this.vehicle.accelerate(-0.6 * this.speedFactor);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyA")) {
                text += " A ";
                this.vehicle.turn(10);
                keysPressed=true;
            }
            if (this.gui.isKeyPressed("KeyD")) {
                text += " D ";
                this.vehicle.turn(-10);
                keysPressed = true;
            }
        } 
        
        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            this.vehicle.reset();
            for(var i = 0 ; i < this.nSupplies; i++){
                this.supplies[i].reset();
            }
            this.nSuppliesDelivered = 0;
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyP")) {
            text += " P ";
            this.vehicle.setAutoPilot();
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyL")) {
            text += " L ";
            if(this.nSuppliesDelivered < 5){
                this.supplies[this.nSuppliesDelivered].drop([this.vehicle.x,this.vehicle.y, this.vehicle.z]);
                this.nSuppliesDelivered++;
            }
            keysPressed = true;
        }
        if (keysPressed){
            console.log(text);
        }
    }

    // Called periodically (as per setUpdatePeriod() in init())
    update(t){
        
        if(this.selectedObject == 2){
            this.checkKeys();
            this.vehicle.update(t);

            // Update supplies
            for(var i = 0; i < this.nSupplies; i++){
                this.supplies[i].update(t);
            }
        }
        else{
            this.vehicle.reset();
            for(var i = 0 ; i < this.nSupplies; i++){
                this.supplies[i].reset();
            }
            this.nSuppliesDelivered = 0;
        }
    }

    loadMaterials(){

        // Initialize scene materials             

        //------ Cylinder Material
        this.cylinderMaterial = new CGFappearance(this);
        this.cylinderMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cylinderMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cylinderMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cylinderMaterial.setShininess(10.0);
        this.cylinderMaterial.loadTexture('images/texture_wide.png');
        this.cylinderMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ World Material
        this.earthMaterial = new CGFappearance(this);
        this.earthMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.earthMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earthMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.earthMaterial.setShininess(10.0);
        this.earthMaterial.loadTexture('images/earth.jpg');
        this.earthMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Scene 1 Material
        this.scene1Material = new CGFappearance(this);
        this.scene1Material.setAmbient(1.0, 1.0, 1.0, 1);
        this.scene1Material.setDiffuse(0.0, 0.0, 0.0, 1);
        this.scene1Material.setSpecular(0.0, 0.0, 0.0, 1);
        this.scene1Material.setShininess(10.0);
        this.scene1Material.loadTexture('images/cubemap.png');
        this.scene1Material.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Scene 2 Material
        this.scene2Material = new CGFappearance(this);
        this.scene2Material.setAmbient(1.0, 1.0, 1.0, 1);
        this.scene2Material.setDiffuse(0.0, 0.0, 0.0, 1);
        this.scene2Material.setSpecular(0.0, 0.0, 0.0, 1);
        this.scene2Material.setShininess(10.0);
        this.scene2Material.loadTexture('images/cubemap2.png');
        this.scene2Material.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Scene 3 Material
        this.scene3Material = new CGFappearance(this);
        this.scene3Material.setAmbient(1.0, 1.0, 1.0, 1);
        this.scene3Material.setDiffuse(0.0, 0.0, 0.0, 1);
        this.scene3Material.setSpecular(0.0, 0.0, 0.0, 1);
        this.scene3Material.setShininess(10.0);
        this.scene3Material.loadTexture('images/cubemap3.png');
        this.scene3Material.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Scene 4 Material
        this.scene4Material = new CGFappearance(this);
        this.scene4Material.setAmbient(1.0, 1.0, 1.0, 1);
        this.scene4Material.setDiffuse(0.0, 0.0, 0.0, 1);
        this.scene4Material.setSpecular(0.0, 0.0, 0.0, 1);
        this.scene4Material.setShininess(10.0);
        this.scene4Material.loadTexture('images/cubemap4.png');
        this.scene4Material.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Terrain Material
        this.terrainTextureH = new CGFtexture(this, "images/heightmap.jpg");
        this.terrainTextureP = new CGFtexture(this, "images/terrain.jpg");
    
        this.terrainMaterial = new CGFappearance(this);
        this.terrainMaterial.setAmbient(0.3, 0.3, 0.3, 1);
		this.terrainMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
		this.terrainMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.terrainMaterial.setShininess(120);
        this.terrainMaterial.setTexture(this.terrainTextureP);
        this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Plane Body Material
        this.planeMaterial1 = new CGFappearance(this);       
        this.planeMaterial1.setAmbient(0.6, 0.6, 0.6, 1);
        this.planeMaterial1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.planeMaterial1.setSpecular(0.0, 0.0, 0.0, 1);
        this.planeMaterial1.setShininess(10.0);
        this.planeMaterial1.loadTexture('images/planeElementTex.jpg');
        this.planeMaterial1.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Plane Wing Material
        this.planeMaterial2 = new CGFappearance(this);  
        this.planeMaterial2.setAmbient(0.9, 0.9, 0.9, 1);
        this.planeMaterial2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.planeMaterial2.setSpecular(0.9, 0.9, 0.9, 1);
        this.planeMaterial2.setShininess(100.0);
        this.planeMaterial2.loadTexture('images/metalTex.jpg');
        this.planeMaterial2.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Plane Red Material
        this.planeMaterial3 = new CGFappearance(this);  
        this.planeMaterial3.setAmbient(0.1, 0.1, 0.1, 1);
        this.planeMaterial3.setDiffuse(0.9, 0.9, 0.9, 1);
        this.planeMaterial3.setSpecular(0.9, 0.9, 0.9, 1);
        this.planeMaterial3.setShininess(10.0);
        this.planeMaterial3.loadTexture('images/redTex.jpg');
        this.planeMaterial3.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Wood Box Material
        this.woodMaterial = new CGFappearance(this);
        this.woodMaterial.setAmbient(0.7, 0.55, 0.4, 1);
        this.woodMaterial.setDiffuse(0.7, 0.55, 0.4, 1);
        this.woodMaterial.setSpecular(0.2, 0.2, 0.2, 1);
        this.woodMaterial.setShininess(10.0);
        this.woodMaterial.loadTexture('images/woodCubeMap.jpg');
        this.woodMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        this.terrainShader = new CGFshader(this.gl, "terrain.vert", "terrain.frag");
        this.terrainShader.setUniformsValues({ uSampler2: 1 });

        this.scenes = [this.scene1Material,this.scene2Material, this.scene3Material, this.scene4Material];
 
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        
        if (this.displayNormals){
            this.objects[this.selectedObject].enableNormalViz();
            //this.cubeMap.face.enableNormalViz();
        }
        else if(!this.displayNormals){
            this.objects[this.selectedObject].disableNormalViz();
            //this.cubeMap.face.disableNormalViz();
        }

        if(this.selectedObject == 0)
            this.cylinderMaterial.apply();
        else if(this.selectedObject == 1)
            this.earthMaterial.apply();
        else if(this.selectedObject == 2){ 
            this.pushMatrix();
            this.translate(this.vehicle.x, this.vehicle.y, this.vehicle.z);
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor); // Vehicle Object Scale
            this.translate(-this.vehicle.x, -this.vehicle.y, -this.vehicle.z);
        }
       
        this.objects[this.selectedObject].display();
        
        if(this.selectedObject == 2){
            // Display supplies
            for(var i = 0; i < this.nSupplies; i++){
                this.supplies[i].display();
            }

            this.popMatrix(); // Vehicle Object Scale
        }

        this.terrain.display();

        this.setActiveShader(this.defaultShader);

        this.pushMatrix();
        this.lights[1].enable();
        this.lights[1].update();
        this.cubeMap.display();
        this.lights[1].disable();
        this.lights[1].update();
        this.popMatrix();

        
        // ---- END Primitive drawing section
    }
}

function graToRad(val){
    return (val * Math.PI)/180;
}