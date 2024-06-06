import React, {useEffect, useState} from "react";

import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import './ChocolateBlanco.css';
import Swal from 'sweetalert2'
import axios from 'axios';
import StarRatings from 'react-star-ratings';


function PastelChocolate() {
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

  
    const redirectToPedidos = () => {
    navigate("/Pedidos");
  
    };
  
    const redirectToPasteles = () => {
    navigate("/Pasteles");
    };
  
    const redirectInicio = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/");
    };
  

    const redirectToLogin = () => {

      navigate("/Login");
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
      obtenerReseñasPorPastel();
      mostrarReseñas();
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

      
      const mostrarAlertaReservaFallidaPers=()=>{
        Swal.fire({
          title: "Pedidos Info",
          text: "No se encuentra disponible.",
          icon: "info",
          button: "Aceptar"
    
        });
      };

      const mostrarAlertaReservaExitosa=()=>{
        Swal.fire({
          title: "Pedido Exitosa",
          text: "Tu Pedido se ha realizado correctamente.",
          icon: "success",
          button: "Aceptar"
    
        });
      };
  

      const hacerPedidoPastel1 = async () => {  


        try{

          if(nombreUsuario==null){
            mostrarAlertaPedidoFallidaLogin();
            
          }else{

            const response = await axios.post('http://localhost:4567/frontend/hacerPedidoPastel1', {
              textoEncima: "",
              textoCantidad: "8",
              textoRelleno: "Chocolate Fudge Cake",
              textoTipo: "Pastel de Chocolate",
              textoPrecio:"350",
              idPastel: "5"
            });

          mostrarAlertaReservaExitosa();
          }

        }catch(error){
          console.error("Error al hace el pedido");
          throw error;

        }



      };

      

      const [reseñas, setReseñas] = useState([]);
      const [datosFormularioReseña, setDatosFormularioReseña] = useState(
          {contenido: '',
          estrellas: 5
      });


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosFormularioReseña({
          ...datosFormularioReseña,
          [name]: value,
        });
      };

      const enviarReseña = async (e) => {
        e.preventDefault();
        await agregarReseña();
        await obtenerReseñasPorPastel("5"); // Obtener las reseñas nuevamente para actualizar la lista
      };


      const agregarReseña = async () => {  
        console.log("Agregando reseña"); 
        console.log(datosFormularioReseña.contenido);
        console.log(datosFormularioReseña.estrellas);
        console.log(nombreUsuario)
    
        try{
            if(nombreUsuario==null){
                mostrarAlertaReseñaFallidaLogin();
            }else{
                const response = await axios.post('http://localhost:4567/frontend/agregarResenia', {
                    nombreUsuario: nombreUsuario,
                    idPastel: "5", // Asegúrate de tener el id del pastel
                    contenido: datosFormularioReseña.contenido,
                    estrellas: datosFormularioReseña.estrellas,
                });
    
                console.log(response.data);
                //mostrarAlertaReseñaExitosa();
                console.log("reseña exitosa");
                console.log("")    
                // Limpiar los estados después de agregar la reseña
                setDatosFormularioReseña({ contenido: "", estrellas: 0 });
            }
        }catch(error){
            console.error("Error al agregar la reseña");
            throw error;
        }

             
    };


    const obtenerReseñasPorPastel = async (idPastel) => {
      try {
        const response = await axios.post('http://localhost:4567/frontend/obtenerReseniasPorPastel', {
          idPastel: "5",
        });
        console.log("Reseñas obtenidas:", response.data.reseñas);
        const reseñasTransformadas = response.data.reseñas.map(reseña => ({
          idReseña: reseña.id_reseña,
          nombreUsuario: reseña.nombre_usuario,
          idPastel: reseña.id_pastel,
          contenido: reseña.contenido,
          estrellas: reseña.estrellas,
        }));
    
        setReseñas(reseñasTransformadas);
      } catch (error) {
        console.error("Error al obtener reseñas:", error);
      }
    };
    
    const mostrarReseñas = () => {
      if (!nombreUsuario) {
        return (
          <h1 className="IniSesReserva">Inicia Sesión para poder ver las reseñas.</h1>
        );
      } else {
        if (reseñas.length === 0) {
          return (
            <h1 className="ReseñaNull">No hay reseñas para este pastel en este momento.</h1>
          );
        } else {
          return (
            <div className="flex justify-center space-x-4">
              {reseñas.map(reseña => (
                <div key={reseña.idReseña} className="customer-review-card">
                  <div className="customer-review-info">
                    <img className="customer-review-avatar" src="https://placehold.co/100x100" />
                    <div>
                      <div className="customer-review-name">{reseña.nombreUsuario}</div>
                    </div>
                  </div>
                  <div className="customer-review-rating">
                    {"★".repeat(reseña.estrellas)}{"☆".repeat(5 - reseña.estrellas)}
                  </div>
                  <p className="customer-review-content">
                    {reseña.contenido}
                  </p>
                </div>
              ))}
            </div>
          );
        }
      }
    };

  return (
    <>

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

      <main className = "main-pers-pastel">
        <div className="container-img-4" >
            
        </div>
        <div className="container-info-product">
          <div className="container-price">
            
            <h1 className="titulo-Pastel">Pastel De Chocolate</h1>
            <i className="fa-solid fa-angle-right"></i>
          </div>

          <div className="container-details-product">
            <div className="form-group">
                <div className="OpcionesPers">
                <h2 className="textPersPastel">Precio:</h2><p className="pastel-Type1"><strong>$350</strong></p>

                <h2 className="textPersPastel">Tamaño:</h2><p className="pastel-Type1"><strong>Mediano</strong></p>
               
                <h2 className="textPersPastel">Relleno:</h2><p className="pastel-Type1"><strong>Chocolate Fudge Cake</strong></p>
                <div className="mb-4">


                </div>
                <div className="mb-6">
                    
                </div>
                </div>
            </div>
          </div>

          <div className="container-add-cart">
            <button className="btn-add-to-cart" onClick={hacerPedidoPastel1}>
              <i className="fa-solid fa-plus"></i>
              Comprar
            </button>
          </div>

          <div className="container-description">
            <div className="title-description">
              <h4>Descripción</h4>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="text-description">
              <p>
              Este es un delicioso pastel de chocolate con frosting de chocolate y bolitas de chocolate. El pastel es de un color marrón intenso y tiene una textura húmeda y densa. El frosting de chocolate es cremoso y dulce, y las bolitas de chocolate añaden un toque de textura y sabor.
              </p>
            </div>
          </div>

          <div className="container-additional-information">
            <div className="title-additional-information">
              <h4>Información adicional</h4>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="text-additional-information hidden">
              <p>-----------</p>
            </div>
          </div>

          <div className="container-reviews">
            <div className="title-reviews">
              <h4>Reseñas</h4>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="text-reviews hidden">
              <p>-----------</p>
            </div>
          </div>


        </div>
      </main>



      <div className="Reseñas">

      <h2 className="customer-reviews-title">Reseñas</h2>

      <div className="estrellas-reviews-container"> 
      <h1>Calificación:</h1>
      <StarRatings
            rating={datosFormularioReseña.estrellas}
            starRatedColor="#4b1e29"
            starHoverColor="#8B374A"
            changeRating={(newRating) => setDatosFormularioReseña({...datosFormularioReseña, estrellas: newRating})}
            numberOfStars={5}
            name='rating'
            starDimension="30px"
        />
      </div>
      <div className="customer-reviews-container">    
      <div className="reseñas-conteiner">
          <input className="input-reseñas"
          type="text"
          name="contenido"
          value={datosFormularioReseña.contenido}
          onChange={handleInputChange}
          placeholder="Escribe tu reseña aquí"></input>


        

          <button className="boton-reseñas" onClick={enviarReseña}>Enviar</button>
        </div>  
        {mostrarReseñas()}
      
      </div>

      </div>

      

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
							<li><a href="#">Contactános</a></li>
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
    </>
  );
}

export default PastelChocolate;