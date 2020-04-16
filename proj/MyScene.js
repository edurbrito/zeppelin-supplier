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

        // Initialize scene materials      
        this.cylinderMaterial = new CGFappearance(this);
        this.earthMaterial = new CGFappearance(this);
        this.scene1Material = new CGFappearance(this);
        this.scene2Material = new CGFappearance(this);
        
        this.loadMaterials();

        this.scenes = [this.scene1Material,this.scene2Material];

        // Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this,30,10);
        this.objects = [this.cylinder,this.incompleteSphere];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 'Cylinder': 0 , 'Sphere': 1};

        // Labels and ID's for scene selection on MyInterface
        this.sceneIDs = { 'Scene1': 0 , 'Scene2': 1};

        // Objects connected to MyInterface
        this.cubeMap = new MyCubeMap(this);
        this.selectedObject = 1;
        this.selectedScene = 0;
        this.displayAxis = true;
        this.displayNormals = false;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(25,0, 25), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
    }

    loadMaterials(){
        //------ Cylinder Material
        this.cylinderMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cylinderMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cylinderMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cylinderMaterial.setShininess(10.0);
        this.cylinderMaterial.loadTexture('images/texture_wide.png');
        this.cylinderMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ World Material
        this.earthMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.earthMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earthMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.earthMaterial.setShininess(10.0);
        this.earthMaterial.loadTexture('images/earth.jpg');
        this.earthMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Scene 1 Material
        this.scene1Material.setAmbient(1.0, 1.0, 1.0, 1);
        this.scene1Material.setDiffuse(0.0, 0.0, 0.0, 1);
        this.scene1Material.setSpecular(0.0, 0.0, 0.0, 1);
        this.scene1Material.setShininess(10.0);
        this.scene1Material.loadTexture('images/cubemap.png');
        this.scene1Material.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Scene 2 Material
        this.scene2Material.setAmbient(1.0, 1.0, 1.0, 1);
        this.scene2Material.setDiffuse(0.0, 0.0, 0.0, 1);
        this.scene2Material.setSpecular(0.0, 0.0, 0.0, 1);
        this.scene2Material.setShininess(10.0);
        this.scene2Material.loadTexture('images/cubemap2.png');
        this.scene2Material.setTextureWrap('REPEAT', 'REPEAT');
        //------

    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        
        if (this.displayNormals){
            this.objects[this.selectedObject].enableNormalViz();
            this.cubeMap.face.enableNormalViz();
        }
        else{
            this.objects[this.selectedObject].disableNormalViz();
            this.cubeMap.face.disableNormalViz();
        }

        if(this.selectedObject == 0)
            this.cylinderMaterial.apply();
        else if(this.selectedObject == 1)
            this.earthMaterial.apply();
        
        this.objects[this.selectedObject].display();

        this.cubeMap.display();

        this.popMatrix();

        // ---- END Primitive drawing section
    }
}

function graToRad(val){
    return (val * Math.PI)/180;
}