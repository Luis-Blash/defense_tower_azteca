import { useEffect, useRef } from 'react';
import './App.css'
import APPThree from '@three/core/APPThree';

function App() {

  const containerAppThree = useRef(null);

  useEffect(() => {
    if (!containerAppThree.current.iscreated) {
      containerAppThree.current.iscreated = true;
      const container = containerAppThree.current;
      const app = new APPThree(container);
      app.onResized();

      // return () => {
      // 	app.cleanup();
      // };
    }
  }, [])

  return (
    <>
      <div className='h-dvh w-dvw relative'>

        {/* canvas */}
        <div className="w-full h-full relative">
          <div ref={containerAppThree} id="container" className="absolute z-10 h-full w-full"></div>
        </div>

      </div>
    </>
  )
}

export default App
