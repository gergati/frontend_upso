import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useAuthStore } from "@/hooks/useAuthStore"


export const RegisterForm = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [dni, setDni] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [tipo, setTipo] = useState('')
    const { startRegister } = useAuthStore()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('datos => ', { nombre, apellido, dni, email, telefono, contraseña, tipo })
        startRegister({ nombre, apellido, dni, email, telefono, contraseña, tipo })
    }

    return (
        <div className="flex w-full flex-col gap-6 font-rubik">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Crear cuenta</CardTitle>
                    <CardDescription>
                        Ingresa todos los datos. Son obligatorios.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">

                            <div className="flex gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        type="text"
                                        placeholder="Jhon"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="apellido">Apellido</Label>
                                    <Input
                                        id="apellido"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        type="text"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="dni">Dni</Label>
                                    <Input
                                        id="dni"
                                        value={dni}
                                        onChange={(e) => setDni(e.target.value)}
                                        type="text"
                                        placeholder="11.111.111"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="telefono">Teléfono</Label>
                                    <Input
                                        id="telefono"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        type="tel"
                                        placeholder="2915136864"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electronico</Label>
                                <Input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="johndoe@correo.com"
                                    required
                                />
                            </div>
                            <div className="w-full flex gap-2 flex-col">
                                <Label htmlFor="phone">Tipo de categoria</Label>
                                <Select onValueChange={setTipo}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona una categoria" />
                                    </SelectTrigger>
                                    <SelectContent className="font-rubik">
                                        <SelectGroup>
                                            <SelectLabel>Categorias</SelectLabel>
                                            <SelectItem value="A">A</SelectItem>
                                            <SelectItem value="B">B</SelectItem>
                                            <SelectItem value="C">C</SelectItem>
                                            <SelectItem value="E">E</SelectItem>
                                            <SelectItem value="T">T</SelectItem>
                                            <SelectItem value="Responsable Inscripto">Responsable Inscripto</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="contraseña">Contraseña</Label>
                                </div>
                                <Input
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    id="contraseña" type="password"
                                    required placeholder="**********"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Crear cuenta
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Ya tienes cuenta?{" "}
                            <Link to="/login" className="underline underline-offset-4">
                                Iniciar sesión
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
