attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform float phase;

varying vec2 vTextureCoord;

void main() {

    vTextureCoord = aTextureCoord;
    vec3 offset = vec3(0.0,0.0,0.0);	

    offset.z = 0.2 * sin(aVertexPosition.x * 10.0 + phase);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}