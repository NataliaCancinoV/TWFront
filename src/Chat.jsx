import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';

import viteLogo from '/vite.svg'
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import PastelEditado1 from "./assets/Edicion1.jpg";
import PastelEditado2 from "./assets/Edicion2.jpg";
import PastelEditado3 from "./assets/Edicion3.jpg";
import PastelEditado4 from "./assets/Edicion4.jpg";
import PastelEditado5 from "./assets/Edicion5.jpg";
import PastelEditado6 from "./assets/Edicion6.jpg";
import PastelZanahoria from "./assets/Pastel-Zanahoria.jpg";
import MejoresPasteles from "./assets/MejoresPasteles.jpg";
import PastelTematico from "./assets/pastel-tematico.jpg";
import Swal from 'sweetalert2'

function Chat() {
    const [datosFormulario, setDatosFormulario] = useState({
        correo: '',
        password: '',
        nombre: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const navigate = useNavigate();
    const socketRef = useRef(null);

    const redirectPersonalizarPastelArcoiris = () => {
        // Redirige a la página del hotel cuando se hace clic en el botón
        navigate("/PersonalizarPastel/PastelArcoiris");
      };

	  const redirectToLogin = () => {

		navigate("/Login");
	  };
	
    
      const redirectToPedidos = () => {
        navigate("/Pedidos");
    
      };
    
      const redirectToPasteles = () => {
        navigate("/Pasteles");
      };
    
      const redirectInicio = () => {

        navigate("/");
      };

      const mostrarAlertaLogOut = () => {
		Swal.fire({
		  title: "Cerrar Sesión",
		  text: "¿Seguro que quieres cerrar sesión?",
		  icon: "warning",
		  showCancelButton: true, // Mostrar el botón de cancelar
		  confirmButtonColor: "#3085d6", // Color del botón de confirmar
		  cancelButtonColor: "#d33", // Color del botón de cancelar
		  confirmButtonText: "Sí", // Texto del botón de confirmar
		  cancelButtonText: "No", // Texto del botón de cancelar
		}).then((result) => {
		  if (result.isConfirmed) {
			Swal.fire({
			  text: "Sesión cerrada correctamente. Adiós " + nombreUsuario + "",
			  icon: "success",
			});
			cerrarSesion();
		  }
		});
	  };

    const obtenerNombreUsuario = async () => {
        try {
            // Realizar la llamada al backend para obtener el nombre del usuario
            const response = await axios.post('http://localhost:4567/frontend/obtenerUsuario', { datosFormulario });
            setNombreUsuario(response.data.nombre);
            console.log(response.data.nombre);
        } catch (error) {
            // Manejar el error según tus necesidades
            console.error("Error al obtener el nombre del usuario", error);
        }
    };

    useEffect(() => {
        obtenerNombreUsuario();

        socketRef.current = new WebSocket('ws://localhost:1234');
        
        socketRef.current.addEventListener('message', function(event) {
            setMensajes(prevMensajes => [...prevMensajes, event.data]);
        });

        return () => {
            socketRef.current.close();
        };
    }, []);

    const enviarMensaje = () => {
        const msj = `${nombreUsuario}: ${mensaje}`;
        socketRef.current.send(msj);
        setMensaje('');
    };

    return (
    <>
    <body>

    <header>
			<div className="container-hero">
				<div className="container hero">
					<div className="customer-support">
         			 <RiCustomerService2Fill className="icono-cliente" />
						<div className="content-customer-support">

							<span className="text">Soporte al cliente</span>
							<span className="number">123-456-7890</span>
              
						</div>
					</div>

					<div className="container-logo">
						<i className="fa-solid fa-mug-hot"></i>
						<h1 className="logo"><a href="/">Pasteleria RAPI</a></h1>
					</div>

					<div className="container-user">
         		 <FaUser className="icono-User"/>

						<div className="content-shopping-cart">

						</div>
					</div>
				</div>
			</div>

			<div className="container-navbar">
				<nav className="navbar container">
					<i className="fa-solid fa-bars"></i>
					<ul className="menu">
                    <li><a href="#" onClick={redirectInicio}>Inicio</a></li>
						<li><a href="#" onClick={redirectToPasteles} >Pasteles</a></li>
						<li><a href="#" onClick={redirectPersonalizarPastelArcoiris}>Personalizar Pastel</a></li>
						<li><a href="/Pedidos" onClick={redirectToPedidos}>Pedidos</a></li>
						<li><a href="#">Blog</a></li>
						{nombreUsuario ? (
								<>
								<li className="enlaceNombre"><a href="#">{nombreUsuario}</a></li>
								<li className="enlaceNombre2"><a href="#" onClick={mostrarAlertaLogOut}>Cerrar Sesión</a></li>
								</>
							) : (
								<li className="enlaceNombre2"><a href="#" onClick={redirectToLogin}>Iniciar Sesión</a></li>
							)
						}

					</ul>

					<form className="search-form">
						<input type="search" placeholder="Buscar..." />
						<button className="btn-search">
            			  <FaMagnifyingGlass className="icono-lupa" />
						</button>
					</form>
				</nav>
			</div>
		</header>
        
        <main className="main-content">

            <div className="sesionChat">
                <textarea
                    className="chatBox"
                    id="response"
                    readOnly
                    value={mensajes.join('\n')}
                ></textarea>
                <br />
                <input
                    type="text"
                    id="mensaje"
                    name="mensaje"
                    className="textBox"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />
                <button id="sendButton" onClick={enviarMensaje}>Enviar mensaje</button>
            </div>
        </main>
        </body>
    </>
    );
}

export default Chat;



