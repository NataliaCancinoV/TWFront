import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import AppInicio from './AppInicio.jsx'
import AdminVista from './AdminPackages/AdminVista.jsx'
import PersPastel1 from './PersPastel1.jsx'
import Pedidos from './Pedidos.jsx'
import Pasteles from './Pasteles.jsx'
import LoginForm from './Sesion/LoginForm.jsx';
import RegistrarForm from './Sesion/Registrar.jsx';
import RecuperarContraForm from './Sesion/RecuperarContraForm.jsx';
import ChocolateBlanco from './Pasteles/ChocolateBlanco.jsx';
import PastelMoka from './Pasteles/PastelMoka.jsx';
import PastelChocolate from './Pasteles/PastelChocolate.jsx';
import PastelZanahoria from './Pasteles/PastelZanahoria.jsx';
import PastelFrambuesa from './Pasteles/PastelFrambuesa.jsx';
import PastelCajeta from './Pasteles/PastelCajeta.jsx';
import Chat from './Chat.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element = {<AppInicio/>}/>
        <Route path = "/PersonalizarPastel/PastelArcoiris" element = {<PersPastel1/>}/>
        <Route path = "/Pedidos" element = {<Pedidos/>}/>
        <Route path = "/Pasteles" element = {<Pasteles/>}/>
        <Route path = "/Login" element = {<LoginForm/>}/>
        <Route path = "/Registro" element = {<RegistrarForm/>}/>
        <Route path = "/RecuperarContraseña" element = {<RecuperarContraForm/>}/>
        <Route path = "/Pasteles/ChocolateBlanco" element = {<ChocolateBlanco/>}/>
        <Route path = "/Pasteles/PastelMoka" element = {<PastelMoka/>}/>
        <Route path = "/Pasteles/PastelChocolate" element = {<PastelChocolate/>}/>
        <Route path = "/Pasteles/PastelZanahoria" element = {<PastelZanahoria/>}/>
        <Route path = "/Pasteles/PastelFrambuesa" element = {<PastelFrambuesa/>}/>
        <Route path = "/Pasteles/PastelCajeta" element = {<PastelCajeta/>}/>
        <Route path = "/AdminVista" element = {<AdminVista/>}/>
        <Route path = "/Chat" element = {<Chat />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);








