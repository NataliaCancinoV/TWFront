import { Button } from "@mui/base"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function PopupActualizar ({nombre}){
    const navigate = useNavigate();
    const[open,setOpen] = useState(true);

    const redirectToLogin = () => {
        // Redirige a la página del hotel cuando se hace clic en el botón
        navigate("/Login");
      };

    const eventoAbrir = () => {
        setOpen(true)
    }

    const eventoCerrar = () => {
        setOpen(false)
        redirectToLogin();
    }
    
    return(
        <>
        <div>
            <Dialog open={open} onClose={eventoCerrar}>
            <DialogTitle>Actualizacion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Credenciales actualizadas correctamenete
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

export default PopupActualizar