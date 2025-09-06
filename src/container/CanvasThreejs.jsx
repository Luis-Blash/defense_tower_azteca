import { useEffect, useRef } from 'react';
import APPThree from '@three/core/APPThree';


const CanvasThreejs = () => {
    const containerAppThree = useRef(null);

    useEffect(() => {
        if (!containerAppThree.current.iscreated) {
            containerAppThree.current.iscreated = true;
            const container = containerAppThree.current;
            const app = new APPThree(container);
            app.onResized();
        }
    }, [])

    return (
        <div className="w-full h-full">
            <div ref={containerAppThree} id="container" className="h-full w-full"></div>
        </div>
    )
}

export default CanvasThreejs