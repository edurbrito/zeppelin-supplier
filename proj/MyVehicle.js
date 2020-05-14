/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {

    constructor(scene) {
        super(scene);
        this.angle = 0; 
        this.speed = 0;
        this.x = 0;
        this.y = 10;
        this.z = 0;

        this.autoPilot = false;
        this.last_t = 0;

        this.body = new MySphere(this.scene,16,8);
        this.cabin = new Cabin(this.scene);
        this.motor = new Motor(this.scene);
        this.vWingDown = new Wing(this.scene);
        this.vWingUp = new Wing(this.scene);
        this.hWing = new Wing(this.scene);
        this.flag = new Flag(this.scene);

        this.objects = [this.body, this.cabin, this.motor, this.vWingDown, this.vWingUp, this.hWing, this.flag];
    }
    
    display(){
        
        this.scene.pushMatrix();

        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(degreesToRad(this.angle),0,1,0);

        this.scene.pushMatrix();
        this.flag.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);


        var wings = [this.vWingDown, this.hWing, this.vWingUp, this.hWing];

        var ang = 0;
        for(var i = 0; i < 4; i++){
            this.scene.pushMatrix();
            this.scene.translate(0,1,-2);
            this.scene.rotate(degreesToRad(ang),0,0,1);
            this.scene.planeMaterial2.apply();
            wings[i].display();
            this.scene.popMatrix();
            ang += 90;
        }
        this.cabin.display();

        var factor = 1;
        for(var i = 0; i < 2; i++){
            this.scene.pushMatrix();
            this.scene.translate(factor * 0.2,0,-0.6);
            this.scene.scale(0.6,0.6,0.6);
            this.motor.display();
            this.scene.popMatrix();
            factor = -1;
        }

        this.scene.pushMatrix();
        this.scene.translate(0,1.1,0);
        this.scene.scale(1,1,2);
        this.scene.planeMaterial1.apply();
        this.body.display();
        this.scene.popMatrix();

        this.scene.translate(0,10,0);
        this.scene.rotate(degreesToRad(90), 1,0,0);  

        this.scene.popMatrix();
    }

    update(t){
        
        if(this.autoPilot){
            var deltaAngle = (t - this.last_t) * this.angularSpeed;
            this.pilotAngle += deltaAngle; // rotation angle

            this.x = this.pilotCenter[0] + this.pilotRadius * Math.sin(degreesToRad(this.pilotAngle));
            this.z = this.pilotCenter[2] + this.pilotRadius * Math.cos(degreesToRad(this.pilotAngle));
            
            this.angle = this.pilotAngle + 90; // orientation angle

            // Animations
            this.motor.update(this.linearSpeed);
            this.vWingUp.update(this.pilotAngle);
            this.vWingDown.update(-this.pilotAngle);
            this.flag.update(t, this.linearSpeed);
        }
        else{ // Normal State
            this.x += this.speed * (t - this.last_t)/1000 * Math.sin(degreesToRad(this.angle));
            this.z += this.speed * (t - this.last_t)/1000 * Math.cos(degreesToRad(this.angle));

            // Animations
            this.motor.update(this.speed);
            this.flag.update(t, this.speed);
        }

        this.last_t = t;
    }

    turn(val){
        this.angle += val;
        this.vWingUp.update(val);
        this.vWingDown.update(-val);
    }

    accelerate(val){
        this.speed += val;
        if(this.speed < 0) this.speed = 0;
    }

    setAutoPilot(){
        this.autoPilot = !this.autoPilot;
        
        if(this.autoPilot){
            this.pilotRadius = 5;
            this.pilotPeriod = 5000; // milliseconds         
            this.pilotAngle = this.angle - 90;
            
            var pilotInitialPosition = [this.x,this.y,this.z];  
            var relativeDirection = [ Math.sin(degreesToRad(this.angle + 90)), 0, Math.cos(degreesToRad(this.angle + 90))];
            
            this.pilotCenter = [0,0,0];

            for(var i = 0; i < 3 ; i++)
                this.pilotCenter[i] = relativeDirection[i] * this.pilotRadius + pilotInitialPosition[i];

            this.angularSpeed = 360 / this.pilotPeriod; 
            
            this.linearSpeed = this.angularSpeed * this.pilotRadius;

        }
        
    }

    reset(){
        this.x = 0;
        this.y = 10;
        this.z = 0;
        this.speed = 0;
        this.angle = 0;
        this.autoPilot = false;
    }

    enableNormalViz(){
        for(var i = 0; i < this.objects.length; i++){
            this.objects[i].enableNormalViz();
        }
    }

    disableNormalViz(){
        for(var i = 0; i < this.objects.length; i++){
            this.objects[i].disableNormalViz();
        }
    }
}

class NormalVisualizer {

    enableNormalViz(){
        for(var i = 0; i < this.objects.length; i++){
            this.objects[i].enableNormalViz();
        }
    }

    disableNormalViz(){
        for(var i = 0; i < this.objects.length; i++){
            this.objects[i].disableNormalViz();
        }
    }
}

