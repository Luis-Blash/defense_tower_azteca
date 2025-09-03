// vertex.glsl
// Vertex shader sencillo y comentado

precision mediump float;

// atributos que THREE inyecta en un RawShaderMaterial
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// matrices uniformes que THREE proporciona
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix; // para transformar normales a espacio de vista

// varyings hacia el fragment shader
varying vec3 vPosition; // posición en espacio de modelo
varying vec3 vNormal;   // normal en espacio de vista
varying vec2 vUv;

void main() {
  // Pasamos la posición en coordenadas de modelo (útil para calcular distancia al centro)
  vPosition = position;

  // Transformamos la normal usando normalMatrix
  vNormal = normalize(normalMatrix * normal);

  // Pasamos coordenadas UV
  vUv = uv;

  // gl_Position necesita modelViewMatrix * projectionMatrix
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
