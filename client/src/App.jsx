
import { Signup } from './components/Signup'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Login } from './components/Login'
import { Home } from './pages/Home'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/protectedRoutes'
import { CreatePost } from './components/CreatePost'
import { NoLoginUser } from './components/NoLoginUser'
import Reels from './components/Reels'
import { Profile } from './components/Profile'
import { EditProfile } from './components/EditProfile'


function App() {

  const { user } = useSelector((store) => store.auth);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} >
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addpost"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route path="/reels" element={<ProtectedRoute><Reels /></ProtectedRoute>} />
        <Route path="/account/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/:id/profile" element={<Profile />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