class Cabin extends NormalVisualizer{
    constructor(scene){
        super(); // NormalVisualizer
        this.scene = scene;
        this.cabinSphere = new MySphere(this.scene,16,8);
        this.cabinBody = new MyCylinder(this.scene,16,8);

        this.objects = [this.cabinSphere, this.cabinBody];
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.scale(0.2,0.2,1);
        this.scene.rotate(degreesToRad(90),1,0,0);
        this.cabinBody.display();
        this.scene.popMatrix();

        var factor = 1;
        for(var i = 0; i < 2; i++){
            this.scene.pushMatrix();
            this.scene.translate(0,0,factor * 0.5);
            this.scene.scale(0.2,0.2,0.2);
            this.scene.rotate(degreesToRad(90),1,0,0);
            this.scene.planeMaterial3.apply();
            this.cabinSphere.display();
            this.scene.popMatrix();
            factor = -1;
        }
    }
}

class Motor extends NormalVisualizer{
    constructor(scene){
        super(); // NormalVisualizer
        this.scene = scene;
        
        this.round = new MySphere(this.scene,16,8);
        this.turbine = new MyCylinder(this.scene,16,8);
        
        this.turbineRot = 0;

        this.objects = [this.round, this.turbine];
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.1,0.1,0.3);
        this.scene.rotate(degreesToRad(90),1,0,0);
        this.scene.planeMaterial2.apply();
        this.round.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.3);
        this.scene.scale(0.05,0.05,0.05);
        this.scene.rotate(degreesToRad(90),1,0,0);
        this.scene.planeMaterial2.apply();
        this.round.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(degreesToRad(this.turbineRot),0,0,1);
        this.scene.translate(0,-0.25,-0.3);
        this.scene.scale(0.02,0.5,0.02);
        this.scene.planeMaterial3.apply();
        this.turbine.display();
        this.scene.popMatrix();
    }

    update(speed){
        function formulae(x){
            if (x > 0) {
                return 10*Math.pow(x,1/3.0);
            } 
            else {
                return 10;
            }            
        }

        this.turbineRot = (this.turbineRot + formulae(speed*100));
    }
}

class WingObject extends CGFobject{
    constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
            -1,0,0,
            0,0,0,
            0,1,0,
            1,0,0,
            1,1,0,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0,1,2,
            1,3,4,
            4,2,1,

            4,3,1,
            1,2,4,
            1,0,2
        ];
        
        this.normals = [
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1
        ];
        
        this.texCoords = [
            0,0,
            1/3,1,
            1/3,0,
            1,1,
            1,0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}

class Wing extends NormalVisualizer {
    constructor(scene){
        super(); // NormalVisualizer
        this.scene = scene;

        this.wing = new WingObject(this.scene);
        this.wingRot = 0;

        this.objects = [this.wing];
    }

    display(){

        this.scene.pushMatrix();
        this.scene.rotate(degreesToRad(this.wingRot),0,1,0);
        this.scene.translate(0,0.25,0.25);
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(degreesToRad(90),0,1,0);
        this.wing.display();
        this.scene.popMatrix();

        if(this.wingRot > 0) this.wingRot -= 3;
        else if(this.wingRot < 0) this.wingRot += 3;
    }

    update(turn){
        if(turn < 0)
            this.wingRot = Math.max(this.wingRot + turn, -30);
        else
            this.wingRot = Math.min(this.wingRot + turn, 30);
    }
}

class Flag extends NormalVisualizer {
    constructor(scene){
        super();
        this.scene = scene;

        this.flag = new MyPlane(this.scene,20);
        this.rope = new MyPlane(this.scene,20);

        this.objects = [this.flag, this.rope];

        this.last_t = 0;
        this.phase = 0;
    }

    display(){
        this.scene.flagMaterial.apply();
        this.scene.setActiveShader(this.scene.flagShader);
        this.scene.flagTexture.bind(0);
        
        this.scene.pushMatrix();
        this.scene.translate(0,1.1,-5);
        this.scene.rotate(degreesToRad(90),0,1,0);
        this.scene.scale(3,1.5,1);
        this.flag.display();
        this.scene.popMatrix();  

        this.scene.pushMatrix();
        this.scene.translate(0,1.8,-2.25);
        this.scene.rotate(degreesToRad(90),0,1,0);
        this.scene.scale(2.5,0.01,1);
        this.scene.planeMaterial3.apply();
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.4,-2.25);
        this.scene.rotate(degreesToRad(90),0,1,0);
        this.scene.scale(2.5,0.01,1);
        this.scene.planeMaterial3.apply();
        this.rope.display();
        this.scene.popMatrix();

    }

    update(t, speed){

        var deltaT = t - this.last_t;
        var deltaX = 0.01 * speed * deltaT;
        // If zero : swing slowly | else : not swing too rapidly
        deltaX = deltaX == 0 ? 0.5 : Math.min(deltaX + 0.5, 1.5); 

        this.phase += deltaX;

        this.scene.flagShader.setUniformsValues({ phase: this.phase });

        this.last_t = t;
    }
}