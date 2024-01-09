
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainContainer from './component/MainContainer'
import Login from './component/Login'
import Welcome from './component/Welcome'
import Users_Groups from './component/Users_Groups'
import Users from './component/Users'
import CreateGroup from './component/CreateGroup'
import ChatArea from './component/ChatArea'
import PrivateRoute from './component/ProtectedRoute/PrivateRoute'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<PrivateRoute/>}>
            <Route path='app' element={<MainContainer />}>
              <Route path='welcome' element={<Welcome />}></Route>
              <Route path='chat' element={<ChatArea />}></Route>
              <Route path='users' element={<Users />}></Route>
              <Route path='groups' element={<Users_Groups />}></Route>
              <Route path='create-group' element={<CreateGroup />}></Route>
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
