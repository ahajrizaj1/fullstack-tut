import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateUser from './pages/createUser'
import EditUser from './pages/editUser'
import DeleteUser from './pages/deleteUser'
import ShowUser from './pages/ShowUser'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/users/create' element={<CreateUser />} />
      <Route path='/users/details/:userId' element={<ShowUser />} />
      <Route path='/users/edit/:userId' element={<EditUser />} />
      <Route path='/users/delete/:userId' element={<DeleteUser />} />
    </Routes>
  )
}

export default App