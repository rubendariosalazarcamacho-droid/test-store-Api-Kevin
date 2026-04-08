import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        async function fetchProductos() {
            const token = localStorage.getItem("token");
            const res = await fetch("https://api-funval-g6.onrender.com/products/",
                {
                    headers: {"Authorization": `Bearer ${token}`}
                }
            )
            if(res.ok){
                const data = await res.json();
                setProductos(data);
            }
        }    
        fetchProductos();
    }, [])

    async function crearProducto(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        await fetch("https://api-funval-g6.onrender.com/products/",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            }
        )
        window.location.reload();
    }

    async function borrarProducto(id) {
        const token = localStorage.getItem("token");
        await fetch(`https://api-funval-g6.onrender.com/products/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        setProductos(productos.filter(p => p.id !== id));
    }

    return(
        <>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Gerenciar Productos</h2>
                    <button onClick={() => navigate('/')} className="text-blue-400 hover:text-blue-300">
                        Volver Para Pedidos
                    </button>
                </div>

                <form onSubmit={crearProducto} className="bg-slate-900 border border-slate-800 p-6 rounded-xl mb-8 flex flex-wrap gap-4 items-end">
                    <div className="flex flex-col gap-1 w-full sm:w-auto">
                        <label className="text-sm text-slate-400">Nombre del Producto</label>
                        <input type="text" className="bg-slate-800 border border-slate-700 text-white p-2 rounded outline-none focus:border-blue-500"
                            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div className="flex flex-col gap-1 w-full sm:w-auto">
                        <label className="text-sm text-slate-400">Precio ($)</label>
                        <input type="number" className="bg-slate-800 border border-slate-700 text-white p-2 rounded outline-none focus:border-blue-500"
                            value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold transition-all h-[42px] mt-2">
                        Adicionar Producto
                    </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {productos.map(p => (
                        <div key={p.id} className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-600 transition-all">
                            <h3 className="font-bold text-lg">{p.name}</h3>
                            <p className="text-emerald-400 text-xl font-bold mt-1">${p.price}</p>
                            <div className="mt-5 flex gap-2">
                                <button onClick={() => borrarProducto(p.id)} className="w-full bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 py-2 rounded-lg text-sm font-medium transition-all">
                                    Borrar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}