#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix; // Model-View matrix (Transformations)
uniform mat4 uPMatrix;  // Projection matrix (Camera)
uniform mat4 uNMatrix;  // Normal Transformation matrix (Normals)

uniform float normScale;
varying vec4 normal;
varying vec2 vTextureCoord;

void main() {
	vec4 vertex=vec4(aVertexPosition+aVertexNormal*normScale*0.1, 1.0);

	gl_Position = uPMatrix * uMVMatrix * vertex;

	normal = vec4(aVertexNormal, 1.0);

	vTextureCoord = aTextureCoord;
}