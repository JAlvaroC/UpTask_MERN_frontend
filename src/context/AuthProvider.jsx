import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate=useNavigate()

    useEffect(() => {
        const autenticarUsuario=async()=>{
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }
            //NOTE: console.log('Si hay token');
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
                //BUG: "Content-Type":"application/json",
            }
            try {
                const {data}=await clienteAxios('/usuarios/perfil',config)
                setAuth(data)
                //OMITIDO: navigate('/proyectos')
            } catch (error) {
                setAuth({})
            }
            //NOTE: OTRAOPCION
            // finally{
            //     setCargando(false)
            // }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])
    const cerrarSesionAuth = () => {
       setAuth({})
    };
    
    
  return (
    <AuthContext.Provider
    value={{
        setAuth,
        auth,
        cargando,
        cerrarSesionAuth
    }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export {
    AuthProvider
} 
export default AuthContext
