import { Button } from "@mui/base"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function PopupLoginValido ({nombre}){
    const navigate = useNavigate();
    const[open,setOpen] = useState(true);

    const redirectToHome = () => {
        // Redirige a la página del hotel cuando se hace clic en el botón
        navigate("/");
      };

    const eventoAbrir = () => {
        setOpen(true)
    }

    const eventoCerrar = () => {
        setOpen(false)
        redirectToHome();
    }
    return(
        <>
  
        <div>
            <Dialog open={open} onClose={eventoCerrar}>
            <DialogTitle>Inicio de Sesion Exitoso</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Bienvenido: {nombre}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className="cerrar" onClick={eventoCerrar}>Cerrar</Button>
            </DialogActions>
            </Dialog>
        </div>
        </>
    )
}

export default PopupLoginValido