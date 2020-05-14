attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {

	vec3 offset = vec3(0.0, 0.0, 1.0);
	
	vTextureCoord = aTextureCoord;

    // As the plane will be scaled by a factor of 50, 
    // here will be 8/50 = 0.16, as 8 is the maximum height allowed
	offset = offset * texture2D(uSampler2, vTextureCoord).b * 0.16;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}