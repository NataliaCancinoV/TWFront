import { useState, useEffect } from 'react';

import './Pedidos.css';

import viteLogo from '/vite.svg'
import Edicion1 from './assets/Edicion21.jpg';
import Edicion12 from './assets/Edicion12.jpg';
import Edicion13 from './assets/Edicion13.jpg';
import Edicion14 from './assets/Edicion14.jpg';
import Edicion15 from './assets/Edicion15.jpg';
import Edicion16 from './assets/Edicion16.jpg';
import otra_imagen from './assets/Edicion2.jpg';
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//imagenes de pastel de fresas
import pastel_fresa_original from "./assets/Pastel-fresa-original.png";
import pastel_fresa_arcoiris from "./assets/Pastel-fresas-arcoiris.png";
import pastel_fresa_oreo from "./assets/Pastel-fresas-oreo.png";
import pastel_fresa_vainilla from "./assets/Pastel-fresas-vainilla.png";

import Swal from 'sweetalert2';

import pastelZarza from "./assets/pastel-zarza.jpg"


function Pedidos() {
    const [count, setCount] = useState(0);
	const navigate = useNavigate();

const [pedidosDePasteles, setPedidosDePasteles] = useState([]);

const [datosFormulario, setDatosFormulario] = useState(
	{correo: '',
	password: '',
	nombre: ''
});


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
  
	const [nombreUsuario, setNombreUsuario]=useState("");
  
	const obtenerNombreUsuario = async () => {
	try {
	  // Realizar la llamada al backend para obtener el nombre del usuario
	  const response = await axios.post('http://localhost:4567/frontend/obtenerUsuario', { datosFormulario });
	  setNombreUsuario(response.data.nombre);
	  console.log(nombreUsuario);
	   console.log("hola"+ datosFormulario.nombre);
	} catch (error) {
	  // Manejar el error según tus necesidades
	  console.error("Error al obtener el nombre del usuario", error);
	}
	};
  
	useEffect(() => {
	// Llamar a la función al cargar la página
	obtenerNombreUsuario();
	obtenerPedidosDePasteles();
	console.log("obtuvo los pedidos");
	}, []); 
  
	const cerrarSesion = async () => {
	try {
	  // Realizar la llamada al backend para obtener el nombre del usuario
	  const response = await axios.post('http://localhost:4567/frontend/cerrarSesion', { datosFormulario });
	  setNombreUsuario(response.data.nombre);
	  console.log(nombreUsuario);
	  obtenerNombreUsuario();
	  //mostrarAlertaLogOut();
	} catch (error) {
	  // Manejar el error según tus necesidades
	  console.error("Error al obtener el nombre del usuario", error);
	}
	};

	const mostrarAlertaPedidoFallidaLogin=()=>{
	  Swal.fire({
		title: "Pedido Fallida",
		text: "Inicia Sesion para poder hacer un pedido.",
		icon: "error",
		button: "Aceptar"
  
	  });
	};


	
	const obtenerPedidosDePasteles = async () => {
		try {
		const response = await axios.post('http://localhost:4567/frontend/obtenerPedidosDePasteles');
		console.log("Pedidos de pasteles obtenidos:", response.data.pedidos_de_pasteles);
		// Almacena los pedidos de pasteles en el estado
		setPedidosDePasteles(response.data.pedidos_de_pasteles);
		} catch (error) {
		console.error("Error al obtener pedidos de pasteles:", error);
		}
	};


	const redirectPersonalizarPastelArcoiris = () => {
		// Redirige a la página del hotel cuando se hace clic en el botón
		navigate("/PersonalizarPastel/PastelArcoiris");
		};
	  
		const redirectInicio = () => {
		// Redirige a la página del hotel cuando se hace clic en el botón
		navigate("/");
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

		  const redirectToChat = ()=>{
			navigate("/Chat")
		  }

		  const mostrarAlertaEliminarPedido = (idPedido, nombPastel, status) => {
			if (status === "listo para entregar") {
			  Swal.fire({
				title: "No se puede eliminar",
				text: `El pedido del ${nombPastel} ya está listo para entregar y no se puede eliminar.`,
				icon: "info",
				confirmButtonText: "Entendido",
			  });
			} else {
			  Swal.fire({
				title: "Eliminar Pedido",
				text: `¿Seguro que quieres eliminar tu pedido del ${nombPastel}?`,
				icon: "warning",
				showCancelButton: true, // Mostrar el botón de cancelar
				confirmButtonColor: "#3085d6", // Color del botón de confirmar
				cancelButtonColor: "#d33", // Color del botón de cancelar
				confirmButtonText: "Sí", // Texto del botón de confirmar
				cancelButtonText: "No", // Texto del botón de cancelar
			  }).then((result) => {
				if (result.isConfirmed) {
				  Swal.fire({
					text: "Pedido eliminado correctamente.",
					icon: "success",
				  });
				  eliminarPedido(idPedido);
				}
			  });
			}
		  };
		  

		  const eliminarPedido = async (idPedido) => {
			console.log(idPedido);
			try {
			  if (idPedido) {
				const response = await axios.post('http://localhost:4567/frontend/eliminarPedido', { datosId: { idPedido } });
				console.log(response.data);
				// Lógica adicional si es necesario
				obtenerPedidosDePasteles(); // Asumiendo que tienes una función para obtener pedidos, similar a obtenerReservaciones
			  } else {
				console.log("El ID del pedido es obligatorio para eliminar.");
				// Lógica adicional si es necesario
			  }
			} catch (error) {
			  throw error;
			}
		  };

	  const [pedidos, setPedidos] = useState([]);

	  const generarPedidos = () => {
		if (nombreUsuario == null) {
		  return (
			<h1 className="IniSesReserva">Inicia Sesión para poder ver tus pedidos de pasteles.</h1>
		  );
		} else {
		  if (pedidosDePasteles.length === 0) {
			return (
			  <h1 className="ReservaNull">No tienes pedidos de pasteles en este momento.</h1>
			);
		  } else {
			return (
			  <div>
				{pedidosDePasteles.map(pedido => (
				  <div key={pedido.id_pedido} className="reservacion">


					<div className='container-img-pedido'>
					{pedido.nombre_pastel === 'Pastel de Fresas' ? (
						pedido.relleno === 'Original' ? <img src={pastel_fresa_original} alt="" className="imagenPastel" /> :
						pedido.relleno === 'Arcoiris' ? <img src={pastel_fresa_arcoiris} alt="" className="imagenPastel" /> :
						pedido.relleno === 'Oreo' ? <img src={pastel_fresa_oreo} alt="" className="imagenPastel" /> :
						pedido.relleno === 'Vainilla' ? <img src={pastel_fresa_vainilla} alt="" className="imagenPastel" /> :
						<img src={otra_imagen} alt="" className="imagenPastel" /> // Si el relleno no coincide con ninguno de los anteriores
					) : pedido.nombre_pastel === 'Pastel Chocolate Blanco' ? (

						<img src={Edicion1} alt="" className="imagenPastel" />
					) : pedido.nombre_pastel === 'Pastel Cajeta' ? (
		
						<img src={Edicion16} alt="" className="imagenPastel" />
					): pedido.nombre_pastel === 'Pastel de Chocolate' ? (

						<img src={Edicion13} alt="" className="imagenPastel" />
					): pedido.nombre_pastel === 'Pastel Frambuesa' ? (

						<img src={Edicion15} alt="" className="imagenPastel" />
					) : pedido.nombre_pastel === 'Pastel de Moka' ? (

						<img src={Edicion12} alt="" className="imagenPastel" />
					) : pedido.nombre_pastel === 'Pastel de Zanahoria' ? (

						<img src={Edicion14} alt="" className="imagenPastel" />
					):(
						<img src={otra_imagen} alt="" className="imagenPastel" /> // Si el pastel no es de fresas ni de chocolate blanco
					)}
					</div>


					<div className="reservaData">
					  <h3>{pedido.nombre_pastel}</h3>
					  <p>Precio del pastel: ${pedido.precio}</p>
					  <p>Tamaño: {pedido.tamaño}</p>
					  <p>Estatus: {pedido.estatus}</p>
					  <p>Inscripción: {pedido.inscripcion}</p>
					  <p>Relleno: {pedido.relleno}</p>
					  <button className="eliminar-btn" onClick={() => mostrarAlertaEliminarPedido(pedido.id_pedido, pedido.nombre_pastel,pedido.estatus)}>
						Eliminar Pedido
					  </button>
					</div>
				  </div>
				))}
			  </div>
			);
		  }
		}
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


		<main className="main-pedidos">
			<div id="contenedor_reservaciones">
				{generarPedidos()}
			</div>
		</main>


		<footer className="footer">
			<div className="container container-footer">
				<div className="menu-footer">
					<div className="contact-info">
						<p className="title-footer">Información de Contacto</p>
						<ul>
							<li>
								Avenida Xalapa 
							</li>
							<li>Teléfono: 2288520821</li>
							<li>EmaiL: cdgn_17@hotmail.com</li>
						</ul>
						<div className="social-icons">
							<span className="facebook">
								<i className="fa-brands fa-facebook-f"></i>
							</span>
							<span className="twitter">
								<i className="fa-brands fa-twitter"></i>
							</span>
							<span className="youtube">
								<i className="fa-brands fa-youtube"></i>
							</span>
							<span className="pinterest">
								<i className="fa-brands fa-pinterest-p"></i>
							</span>
							<span className="instagram">
								<i className="fa-brands fa-instagram"></i>
							</span>
						</div>
					</div>

					<div className="information">
						<p className="title-footer">Información</p>
						<ul>
							<li><a href="#">Acerca de Nosotros</a></li>
							<li><a href="#">Información de Entrega</a></li>
							<li><a href="#">Politicas de Privacidad</a></li>
							<li><a href="#">Términos y condiciones</a></li>
							<li><a href="#" onClick={redirectToChat}>Contactános</a></li>
						</ul>
					</div>

					<div className="my-account">
						<p className="title-footer">Mi cuenta</p>

						<ul>
							<li><a href="#">Mi cuenta</a></li>
							<li><a href="#">Pedidos</a></li>
							<li><a href="#">Boletín</a></li>
						</ul>
					</div>


				</div>

				<div className="copyright">


				</div>
			</div>
		</footer>

	    </body>
      </>
    )
  }

  export default Pedidos