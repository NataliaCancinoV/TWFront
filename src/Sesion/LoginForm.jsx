import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock, FaHome } from "react-icons/fa";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PopupV from "/src/Popups/PopupLoginValido.jsx";
import PopupIv from "/src/Popups/PopupLoginInvalido.jsx";
import Swal from 'sweetalert2'


function LoginForm(props){
    const navigate = useNavigate();
const  [Cargando, setCargando] = useState(false)
const [datosFormulario, setDatosFormulario] = useState(
    {correo: '',
    password: ''
})

const redirectToRecuperarContraseña = () => {
    navigate("/RecuperarContraseña");
  };

  const redirectToAdminVista = () => {
    navigate("/AdminVista");
  };

  const mostrarAlertaLoginExitoso=(nomb)=>{
    Swal.fire({
      title: "Inicio de sesion Exitoso",
      text: "Bienvenido "+nomb+".",
      icon: "success",
      button: "Aceptar"

    }).then(respuesta=>{
        if(respuesta){
            if(datosFormulario.correo == "admin" && datosFormulario.password == "12345"){
                console.log("asdasddsdasdasdadadsasddasdasdassa");
                redirectToAdminVista();
            }else{
                redirectToHome();
            }

        }
        
    })
  }

  const mostrarAlertaLoginFallido=()=>{
    Swal.fire({
      title: "Inicio de sesion fallido",
      text: "Usuario o Contraseña Incorrecta.",
      icon: "error",
      button: "Aceptar"

    });
  }

  const mostrarAlertaLoginSinDatos=()=>{
    Swal.fire({
      title: "Inicio de sesion fallido",
      text: "Introduzca los datos que se le piden.",
      icon: "error",
      button: "Aceptar"

    });
  }

const loginUsuario = async (evento) => {
    evento.preventDefault();
    try{
        console.log(datosFormulario)
        const response = await axios.post('http://localhost:4567/frontend/login',{datosFormulario})
        console.log(response.data)
        console.log("c = " +datosFormulario.correo+" p = "+datosFormulario.password)
        if(datosFormulario.correo && datosFormulario.password){
            if (response.data === 'Invalido') {
                // Si la respuesta es 'Invalido', limpiar los campos del formulario
                mostrarAlertaLoginFallido();
                setDatosFormulario({
                    correo: '',
                    password: ''
                });
    
                
    
            } else {
    
                // Si la respuesta es 'Valido', puedes realizar las acciones deseadas
                setNombre(response.data.nombre);
                console.log(response.data.nombre);
                mostrarAlertaLoginExitoso(response.data.nombre);
                //abrirPopupV()
            }
        }else{
            
            mostrarAlertaLoginSinDatos();
        }

        return response.data
    } catch(error){
        throw error
    }
}

const [nombre,setNombre]=useState('')

const [mostrarPopupV, setMostrarPopupV] = useState(false);
const abrirPopupV = () => {
    setMostrarPopupV(true);
};

const [mostrarPopupIv, setMostrarPopupIv] = useState(false);
const abrirPopupIv = () => {
    setMostrarPopupIv(true);
};

const cambiosFormulario = (evento) => {
    //console.log(evento.target)
    const {name,value} = evento.target
    setDatosFormulario ({...datosFormulario, [name]: value})

    setMostrarPopupIv(false);
}

const redirectToHome = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/");
  };

  const redirectToRegistro = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/Registro");
  };

    return(
        <>
        <div className="cuerpo">
        <div className="wrapper">
            <form>

                <div className="boton1">
                    <button type="button" className="button first-button" onClick={redirectToHome}>
                    <span className="button-text"></span>
                    <FaHome />
                </button>
                </div>

                <h1>Inicio</h1>


                <div className="input-box">
                    <input type="text" placeholder="Correo" onChange={cambiosFormulario} name="correo" value={datosFormulario.correo}/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Contraseña" onChange={cambiosFormulario} name="password" value={datosFormulario.password}/>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Recuerdame</label>
                    <a href="#" onClick={redirectToRecuperarContraseña} >¿Contraseña olvidada?</a>
                </div>
        
                <button className="Entrar" onClick={loginUsuario} disabled={Cargando}>Entrar</button>
                
                
                <div className="register-link">
                    <p>¿No tienes una cuenta? <a href="" onClick={redirectToRegistro}>Register </a></p>
                </div>
                
                <Box m={5}>
                    {mostrarPopupV && <PopupV nombre ={nombre} onClose={() => setMostrarPopupV(false)} />}
                </Box>
                <Box m={5}>
                    {mostrarPopupIv && <PopupIv nombre ={nombre} onClose={() => setMostrarPopupIv(false)} />}
                </Box>
            </form>
        </div>
        </div>
        </>
    )

}

export default LoginForm;