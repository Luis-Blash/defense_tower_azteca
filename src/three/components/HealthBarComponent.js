import { Vector3 } from "three";
import BaseComponent from "@three/base/BaseComponent";


export default class HealthBarComponent extends BaseComponent {
    constructor(config = {}) {
        super()
        const {
            width = 60,
            height = 8,
            offsetY = 2.5,
            backgroundColor = '#333333',
            healthColor = '#4CAF50',
            lowHealthColor = '#f44336',
            borderColor = '#ffffff',
            borderWidth = 1,
            showText = false
        } = config

        this.width = width;
        this.height = height;
        this.offsetY = offsetY;
        this.backgroundColor = backgroundColor;
        this.healthColor = healthColor;
        this.lowHealthColor = lowHealthColor;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
        this.showText = showText;

        this.healthBarElement = null;
        this.healthFillElement = null;
        this.healthTextElement = null;
        this.camera = null;
        this.renderer = null;
        this.tempVector = new Vector3();

        this.isVisible = true;
    }

    setCameraAndRenderer(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
    }

    show() {
        this.isVisible = true;
        if (this.healthBarElement) {
            this.healthBarElement.style.display = 'block';
        }
    }

    hide() {
        this.isVisible = false;
        if (this.healthBarElement) {
            this.healthBarElement.style.opacity = '0';
        }
    }

    createHealthBar() {
        // Crear contenedor principal
        this.healthBarElement = document.createElement('div');
        this.healthBarElement.style.cssText = `
            position: fixed;
            width: ${this.width}px;
            height: ${this.height}px;
            background-color: ${this.backgroundColor};
            border: ${this.borderWidth}px solid ${this.borderColor};
            border-radius: ${this.height / 2}px;
            pointer-events: none;
            z-index: 1000;
            transition: opacity 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        `;

        // Crear barra de vida (relleno)
        this.healthFillElement = document.createElement('div');
        this.healthFillElement.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, ${this.healthColor} 0%, ${this.healthColor} 100%);
            border-radius: ${(this.height - 2) / 2}px;
            transition: width 0.3s ease, background 0.3s ease;
        `;

        // Crear texto de vida (opcional)
        if (this.showText) {
            this.healthTextElement = document.createElement('div');
            this.healthTextElement.style.cssText = `
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-family: Arial, sans-serif;
                font-size: 12px;
                font-weight: bold;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
                white-space: nowrap;
            `;
            this.healthBarElement.appendChild(this.healthTextElement);
        }

        this.healthBarElement.appendChild(this.healthFillElement);
        document.body.appendChild(this.healthBarElement);
    }


    update(delta) {
        if (!this.isVisible || !this.camera || !this.renderer) return;

        this.updateHealthBar();
        this.updatePosition();
    }

    updateHealthBar() {
        const healthComp = this.entity.getComponent("health");
        if (!healthComp) return;

        const healthPercentage = (healthComp.life / healthComp.maxLife) * 100;

        // Actualizar ancho de la barra
        this.healthFillElement.style.width = `${healthPercentage}%`;

        // Cambiar color según el porcentaje de vida
        let currentColor = this.healthColor;
        if (healthPercentage <= 25) {
            currentColor = this.lowHealthColor;
        } else if (healthPercentage <= 50) {
            // Color intermedio entre amarillo y rojo
            currentColor = '#ff9800';
        }

        this.healthFillElement.style.background = `linear-gradient(90deg, ${currentColor} 0%, ${currentColor} 100%)`;

        // Actualizar texto si está habilitado
        if (this.showText && this.healthTextElement) {
            this.healthTextElement.textContent = `${Math.ceil(healthComp.life)}/${healthComp.maxLife}`;
        }

        // Ocultar barra si la vida es 0
        if (healthComp.life <= 0) {
            this.hide();
        }
    }

    updatePosition() {
        // Obtener posición mundial del objeto
        this.entity.getWorldPosition(this.tempVector);

        // Añadir offset Y para que aparezca encima
        this.tempVector.y += this.offsetY;

        // Convertir posición 3D a coordenadas de pantalla
        this.tempVector.project(this.camera);

        // Convertir a coordenadas de píxeles
        const canvas = this.renderer.domElement;
        const canvasRect = canvas.getBoundingClientRect();

        const x = (this.tempVector.x * 0.5 + 0.5) * canvas.clientWidth + canvasRect.left;
        const y = (this.tempVector.y * -0.5 + 0.5) * canvas.clientHeight + canvasRect.top;

        // Actualizar posición del elemento HTML
        this.healthBarElement.style.left = `${x - this.width / 2}px`;
        this.healthBarElement.style.top = `${y - this.height / 2}px`;

        // Ocultar si está detrás de la cámara o muy lejos
        const shouldShow = this.tempVector.z < 1 && this.tempVector.z > -1;
        this.healthBarElement.style.opacity = shouldShow ? '1' : '0';
    }
}