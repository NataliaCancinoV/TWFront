import { Button } from "@mui/base"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"

function PopupRegistro (){
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
                <DialogTitle>Registro Exitoso</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Cuenta Registrada con exito
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

export default PopupRegistro