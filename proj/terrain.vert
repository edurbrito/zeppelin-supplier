attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {

	vec3 offset = vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord;

	offset = aVertexNormal * texture2D(uSampler2, vTextureCoord).b * 0.2;

    if(offset.z > 0.16){
        // Maximum 8 units height, by the fact that 8/50 = 0.16
        // And 50, here, represents the final scale of the terrain, the CubeMap, etc. ( 50 x 50 )

        // UNCOMMENT THIS TO ENABLE THE 8 UNITS HEIGHT CONSTRAINT
        offset = vec3(offset.x, offset.y , 0.16); 
    }

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}