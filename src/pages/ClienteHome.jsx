import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
export default function ClienteHome() {
    const [pedidos, setPedidos] = useState([])
    const nombre = localStorage.getItem("username")
    const navigate = useNavigate()
    function salir() {
        localStorage.clear()
        navigate("/Login")
    }
    useEffect(() => {
        async function traerData() {
            const token = localStorage.getItem("token")
            const res = await fetch("https://api-funval-g6.onrender.com/orders/", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })
            const data = await res.json()
            setPedidos(data)
            console.log(data)
        }
        traerData()
    }, [])
    return (
        <div className='min-h-screen bg-slate-950 text-white'>
            {/* Navbar */}
            <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg tracking-tight">Sistema de Pedidos Del cliente</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-sm">Hola, <span className="text-white font-semibold">{nombre}</span></span>
                    <button
                        onClick={salir}
                        className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 hover:text-red-300 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Salir
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="px-6 py-8 max-w-6xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">Pedidos</h2>
                    <p className="text-slate-400 text-sm mt-1">{pedidos.length} pedidos encontrados</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {pedidos.map((info, index) => {
                        const statusColor = info.status === "completed"
                            ? "text-green-400 bg-green-400/10 border-green-400/20"
                            : info.status === "pending"
                            ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
                            : "text-blue-400 bg-blue-400/10 border-blue-400/20"

                        return (
                            <div
                                key={index}
                                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor}`}>
                                        {info.status}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs mb-1">Usuario</p>
                                <p className="text-white font-semibold text-sm mb-3 truncate">{info.user_id}</p>
                                <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
                                    <span className="text-slate-400 text-xs">Total</span>
                                    <span className="text-2xl font-bold text-white">${info.total}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
