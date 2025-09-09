import CanvasThreejs from "@container/CanvasThreejs"
import WrapperUI from "@container/WrapperUI"
import Loading3D from "@container/Loading3D"

const PageHome = () => {
  return (
    <div className="fixed top-0 w-full h-full">
      <WrapperUI>
        <Loading3D />
        <CanvasThreejs />
      </WrapperUI>
    </div>
  )
}

export default PageHome