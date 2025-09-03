

import { DoubleSide, RawShaderMaterial, AdditiveBlending } from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';


export default class FireballMaterialShader extends RawShaderMaterial {

    /**
     * @param {Object} options
     * @param {number} options.radius
     * @param {number} options.intensity
     * @param {number} options.noiseScale
     * @param {number} options.speed
     * @param {number} options.glow
     */
    constructor(options = {}) {
        const {
            radius = 1.0,
            intensity = 1.5,
            noiseScale = 1.5,
            speed = 1.0,
            glow = 0.6,
        } = options;


        const uniforms = {
            time: { value: 0.0 },
            intensity: { value: intensity },
            radius: { value: radius },
            noiseScale: { value: noiseScale },
            speed: { value: speed },
            glow: { value: glow },
        };


        super({
            vertexShader,
            fragmentShader,
            uniforms,
            side: DoubleSide,
            transparent: true,
            depthWrite: false, // evita problemas al usar blending aditivo
            blending: AdditiveBlending,
        });


        this.uniforms = uniforms;
    }


    update(delta) {
        this.uniforms.time.value += delta;
    }
}