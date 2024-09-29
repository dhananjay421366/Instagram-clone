// import { Signup } from "./components/Signup";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
//   useNavigate,
// } from "react-router-dom";
// import { Layout } from "./components/Layout";
// import { Login } from "./components/Login";
// import { Home } from "./pages/Home";
// import { useDispatch, useSelector } from "react-redux";
// import ProtectedRoute from "./components/protectedRoutes";
// import { CreatePost } from "./components/CreatePost";
// import { NoLoginUser } from "./components/NoLoginUser";
// import Reels from "./components/Reels";
// import { Profile } from "./components/Profile";
// import { EditProfile } from "./components/EditProfile";
// import { Chatpage } from "./components/Chatpage";
// import { io } from "socket.io-client";
// import { useEffect } from "react";
// import { setSocket } from "./redux/Socketlice";
// import { setOnlineUsers } from "./redux/chatSlice";

// function App() {
//   const { user } = useSelector((store) => store.auth);
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Layout />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         {/* Protected routes */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/addpost"
//           element={
//             <ProtectedRoute>
//               <CreatePost />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/reels"
//           element={
//             <ProtectedRoute>
//               <Reels />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/account/edit"
//           element={
//             <ProtectedRoute>
//               <EditProfile />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/:id/profile" element={<Profile />} />
//         <Route path="/chat" element={<Chatpage />} />
//       </Route>
//     )
//   );
//   const dispatch = useDispatch();

//   // Socket connection
//   useEffect(() => {
//     if (user) {
//       const socketio = io("http://localhost:8000", {
//         query: {
//           userId: user?.data.user._id,
//         },
//         transports: ["websocket"],
//       });
//       dispatch(setSocket(socketio));

//       // listning all the events
//       socketio.on("getOnlineUser", (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });
//       return () => {
//         socketio.close();
//         dispatch(setSocket(null));
//       };
//     } else {
//       socketio.close();
//       dispatch(setSocket(null));
//     }
//   }, [user, dispatch]);
//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }

// export default App;
// App.js
import { Signup } from "./components/Signup";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Home } from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/protectedRoutes";
import { CreatePost } from "./components/CreatePost";
import { NoLoginUser } from "./components/NoLoginUser";
import Reels from "./components/Reels";
import { Profile } from "./components/Profile";
import { EditProfile } from "./components/EditProfile";
import { Chatpage } from "./components/Chatpage";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { setSocket } from "./redux/Socketlice";
import { setOnlineUsers } from "./redux/chatSlice";


function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:8000", {
        query: {
          userId: user?.data.user._id,
        },
        transports: ["websocket"],
      });

      // Instead of storing the socket in Redux state, use a React context or a local variable
      dispatch(setSocket(socketio));

      // Listen for online users
      socketio.on("getOnlineUser", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketio.disconnect();
        dispatch(setSocket(null));
      };
    }
  }, [user, dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
        <Route
          path="/reels"
          element={
            <ProtectedRoute>
              <Reels />
            </ProtectedRoute>
          }
        />
        <Route path="/account/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/:id/profile" element={<Profile />} />
        <Route path="/chat" element={<Chatpage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

