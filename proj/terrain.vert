attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {
    vec3 offset=vec3(0.0,0.0,0.0);

    vTextureCoord = aTextureCoord;
    vec2 offsetTerrain = vec2(mod(vTextureCoord.x + 0.5,1.0), mod(vTextureCoord.y + 0.5,1.0));

    offset = aVertexNormal * texture2D(uSampler2, offsetTerrain).b * 0.2;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}