import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App'
import Home from './pages/Home/home'
import Infos from './pages/Informacoes/infos'

import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App/>}>
        <Route path='/' element={<Home />} />
        <Route path='/infos/:id' element={<Infos />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
