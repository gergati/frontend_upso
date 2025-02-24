import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { newServicios } from "@/services/dashboard/servicios/new-servicios";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";


export const NewServicios = () => {
    const [nombreServicio, setNombreServicio] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { datos } = useSelector((state: RootState) => state.auth)
    const { usuario_id } = datos;
    const ahora = new Date();

    // Obtener la fecha en formato YYYY-MM-DD
    const fecha = ahora.toISOString().split('T')[0];

    // Obtener la hora en formato HH:MM:SS
    const hora = ahora.toTimeString().split(' ')[0];


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await newServicios({ usuario_id, fecha, hora, nombreServicio })

            setNombreServicio('')
            setIsLoading(false)
        } catch (error) {
            console.error("Error al agregar producto:", error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog>
            <Button
                onClick={() => setOpen(!open)}
                className="hover:cursor-pointer my-3"
            >
                <DialogTrigger
                    className="hover:cursor-pointer">Agregar servicio</DialogTrigger>
            </Button>
            <DialogContent className="font-rubik">
                <DialogHeader>
                    <DialogTitle>Agregar servicio nuevo</DialogTitle>

                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="descripcion">Descripcion</Label>
                            <Textarea
                                id="descripcion"
                                value={nombreServicio}
                                onChange={(e) => setNombreServicio(e.target.value)}
                                placeholder="Agregar descripción del servicio"
                                required
                            />
                        </div>
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading ? "Cargando producto..." : "Cargar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
