attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix; // Model-View matrix (Transformations)
uniform mat4 uPMatrix;  // Projection matrix (Camera)
uniform mat4 uNMatrix;  // Normal Transformation matrix (Normals)

varying vec2 vTextureCoord;

void main() {

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;
}