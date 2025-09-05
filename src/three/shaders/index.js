import { AdditiveBlending, RawShaderMaterial } from "three";
import vertexShaderQuetzalBall from "./quetzalBall/vertex.glsl";
import fragmentShaderQuetzalBall from "./quetzalBall/fragment.glsl";


export const fireballMaterial = () => {
    const material = new RawShaderMaterial({
        vertexShader: vertexShaderQuetzalBall,
        fragmentShader: fragmentShaderQuetzalBall,
        uniforms: {
            uTime: { value: 0 }
        },
        blending: AdditiveBlending,
        transparent: true,
        depthWrite: false
    });
    return material;  
}
