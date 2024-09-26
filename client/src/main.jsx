import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Signup } from './components/Signup.jsx'
import { Login } from './components/Login.jsx'
import { Home } from './pages/Home.jsx'
import { Toaster } from 'sonner'
import { Layout } from './components/Layout.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { PersistGate } from "redux-persist/integration/react";
import persistStore from 'redux-persist/es/persistStore'
let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <RouterProvider router={router} /> */}
        <App />
        <Toaster />
      </PersistGate>

    </Provider>



  </StrictMode>,
)
