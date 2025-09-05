import { useEffect, useRef } from 'react';
import './App.css'
import APPThree from '@three/core/APPThree';
import Loading3D from '@components/Loading3D';
import WrapperUI from '@components/WrapperUI';

function App() {

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
    <WrapperUI>

      <Loading3D />

      {/* canvas */}
      <div className="w-full h-full">
        <div ref={containerAppThree} id="container" className="h-full w-full"></div>
      </div>

    </WrapperUI>

  )
}

export default App
