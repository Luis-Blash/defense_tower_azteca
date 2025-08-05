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

        this.init();
    }

    init() {
        // Eventos para desktop
        this.container.addEventListener('click', this.onMouseClick.bind(this));
        
        // Eventos para móviles - mejor respuesta táctil
        this.container.addEventListener('touchend', this.onTouchEnd.bind(this));
        
        // Prevenir el zoom en doble tap (opcional)
        this.container.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    }

    onTouchStart(event) {
        // Prevenir comportamientos por defecto como zoom en doble tap
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }

    onTouchEnd(event) {
        // Solo procesar si es un toque simple (no multi-touch)
        if (event.changedTouches.length === 1) {
            const touch = event.changedTouches[0];
            const intersects = this.configTouch(touch);
            
            if (intersects.length > 0) {
                this.callBackIntersect({intersects, objectClickByName: this.objectClickByName});
            }
        }
        
        // Prevenir que se dispare también el evento click
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

    onMouseClick(event) {
        const intersects = this.configMouse(event);

        if (intersects.length > 0) {
            this.callBackIntersect({intersects, objectClickByName: this.objectClickByName});
        }
    }

    setClickObject(object) {
        this.objectClickByName.push(object);
    }

    setCallBackIntersect(callBack) {
        this.callBackIntersect = callBack;
    }

    dispose() {
        this.objectClickByName = [];
        this.container.removeEventListener('click', this.onMouseClick.bind(this));
        this.container.removeEventListener('touchend', this.onTouchEnd.bind(this));
        this.container.removeEventListener('touchstart', this.onTouchStart.bind(this));
    }
}