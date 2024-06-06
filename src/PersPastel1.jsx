import React, { useState, useEffect } from "react";
import './PersPastelStyle.css';

import { Button, Select, MenuItem, TextField, Box } from '@mui/material';

import StarRatings from 'react-star-ratings';

import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import pastel_fresa_original from "./assets/Pastel-fresa-original.png";
import pastel_fresa_arcoiris from "./assets/Pastel-fresas-arcoiris.png";
import pastel_fresa_oreo from "./assets/Pastel-fresas-oreo.png";
import pastel_fresa_vainilla from "./assets/Pastel-fresas-vainilla.png";
import Swal from 'sweetalert2'
import pastelTexto from "./assets/pastel-texto.jpg"

function Pastel() {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const [textoEncima, setTextoEncima] = useState("");

  const [textoCantidad, setTextoCantidad] = useState("");

  const [textoRelleno, setTextoRelleno] = useState("");

  const [textoTipo, setTextoTipo] = useState("");

  const [textoPrecio, setTextoPrecio] = useState("");




  const [datosPastel, setDatosPastel] = useState(
    { 
      texto: '',
      quantity: 1
     
});

const [datosPastelEnviar, setDatosPastelEnviar] = useState(
  { 
    texto: textoEncima,
    quantity: datosPastel.quantity
   
});

const [datosFormulario, setDatosFormulario] = useState(
	{correo: '',
	password: '',
	nombre: ''
});

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

    const [lastSelectedImage, setLastSelectedImage] = useState(pastel_fresa_original); 
    const [imagenVisible, setImagenVisible] = useState(pastel_fresa_original);
    const [inputActivo, setInputActivo] = useState(false);
    const cambiarImagenBoton = (nuevaImagen) => {
      if (!inputActivo) {
        setImagenVisible(nuevaImagen);
        setLastSelectedImage(nuevaImagen);
      }
    };
  
    const handleChange = (event) => {
      setImagenVisible(pastelTexto);
      setDatosPastel(prevState => ({
        ...prevState,   // Clona el estado actual
        texto: event.target.value, // Establece el campo 'correo' con el valor del evento
      }));
   
    };

    const handleInputFocus = () => {
      console.log(textoEncima);
      setDatosPastel(prevState => ({
        ...prevState,   // Clona el estado actual
        texto: textoEncima, // Establece el campo 'correo' con el valor del evento
      }));

      //console.log("hola");

      
      setImagenVisible(pastelTexto);
    };
  
    const handleInputBlur = () => {
      
      setTextoEncima(datosPastel.texto);
      console.log(textoEncima);
      setDatosPastel(prevState => ({
        ...prevState,   // Clona el estado actual
        texto: "", // Establece el campo 'correo' con el valor del evento
      }));
      setImagenVisible(lastSelectedImage);
    };
  
    const handleDocumentClick = (event) => {
      // Comprueba si el clic ocurrió fuera del input
      if (!event.target.matches("#inscription")) {
      }
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
         console.log("hola"+ datosFormulario.nombre);
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
      setTextoRelleno("Original");
      document.addEventListener("click", handleDocumentClick);
      return () => {
        document.removeEventListener("click", handleDocumentClick);
      };
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
      }
      
      const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
      const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
      };

      const mostrarAlertaReservaFallidaPers=()=>{
        Swal.fire({
          title: "Pedidos Info",
          text: "Solo hay pasteles de hasta 12 personas.",
          icon: "info",
          button: "Aceptar"
    
        });
      };

      const mostrarAlertaReservaExitosa=()=>{
        Swal.fire({
          title: "Pedido Exitoso",
          text: "Tu Pedido se ha realizado correctamente.",
          icon: "success",
          button: "Aceptar"
    
        });
      };



      const handleQuantityChange = (value) => {
        if (value >= 1 && value <= 12) {
          setQuantity(value);
          setDatosPastel((prevData) => ({ ...prevData, quantity: value }));
        } else {
          mostrarAlertaReservaFallidaPers();
        }
      };

      const clickBotonOriginal = () => {
        cambiarImagenBoton(pastel_fresa_original);
        setTextoRelleno("Original");

      };

      const clickBotonArcoiris = () => {
        cambiarImagenBoton(pastel_fresa_arcoiris);
        setTextoRelleno("Arcoiris");

      };

      const clickBotonOreo = () => {
        cambiarImagenBoton(pastel_fresa_oreo);
        setTextoRelleno("Oreo");

      };

      const clickBotonVainilla = () => {
        cambiarImagenBoton(pastel_fresa_vainilla);
        setTextoRelleno("Vainilla");

      };


      const hacerPedidoPastel1 = async () => {  
        console.log("Fresas"); 
        console.log(datosPastel.quantity);
        console.log(textoEncima);
        console.log(textoRelleno);

        

        try{

          if(nombreUsuario==null){
            mostrarAlertaPedidoFallidaLogin();
            
          }else{

            const response = await axios.post('http://localhost:4567/frontend/hacerPedidoPastel1', {
            textoEncima: textoEncima,
            textoCantidad: datosPastel.quantity,
            textoRelleno: textoRelleno,
            textoTipo: "Pastel de Fresas",
            textoPrecio:"1000",
            idPastel: "1"
          });

          console.log(response.data);
          mostrarAlertaReservaExitosa();

          // Limpiar los estados después de hacer el pedido
          setDatosPastel({ texto: "", quantity: 1 });
          setTextoEncima("");
          setTextoCantidad("");
          setTextoRelleno("Original");
          setTextoTipo("");
          setDatosPastel({ texto: "", quantity: 1 });
          setQuantity(1);
          cambiarImagenBoton(pastel_fresa_original);


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
        await obtenerReseñasPorPastel("1"); // Obtener las reseñas nuevamente para actualizar la lista
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
                    idPastel: "1", // Asegúrate de tener el id del pastel
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
          idPastel: "1",
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
        <div className="container-img-1">
          <img className="imgPastel" src={imagenVisible} alt="Pastel"></img>
          <div className="texto-encima">{datosPastel.texto}</div>
        </div>
        <div className="container-info-product">
          <div className="container-price">
            <span>Pastel de Fresas</span>
            <i className="fa-solid fa-angle-right"></i>
          </div>

          <div className="container-details-product">
            <div className="form-group">
                <div className="OpcionesPers">
                <h2 className="textPersPastel">Personaliza tu pastel</h2>
                <div className="mb-4">
                    <p className="pastel-Type">Tipo de Relleno</p>
                    <div className="botones-pastel">
                    <button className="boton-1" onClick={() => clickBotonOriginal()}>
                      Original
                    </button>
                    <button className="boton-2" onClick={() => clickBotonArcoiris()}>
                      Arcoiris
                    </button>
                    <button className="boton-3" onClick={() => clickBotonOreo()}>
                      Oreo
                    </button>
                    <button className="boton-4" onClick={() => clickBotonVainilla()}>
                      Vainilla
                    </button>
                    </div>
                </div>


                <div className="container-cantidad-personas">
                <div className="titulo-pers">Personas </div>
                  <TextField
                    type="number"
                    placeholder="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    InputProps={{ inputProps: { min: 1 } }}
                    className="input-cantidad"
                  />
                  <div className="btn-increment-decrement">
                    <i
                      className="fa-solid fa-chevron-up"
                      id="increment"
                      onClick={handleIncrement}
                    ></i>
                    <i
                      className="fa-solid fa-chevron-down"
                      id="decrement"
                      onClick={handleDecrement}
                    ></i>
                  </div>
                </div>


                <div className="mb-6">
                    <p className="label-text-pers">Inscription (30 Character Limit)</p>
                    <input className="input-text-pers"
                    type="text"
                    id="inscription"
                    name="inscription"
                    placeholder="Enter your text"
                    maxLength="30"
                    value={datosPastel.texto}
                    onChange={handleChange}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    />
                </div>
                </div>
            </div>
          </div>

          <div className="container-add-cart">
            <button className="btn-add-to-cart" onClick={hacerPedidoPastel1}>
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laboriosam iure provident atque voluptatibus reiciendis quae
                rerum, maxime placeat enim cupiditate voluptatum, temporibus
                quis iusto. Enim eum qui delectus deleniti similique? Lorem,
                ipsum dolor sit amet consectetur adipisicing elit. Sint autem
                magni earum est dolorem saepe perferendis repellat ipsam
                laudantium cum assumenda quidem quam, vero similique? Iusto
                officiis quod blanditiis iste?, ipsum dolor sit amet consectetur 
                adipisicing elit. Sint autem magni earum est dolorem saepe 
                perferendis repellat ipsa laudantium cum assumenda quidem 
                quam, vero similique? Iustoofficiis
              </p>
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
    
    </>
  );
}

export default Pastel;