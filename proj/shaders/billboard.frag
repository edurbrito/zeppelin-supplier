#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float deliveredSupplies;
uniform float totalSupplies;

void main() {

   vec4 baseColor =  vec4(0.5,0.5,0.5, 1.0);
   float percentage = deliveredSupplies/totalSupplies;

   if(vTextureCoord[0] > percentage){
      gl_FragColor =  baseColor;
   }
   else{
      gl_FragColor =  vec4(1.0 - vTextureCoord[0],vTextureCoord[0],0.0, 1.0);
   }
   
}