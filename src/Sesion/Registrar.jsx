import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock, FaHome } from "react-icons/fa";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import PopupRegistro from "/src/Popups/PopupRegistro.jsx";
import PopupRegistroS from "/src/Popups/PopupRsindatos.jsx";

function Registrar(props){
    const navigate = useNavigate();
const  [Cargando, setCargando] = useState(false)
const [datosFormulario, setDatosFormulario] = useState(
    {correo: '',
    password: '',
    nombre: ''
});

  const mostrarAlertaRegistroFallido=()=>{
    Swal.fire({
      title: "Registro Fallido",
      text: "Introduzca los datos para poder registrarse.",
      icon: "error",
      button: "Aceptar"

    });
  }

  const mostrarAlertaRegistroExitoso=()=>{
    Swal.fire({
      title: "Registro Exitoso",
      text: "Usuario registrado correctamente.",
      icon: "success",
      button: "Aceptar"

    });
  }

  const mostrarAlertaCorreoExistente=()=>{
    //console.log(datosFormulario.correo);
    Swal.fire({
      title: "Registro Fallido",
      text: "El correo "+datosFormulario.correo+" ya ha sido registrado",
      icon: "error",
      button: "Aceptar"

    });
  }


  const registrarUsuario = async (evento) => {
    evento.preventDefault();
    try{
      if(datosFormulario.correo && datosFormulario.password && datosFormulario.nombre) {

        const response2 = await axios.post('http://localhost:4567/frontend/correoExiste',{datosFormulario})
        console.log(response2.data);
        const res = response2.data;
        console.log("res: "+res);

        // Verificar si el correo existe
        if (res.correoExistente) {
          // Hacer algo si el correo existe
          mostrarAlertaCorreoExistente();
          setDatosFormulario({
            correo: '',
            password: '',
            nombre: ''
        });

      } else {
       
          // Hacer algo en caso de que el correo no existe
          
          const response = await axios.post('http://localhost:4567/frontend/',{datosFormulario})
          console.log(response.data)
          mostrarAlertaRegistroExitoso();
          setDatosFormulario({
            correo: '',
            password: '',
            nombre: ''
        });
          return response.data
      }
        
      }else{
        console.log("si entro");
        mostrarAlertaRegistroFallido();
        setDatosFormulario({
          correo: '',
          password: '',
          nombre: ''
      });
        
        return;
      }
    } catch(error){
        throw error
    }
}

const [mostrarPopupR, setMostrarPopupR] = useState(false);
const abrirPopupR = () => {
  setMostrarPopupR(true);
};

const [mostrarPopupRs, setMostrarPopupRs] = useState(false);
const abrirPopupRs = () => {
  setMostrarPopupRs(true);
};

const cambiosFormulario = (evento) => {
  //console.log(evento.target)
  const {name,value} = evento.target
  setDatosFormulario ({...datosFormulario, [name]: value})
  setMostrarPopupR(false);

}

const redirectToHome = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/");
  };

  const redirectToLogin = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/Login");
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

                <h1>Registro</h1>


                <div className="input-box">
                    <input type="text" placeholder="Correo" onChange={cambiosFormulario} name="correo" value={datosFormulario.correo}/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Contraseña" onChange={cambiosFormulario} name="password" value={datosFormulario.password}/>
                    <FaLock className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Nombre" onChange={cambiosFormulario} name="nombre" value={datosFormulario.nombre}/>
                    <FaUser className="icon"/>
                </div>


        
                <button className="Entrar" onClick={(evento) => registrarUsuario(evento)}>Registrar</button>
                
                
                <div className="register-link">
                    <p>¿Tienes cuenta? <a href="" onClick={redirectToLogin}>Login</a></p>
                </div>
                <Box m={5}>
                    {mostrarPopupRs && <PopupRegistroS onClose={() => setMostrarPopupRs(false)} />}
                </Box>
                <Box m={5}>
                    {mostrarPopupR && <PopupRegistro onClose={() => setMostrarPopupR(false)} />}
                </Box>
            </form>
        </div>
        </div>
        </>
    )

}

export default Registrar;