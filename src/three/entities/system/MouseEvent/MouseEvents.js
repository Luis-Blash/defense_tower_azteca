import { Raycaster, Vector2 } from "three";

export default class MouseEvents {
    constructor(camera, container, renderer, scene) {
        this.camera = camera;
        this.renderer = renderer;
        this.container = container;
        this.scene = scene;

        this.raycaster = new Raycaster();
        this.mouse = new Vector2();

        this.objectClickByName = []
        this.callBackIntersect = () => {}

        // Variables para detectar drag vs click
        this.isMouseDown = false;
        this.mouseDownPosition = new Vector2();
        this.dragThreshold = 5; // píxeles - ajusta según necesites

        this.init();
    }

    init() {
        // Eventos para detectar drag vs click
        this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        // Eventos para móviles
        this.container.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
        this.container.addEventListener('touchend', this.onTouchEnd.bind(this));
        this.container.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    }

    onMouseDown(event) {
        this.isMouseDown = true;
        this.mouseDownPosition.set(event.clientX, event.clientY);
    }

    onMouseMove(event) {
        // Si está arrastrando, marcar como drag
        if (this.isMouseDown) {
            const currentPos = new Vector2(event.clientX, event.clientY);
            const distance = this.mouseDownPosition.distanceTo(currentPos);
            
            if (distance > this.dragThreshold) {
                this.isDragging = true;
            }
        }
    }

    onMouseUp(event) {
        // Solo procesar click si no fue un drag
        if (this.isMouseDown && !this.isDragging) {
            const intersects = this.configMouse(event);
            
            if (intersects.length > 0) {
                this.callBackIntersect({intersects, objectClickByName: this.objectClickByName});
            }
        }
        
        // Reset variables
        this.isMouseDown = false;
        this.isDragging = false;
    }

    // Para móviles - mismo concepto
    onTouchStart(event) {
        if (event.touches.length === 1) {
            this.isMouseDown = true;
            const touch = event.touches[0];
            this.mouseDownPosition.set(touch.clientX, touch.clientY);
            this.isDragging = false;
        }
        
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }

    onTouchMove(event) {
        if (this.isMouseDown && event.touches.length === 1) {
            const touch = event.touches[0];
            const currentPos = new Vector2(touch.clientX, touch.clientY);
            const distance = this.mouseDownPosition.distanceTo(currentPos);
            
            if (distance > this.dragThreshold) {
                this.isDragging = true;
            }
        }
    }

    onTouchEnd(event) {
        if (event.changedTouches.length === 1 && this.isMouseDown && !this.isDragging) {
            const touch = event.changedTouches[0];
            const intersects = this.configTouch(touch);
            
            if (intersects.length > 0) {
                this.callBackIntersect({intersects, objectClickByName: this.objectClickByName});
            }
        }
        
        // Reset variables
        this.isMouseDown = false;
        this.isDragging = false;
        event.preventDefault();
    }

    configMouse(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        return intersects;
    }

    configTouch(touch) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        return intersects;
    }

    setClickObject(object) {
        this.objectClickByName.push(object);
    }

    setCallBackIntersect(callBack) {
        this.callBackIntersect = callBack;
    }

    // Método para ajustar la sensibilidad del drag
    setDragThreshold(pixels) {
        this.dragThreshold = pixels;
    }

    dispose() {
        this.objectClickByName = [];
        this.container.removeEventListener('mousedown', this.onMouseDown.bind(this));
        this.container.removeEventListener('mouseup', this.onMouseUp.bind(this));
        this.container.removeEventListener('mousemove', this.onMouseMove.bind(this));
        this.container.removeEventListener('touchstart', this.onTouchStart.bind(this));
        this.container.removeEventListener('touchend', this.onTouchEnd.bind(this));
        this.container.removeEventListener('touchmove', this.onTouchMove.bind(this));
    }
}