import { Button } from "@mui/base"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"

function PopupLoginInvalido ({nombre}){
    const[open,setOpen] = useState(true);

    const eventoAbrir = () => {
        setOpen(true)
    }

    const eventoCerrar = () => {
        setOpen(false)
    }
    return(
        <>
  
        <div>
            <Dialog open={open} onClose={eventoCerrar}>
            <DialogTitle>Error al Iniciar Sesion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Correo o contraseña incorrecta.
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

export default PopupLoginInvalido