// import VisitIdIframe from "./VisitIdIframe"
import { Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <h1>Header Iframe I</h1>
      {/* <VisitIdIframe /> */}
      <Outlet />
    </>
  )
}

export default Header