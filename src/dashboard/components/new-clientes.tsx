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
import { useDashboardStore } from "@/hooks/useDashboardStore"
import { RootState } from "@/store/store"
import { useState } from "react"
import { useSelector } from "react-redux"

export const NewClientes = () => {

    const { datos } = useSelector((state: RootState) => state.auth)
    const { usuario_id } = datos;
    const { agregarNuevoCliente } = useDashboardStore()


    const contraseña = ''
    const [apellido, setApellido] = useState('')
    const [nombre, setNombre] = useState('')
    const [dni, setDni] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [fechaNac, setFechaNac] = useState('')
    const [isLoading, setIsLoading] = useState(false); 
    const [open, setOpen] = useState(false);


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true);
        try {

            await agregarNuevoCliente({ usuario_id, contraseña, apellido, dni, email, fechaNac, nombre, telefono })

            setTimeout(() => {
                setApellido('');
                setNombre('');
                setDni('');
                setTelefono('');
                setEmail('');
                setFechaNac('');

                setOpen(false);
                setIsLoading(false);
            }, 2000);

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
                <Button className="hover:cursor-pointer">Agregar cliente</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="font-rubik w-[90%] m-auto rounded-lg">
                <DialogHeader>
                    <DialogTitle>Agregar cliente nuevo</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="apellido">Apellido</Label>
                                <Input
                                    id="apellido"
                                    type="text"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="John"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="dni">Dni</Label>
                                <Input
                                    id="dni"
                                    type="number"
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    placeholder="12345678"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="fechaNac">Fecha nacimiento</Label>
                                <Input
                                    id="fechaNac"
                                    type="text"
                                    value={fechaNac}
                                    onChange={(e) => setFechaNac(e.target.value)}
                                    placeholder="2025-02-20"
                                    required
                                />
                            </div>

                        </div>
                        <div className="flex gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electronico</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="johndoe@correo.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="telefono">Telefono</Label>
                                <Input
                                    id="telefono"
                                    type="text"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    placeholder="2911234567"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading ? "Cargando cliente..." : "Cargar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
