import { useState } from 'react'
import ObserverEmitter, { EVENTS } from '@services/Observer';

const Loading3D = () => {
    const [loader, setLoader] = useState(true);
    const [percent, setPercent] = useState(0)

    ObserverEmitter.on(EVENTS.loader3D.onProgress, (value = 0) => {
        setPercent(parseInt(value.toFixed(2)))
        setLoader(true);
    });

    ObserverEmitter.on(EVENTS.loader3D.onLoad, () => {
        setLoader(false);
    });

    if (!loader) return null

    return (
        <div className='bg-[#0000003e] absolute z-20 top-0 left-0 h-full w-full flex items-center justify-center'>
            <p>Loading {percent}%...</p>
        </div>
    )
}

export default Loading3D