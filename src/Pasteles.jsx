import React, {useEffect, useState} from "react";

import viteLogo from '/vite.svg'
import './Pasteles.css'
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
import axios from 'axios';

function AppPasteles() {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

	const [datosFormulario, setDatosFormulario] = useState(
		{correo: '',
		password: '',
		nombre: ''
	});

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

	  const redirectToChat = ()=>{
		navigate("/Chat")
	  }

	  const redirectToChocolate = ()=>{
		navigate("/Pasteles/ChocolateBlanco")
	  };

	  const redirectToMoka = ()=>{
		navigate("/Pasteles/PastelMoka")
	  };

	  const redirectToChocolate2 = ()=>{
		navigate("/Pasteles/PastelChocolate")
	  };

	  const redirectToPastelZanahoria = ()=>{
		navigate("/Pasteles/PastelZanahoria")
	  };

	  const redirectToPastelFrambuesa = ()=>{
		navigate("/Pasteles/PastelFrambuesa")
	  }; 

	  const redirectToPastelCajeta = ()=>{
		navigate("/Pasteles/PastelCajeta")
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
	
	  const [nombreUsuario, setNombreUsuario]=useState("");

	  const obtenerNombreUsuario = async () => {
		try {
		  // Realizar la llamada al backend para obtener el nombre del usuario
		  const response = await axios.post('http://localhost:4567/frontend/obtenerUsuario', { datosFormulario });
		  setNombreUsuario(response.data.nombre);
		  console.log(nombreUsuario);

		} catch (error) {
		  // Manejar el error según tus necesidades
		  console.error("Error al obtener el nombre del usuario", error);
		}
	  };
	
	  useEffect(() => {
		// Llamar a la función al cargar la página
		obtenerNombreUsuario();
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
			<section className="container container-features">

			</section>

			<section className="container top-categories">

			</section>

			<section className="container top-products">
			<section className="container top-products">
				<h1 className="heading-2"><strong>Productos en linea:</strong> </h1>

				<div className="container-options">

				</div>

				<div className="container-products">

					<div className="card-product">
						<div className="container-img">
							<img src={PastelEditado1} alt="Pastel Chocolate Blanco" />
							<span className="discount">-10%</span>
							<div className="button-group">

	
							</div>
						</div>
						<div className="content-card-product">
							<div className="stars">
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-regular fa-star"></i>
							</div>
							<h3 className='heading-3'>Pastel Chocolate Blanco</h3>

							<span className= "add-cart" onClick={redirectToChocolate}>
								<FaRegEye className="icono-eye" />
							</span>
							<p className="price">$603<span>$670</span></p>
						</div>
					</div>

					<div className="card-product">
						<div className="container-img">
							<img
								src={PastelEditado2} alt="Cafe incafe-ingles.jpg"
							/>
							<span className="discount">-30%</span>
							<div className="button-group">

							</div>
						</div>
						<div className="content-card-product">
							<div className="stars">
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-regular fa-star"></i>
								<i className="fa-regular fa-star"></i>
							</div>
							<h3>Pastel de Moka</h3>
							<span className="add-cart" onClick={redirectToMoka}>
								<FaRegEye className="icono-eye" />
							</span>
							<p className="price">$560 <span>$800</span></p>
						</div>
					</div>

					<div className="card-product">
						<div className="container-img">
							<img
								src={PastelEditado3}
								alt="Cafe Australiano"
							/>
							<div className="button-group">

							</div>
						</div>
						<div className="content-card-product">
							<div className="stars">
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
							</div>
							<h3>Pastel de Chocolate</h3>
							<span className="add-cart" onClick={redirectToChocolate2}>
								<FaRegEye className="icono-eye" />
							</span>
							<p className="price">$350</p>
						</div>
					</div>

					<div className="card-product">
						<div className="container-img">
							<img src={PastelEditado4} alt="Moka" />
							<div className="button-group">

								

							</div>
						</div>
						<div className="content-card-product">
							<div className="stars">
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-regular fa-star"></i>
							</div>
							<h3>Pastel de Zanahoria</h3>
							<span className="add-cart" onClick={redirectToPastelZanahoria}>
								<FaRegEye className="icono-eye" />
							</span>
							<p className="price">$450</p>
						</div>
					</div>

					<div className="card-product">
						<div className="container-img">
							<img src={PastelEditado5} alt="Cafe Irish" />
							<span className="discount">-13%</span>
							<div className="button-group">



							</div>
						</div>
						<div className="content-card-product">
							<div className="stars">
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-regular fa-star"></i>
							</div>
							<h3>Pastel Frambuesa</h3>
							<span className="add-cart" onClick={redirectToPastelFrambuesa}>
								<FaRegEye className="icono-eye" />
							</span>
							<p className="price">$300 </p>
						</div>
					</div>

					<div className="card-product">
						<div className="container-img">
							<img
								src={PastelEditado6}
								alt="Cafe incafe-ingles.jpg"
							/>
							<span className="discount">-22%</span>
							<div className="button-group">



							</div>
						</div>
						<div className="content-card-product">
							<div className="stars">
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-regular fa-star"></i>
								<i className="fa-regular fa-star"></i>
							</div>
							<h3>Pastel de Cajeta</h3>
							<span className="add-cart" onClick={redirectToPastelCajeta}>
								<FaRegEye className="icono-eye" />
							</span>
							<p className="price">$390 <span>$500</span></p>
						</div>
					</div>
				</div>

				<div className="container-products">

				</div>

				
			</section>

			</section>

			

			<section className="container specials">
				<h1 className="heading-1"></h1>

				<div className="container-products">

				</div>
			</section>

			<section className="container blogs">
	
			</section>

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

  export default AppPasteles