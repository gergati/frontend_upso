import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDashboardStore } from "@/hooks/useDashboardStore"
import { RootState } from "@/store/store"
import { useState } from "react"
import { useSelector } from "react-redux"


export const NewProductos = () => {

    const { agregarNuevoProducto } = useDashboardStore()
    const { datos } = useSelector((state: RootState) => state.auth)
    const { usuario_id } = datos;

    const [nombreProd, setNombreProd] = useState('')
    const [marca, setMarca] = useState('')
    const [precio, setPrecio] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true);
        try {
            await agregarNuevoProducto({ usuario_id, cantidad, precio, marca, descripcion, nombreProd })

            setNombreProd('');
            setMarca('');
            setPrecio('');
            setCantidad('');
            setDescripcion('');

            setOpen(false);

        } catch (error) {
            console.error("Error al agregar producto:", error);
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <Dialog>
            <DialogTrigger
                asChild
                onClick={() => setOpen(!open)}
                className="hover:cursor-pointer my-3"
            >
                <Button className="hover:cursor-pointer">Agregar producto</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="font-rubik w-[90%] m-auto">
                <DialogHeader>
                    <DialogTitle>Agregar producto nuevo</DialogTitle>

                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                type="text"
                                value={nombreProd}
                                onChange={(e) => setNombreProd(e.target.value)}
                                placeholder="Televisor - Air fryer"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="marca">Marca</Label>
                            <Input
                                id="marca"
                                type="text"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                                placeholder="Drean - Lg - Samsung"
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="precio">Precio</Label>
                                <Input
                                    id="precio"
                                    type="number"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cantidad">Cantidad</Label>
                                <Input
                                    id="cantidad"
                                    type="number"
                                    value={cantidad}
                                    onChange={(e) => setCantidad(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="descripcion">Descripcion</Label>
                            <Textarea
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Agregar caracteristicas del producto"
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
