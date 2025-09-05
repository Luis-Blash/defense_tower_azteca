precision mediump float;

uniform float uTime;
varying vec2 vUv;
varying vec3 vPos;
varying float vDisplacement;

void main() {
    // Base: energía turquesa → verde
    vec3 color1 = vec3(0.0, 0.8, 0.6);
    vec3 color2 = vec3(0.2, 1.0, 0.4);

    // Pulso dorado en el "pico" de desplazamiento
    float pulse = smoothstep(0.12, 0.15, vDisplacement) - smoothstep(0.15, 0.18, vDisplacement);
    vec3 pulseColor = vec3(1.0, 0.85, 0.3) * pulse * 1.5;

    // Gradiente animado
    float t = 0.5 + 0.5 * sin(uTime + vPos.y * 4.0);
    vec3 baseColor = mix(color1, color2, t);

    gl_FragColor = vec4(baseColor + pulseColor, 1.0);
}
