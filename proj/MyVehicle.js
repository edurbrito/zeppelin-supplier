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

        this.body = new MySphere(this.scene,16,8);
        this.cabin = new Cabin(this.scene);
        this.motor = new Motor(this.scene);
        this.vWingDown = new Wing(this.scene);
        this.vWingUp = new Wing(this.scene);
        this.hWing = new Wing(this.scene);

        this.objects = [this.body, this.cabin, this.motor, this.vWingDown, this.vWingUp, this.hWing];
    }
    
    display(){
        
        this.scene.pushMatrix();

        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(graToRad(this.angle),0,1,0);

        var wings = [this.vWingDown, this.hWing, this.vWingUp, this.hWing];

        var ang = 0;
        for(var i = 0; i < 4; i++){
            this.scene.pushMatrix();
            this.scene.translate(0,1,-2);
            this.scene.rotate(graToRad(ang),0,0,1);
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
        this.body.display();
        this.scene.popMatrix();

        this.scene.translate(0,10,0);
        this.scene.rotate(graToRad(90), 1,0,0);  

        this.scene.popMatrix();
    }

    update(){
        this.x += this.speed * Math.sin(this.angle * Math.PI / 180);
        this.z += this.speed * Math.cos(this.angle * Math.PI / 180);
        this.motor.update(this.speed);
    }

    turn(val){
        this.angle += val;
        this.vWingDown.update(-val);
        this.vWingUp.update(val);
    }

    accelerate(val){
        this.speed += val;
    }

    reset(){
        this.x = 0;
        this.y = 10;
        this.z = 0;
        this.speed = 0;
        this.angle = 0;
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

class Cabin {
    constructor(scene){
        this.scene = scene;
        this.cabinSphere = new MySphere(this.scene,16,8);
        this.cabinBody = new MyCylinder(this.scene,16,8);

        this.objects = [this.cabinSphere, this.cabinBody];
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.scale(0.2,0.2,1);
        this.scene.rotate(graToRad(90),1,0,0);
        this.cabinBody.display();
        this.scene.popMatrix();

        var factor = 1;
        for(var i = 0; i < 2; i++){
            this.scene.pushMatrix();
            this.scene.translate(0,0,factor * 0.5);
            this.scene.scale(0.2,0.2,0.2);
            this.scene.rotate(graToRad(90),1,0,0);
            this.cabinSphere.display();
            this.scene.popMatrix();
            factor = -1;
        }
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

class Motor {
    constructor(scene){
        this.scene = scene;
        this.round = new MySphere(this.scene,16,8);
        this.turbine = new MyCylinder(this.scene,16,8);

        this.turbineRot = 0;

        this.objects = [this.round, this.turbine];
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.1,0.1,0.3);
        this.scene.rotate(graToRad(90),1,0,0);
        this.round.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.3);
        this.scene.scale(0.05,0.05,0.05);
        this.scene.rotate(graToRad(90),1,0,0);
        this.round.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(graToRad(this.turbineRot),0,0,1);
        this.scene.translate(0,-0.25,-0.3);
        this.scene.scale(0.02,0.5,0.02);
        this.turbine.display();
        this.scene.popMatrix();
    }

    update(speed){
        function formulae(x){
            if (x > 0) {
                return 10*Math.pow(x,1/3.0);
            } 
            else {
                return -1 *10*Math.pow(-x,1/3.0);
            }            
        }

        this.turbineRot = (this.turbineRot + formulae(speed*100));
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

class WingObject extends CGFobject {
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

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

class Wing {
    constructor(scene){
        this.scene = scene;

        this.wing = new WingObject(this.scene);
        this.wingRot = 0;
    }

    display(){

        this.scene.pushMatrix();
        this.scene.rotate(graToRad(this.wingRot),0,1,0);
        this.scene.translate(0,0.25,0.25);
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(graToRad(90),0,1,0);
        this.wing.display();
        this.scene.popMatrix();

        if(this.wingRot > 0) this.wingRot -= 5;
        else if(this.wingRot < 0) this.wingRot += 5;
    }

    update(turn){
        if(turn < 0)
            this.wingRot = Math.max(this.wingRot + turn, -30);
        else
            this.wingRot = Math.min(this.wingRot + turn, 30);
    }

    enableNormalViz(){
        this.wing.enableNormalViz();
    }

    disableNormalViz(){
        this.wing.disableNormalViz();
    }
}

