import { Button } from "@mui/base"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"

function Popup (){
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
            <DialogTitle>Registro Fallido</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Porfavor introduzca los datos correspondientes.
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

export default Popup