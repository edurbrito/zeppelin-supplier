attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float phase;
uniform float side;

varying vec2 vTextureCoord;

void main() {

    vTextureCoord = aTextureCoord;
    vec3 offset = vec3(0.0,0.0,0.0);	

    offset.z = 0.2 * sin(aVertexPosition.x * 10.0 + side * phase); // side is 1 or -1

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}