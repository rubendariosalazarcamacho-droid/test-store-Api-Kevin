import { useState,useEffect } from "react";

export default function useFetch(url, opcion = {body,header,autorization}) {
    const [data ,setData]=useState([])
    const [Loading ,setLoading]=useState(false)
    const [error,setError]=useState("")
    async function hacerFetch() {
        const resp = await fetch(url,{header,})
    }
}