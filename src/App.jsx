import React from 'react'
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ClienteHome from './pages/ClienteHome'
export default function App() {

  function PrivateRouteCliente({ children }) {
    const token = localStorage.getItem("token")
    const rol = localStorage.getItem("user_rol")
    if (!token) {
      return <Navigate to="/Login"></Navigate>
    }
    return rol === "admin" ? <Navigate to="/"></Navigate> : children

  }
  function PrivateRouteAdministrador({ children }) {
    const token = localStorage.getItem("token")
    const rol = localStorage.getItem("user_rol")
    if (!token) {
      return <Navigate to="/Login"></Navigate>
    }
    return rol === "cliente" ? <Navigate to="/cliente"></Navigate> : children
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRouteAdministrador><Home /></PrivateRouteAdministrador>}></Route>
        <Route path='/cliente' element={<PrivateRouteCliente><ClienteHome /></PrivateRouteCliente>}></Route>
        <Route path='/Login' element={<Login />}></Route>
      </Routes>
    </>
  )
}
