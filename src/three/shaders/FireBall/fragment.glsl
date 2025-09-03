// fragment.glsl
// Fragment shader procedural para bola de fuego (comentado, fácil de entender)

precision mediump float;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float time;       // tiempo en segundos
uniform float intensity;  // intensidad general del fuego
uniform float radius;     // radio de la esfera (debe coincidir con la geometría)
uniform float noiseScale; // escala del ruido
uniform float speed;      // velocidad del ruido
uniform float glow;       // cuánto aplicar brillo externo

// rand devuelve un valor pseudoaleatorio en [0,1] a partir de una coordenada 2D
float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
}

// un "noise" 3D simple usando varias llamadas a rand
float noise(vec3 p){
  float n = 0.0;
  n += rand(p.xy);
  n += rand((p.yz) * 1.3);
  n += rand((p.zx) * 1.7);
  return n / 3.0;
}

// fbm: fractal brownian motion - suma varias octavas de noise
float fbm(vec3 p){
  float value = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for(int i = 0; i < 5; i++){
    value += amp * noise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return value;
}

// Interpolación suave entre colores
vec3 palette(float t){
  vec3 outer = vec3(0.2, 0.02, 0.0);   // rojo muy oscuro (borde)
  vec3 mid   = vec3(1.0, 0.3, 0.0);    // naranja
  vec3 inner = vec3(1.0, 0.95, 0.6);   // amarillo-blanco (centro)

  vec3 m = mix(outer, mid, smoothstep(0.0, 0.6, t));
  return mix(m, inner, smoothstep(0.6, 1.0, t));
}

void main(){
  // Distancia desde el centro de la esfera (suponemos geometría centrada en 0,0,0)
  float dist = length(vPosition);
  float r = clamp(dist / radius, 0.0, 1.0); // 0 = centro, 1 = borde

  // Factor central (1 en el centro, 0 en el borde)
  float core = 1.0 - r;

  // Ruido animado
  vec3 noisePos = vPosition * noiseScale;
  noisePos += vec3(0.0, time * speed, 0.0); // desplazamos el ruido con el tiempo
  float n = fbm(noisePos);

  // Mezcla núcleo + ruido para la forma de la llama
  float fire = clamp(core + (n - 0.4) * 0.7, 0.0, 1.0);

  // Afinamos la forma con una potencia para concentrar brillo en el centro
  float shaped = pow(fire, 1.8);

  // Color procedimental
  vec3 color = palette(shaped);

  // Brillo exterior (halo)
  float halo = pow(clamp(1.0 - r, 0.0, 1.0), 2.0) * glow;

  // Pulso sutil con el tiempo
  float pulse = 0.9 + 0.1 * sin(time * 3.0);

  vec3 finalColor = color * (intensity * pulse) + halo;

  // Alpha según energía del fragmento
  float alpha = clamp(shaped * intensity, 0.0, 1.0);

  gl_FragColor = vec4(finalColor, alpha);
}
