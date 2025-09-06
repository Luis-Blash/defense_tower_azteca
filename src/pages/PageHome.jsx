import CanvasThreejs from "@container/CanvasThreejs"
import WrapperUI from "@container/WrapperUI"
import Loading3D from "@container/Loading3D"

const PageHome = () => {
  return (
    <WrapperUI>
      <Loading3D />
      <CanvasThreejs />
    </WrapperUI>
  )
}

export default PageHome