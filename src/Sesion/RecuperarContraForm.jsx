import React, { useState, useEffect } from "react";
import './Recuperar.css';
import { FaUser, FaLock, FaHome } from "react-icons/fa";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';
import PopupActualizar from "/src/Popups/PopupActualizar";
import PopupActualizarInv from "/src/Popups/PopupActualizarInv.jsx";
import PopupV from "/src/Popups/PopupLoginValido.jsx";
import PopupIv from "/src/Popups/PopupLoginInvalido.jsx";
import Swal from 'sweetalert2';

function RecuperarContra(props) {
  const navigate = useNavigate();
  const [Cargando, setCargando] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({
    correo: '',
    password: '',
    codigo: ''
  });
  const [codigoAleatorio, setCodigoAleatorio] = useState(null);
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  const [codigoVerificado, setCodigoVerificado] = useState(false);

  useEffect(() => {
    const codigo = Math.floor(100000 + Math.random() * 900000);
    setCodigoAleatorio(codigo);
    console.log("Código aleatorio:", codigo);
  }, []);

  const mostrarAlertaCambioContraExitoso = () => {
    Swal.fire({
      title: "Cambio de contraseña",
      text: "Credenciales actualizadas correctamente",
      icon: "success",
      button: "Aceptar"
    }).then(respuesta => {
      if (respuesta) {
        redirectToLogin();
      }
    });
  };

  const mostrarAlertaCambioContraFallido = () => {
    Swal.fire({
      title: "Correo no encontrado",
      text: "El correo que introdujo no existe o se escribió incorrectamente.",
      icon: "error",
      button: "Aceptar"
    });
  };

  const mostrarAlertaCodigoInvalido = () => {
    Swal.fire({
      title: "Código incorrecto",
      text: "El código ingresado no es válido. Inténtelo de nuevo.",
      icon: "error",
      button: "Aceptar"
    });
  };

  const [desactivarCorreo, setDesactivarCorreo] = useState(false);
  const [cambio, setCambio] = useState(0);

  const enviarCorreo = (correo, codigo) => {
    const serviceID = "service_bx84r3q";
    const templateID = "template_11jpkjs";
    const userID = "AOcEsViQIfZLeg0HL";

    const templateParams = {
      to: correo,
      subject: "Recuperación de contraseña",
      replyto: "no-reply@example.com",
      message: `Su código de verificación es: ${codigo}`
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Correo enviado', response.status, response.text);
      })
      .catch((err) => {
        console.error('Error al enviar el correo', err);
      });
  };

  const loginUsuario = async (evento) => {
    evento.preventDefault();

    if (cambio === 0) {
      try {
        const response = await axios.post('http://localhost:4567/frontend/RecuperarContra', { datosFormulario });
        console.log(response.data);

        if (response.data === 'Usuario encontrado') {
          console.log("Sí se encontró");
          enviarCorreo(datosFormulario.correo, codigoAleatorio); // Enviar correo con el código aleatorio
          setMostrarCodigo(true);
          setDesactivarCorreo(true);
          setCambio(1);
        } else {
          console.log("No se encontró");
          mostrarAlertaCambioContraFallido();
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    } else if (cambio === 1) {
      if (parseInt(datosFormulario.codigo) === codigoAleatorio) {
        setCodigoVerificado(true);
        setCambio(2);
      } else {
        mostrarAlertaCodigoInvalido();
      }
    } else if (cambio === 2) {
      try {
        const response = await axios.post('http://localhost:4567/frontend/ColocarContra2', { datosFormulario });
        console.log(response.data);
        console.log(datosFormulario);
        enviarCorreo(datosFormulario.correo, codigoAleatorio); // Enviar correo confirmando el cambio de contraseña
        mostrarAlertaCambioContraExitoso();
      } catch (error) {
        throw error;
      }
    }
  };

  const [nombre, setNombre] = useState('');

  const [mostrarPopupActualizarInv, setMostrarPopupActualizarInv] = useState(false);
  const abrirPopupActualizarInv = () => {
    setMostrarPopupActualizarInv(true);
  };

  const [mostrarPopupVeri, setMostrarPopupVeri] = useState(false);
  const abrirPopupVeri = () => {
    setMostrarPopupVeri(true);
  };

  const [mostrarPopupV, setMostrarPopupV] = useState(false);
  const abrirPopupV = () => {
    setMostrarPopupV(true);
  };

  const [mostrarPopupIv, setMostrarPopupIv] = useState(false);
  const abrirPopupIv = () => {
    setMostrarPopupIv(true);
  };

  const cambiosFormulario = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
    setMostrarPopupActualizarInv(false);
  };

  const redirectToHome = () => {
    navigate("/");
  };

  const redirectToLogin = () => {
    navigate("/Login");
  };

  return (
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

            <h1>Recuperar Contraseña</h1>

            <label htmlFor="correo" className={`label-correo ${desactivarCorreo ? 'desactivado' : ''}`}>Ingrese su correo:</label>
            <div className={`input-box ${desactivarCorreo ? 'desactivado' : ''}`}>
              <input
                type="text"
                placeholder="Correo"
                onChange={cambiosFormulario}
                name="correo"
                value={datosFormulario.correo}
                disabled={desactivarCorreo}
              />
              <FaUser className="icon" />
            </div>

            {mostrarCodigo && (
              <div>
                <label htmlFor="codigo" className="label-correo">Ingrese el código enviado a su correo:</label>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Código"
                    onChange={cambiosFormulario}
                    name="codigo"
                    value={datosFormulario.codigo}
                  />
                  <FaLock className="icon" />
                </div>
              </div>
            )}

            {codigoVerificado && (
              <div>
                <label htmlFor="password" className="label-correo">Nueva contraseña:</label>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={cambiosFormulario}
                    name="password"
                    value={datosFormulario.password}
                  />
                  <FaLock className="icon" />
                </div>
              </div>
            )}

            <button className="Entrar" onClick={loginUsuario} disabled={Cargando}>
              Entrar
            </button>

            <Box m={5}>
              {mostrarPopupV && <PopupV nombre={nombre} onClose={() => setMostrarPopupV(false)} />}
            </Box>

            <Box m={5}>
              {mostrarPopupIv && <PopupIv nombre={nombre} onClose={() => setMostrarPopupIv(false)} />}
            </Box>

            <Box m={5}>
              {mostrarPopupVeri && <PopupActualizar nombre={nombre} onClose={() => setMostrarPopupVeri(false)} />}
            </Box>

            <Box m={5}>
              {mostrarPopupActualizarInv && <PopupActualizarInv nombre={nombre} onClose={() => setMostrarPopupActualizarInv(false)} />}
            </Box>

          </form>
        </div>
      </div>
    </>
  );
}

export default RecuperarContra;
