import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { newServicios } from "@/services/dashboard/servicios/new-servicios";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";


export const NewServicios = ({ onServicioCreado }: { onServicioCreado: () => void }) => {
    const { datos } = useSelector((state: RootState) => state.auth)
    const data = useSelector((state: RootState) => state.dashboard.clientes)
    const [open, setOpen] = useState(false)
    const [nombreServicio, setNombreServicio] = useState('')
    const [clienteId, setClienteId] = useState('');
    const [clienteNombreCompleto, setClienteNombreCompleto] = useState('');
    const [precio, setPrecio] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { usuario_id } = datos;
    const ahora = new Date();

    const fecha = ahora.toISOString().split('T')[0];

    const hora = ahora.toTimeString().split(' ')[0];


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const ok = await newServicios({ usuario_id, cliente_id: clienteId, fecha, hora, nombreServicio, precio })

            if (ok) {
                toast.success('Servicio guardado correctamente')
                setClienteNombreCompleto('')
                setPrecio('')
                setNombreServicio('')
                setOpen(false)
                onServicioCreado();
            }
            setIsLoading(false)
        } catch (error) {
            console.error("Error al agregar producto:", error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="hover:cursor-pointer my-3">Agregar servicio</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="font-rubik w-[90%] m-auto">
                <DialogHeader>
                    <DialogTitle>Agregar servicio nuevo</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <Select
                            value={clienteId}
                            onValueChange={(value) => {
                                setClienteId(value);
                                const cliente = data.find((item) => item.cliente_id === value);
                                if (cliente) {
                                    setClienteNombreCompleto(`${cliente.nombre} ${cliente.apellido}`);
                                }
                            }}
                        >
                            <span>Seleccionar un cliente</span>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar un cliente">
                                    {clienteNombreCompleto || "Seleccionar un cliente"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="font-rubik">
                                <SelectGroup>
                                    {data.map((item) => (
                                        <SelectItem key={item.cliente_id} value={item.cliente_id}>
                                            {item.nombre} {item.apellido}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading ? "Cargando servicio..." : "Cargar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
