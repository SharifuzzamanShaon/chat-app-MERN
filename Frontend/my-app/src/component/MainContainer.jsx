// import WorkArea from "./WorkArea"
import Sidebar from "./Sidebar"
import './style.css'
import ChatArea from "./ChatArea"
import Welcome from "./Welcome"
import Users_Groups from "./Users_Groups"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
const MainContainer = () => {
  const lightTheme = useSelector((state)=>state.themeKey)
  return (
    <div className={"main-container" + (lightTheme ? "" : ' dark')}>
      <Sidebar/>
      <Outlet/>
      {/* <WorkArea/> */}
      {/* <ChatArea></ChatArea> */}
      {/* <Welcome/> */}
      {/* <Users_Groups/> */}
    </div>
  )
}

export default MainContainer