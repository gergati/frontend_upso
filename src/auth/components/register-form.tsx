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


export const RegisterForm = () => {
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
                    <form>
                        <div className="flex flex-col gap-6">

                            <div className="flex gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">Nombre</Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="Jhon"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lasltName">Apellido</Label>
                                    <Input
                                        id="lastName"
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
                                        type="number"
                                        placeholder="11.111.111"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input
                                        id="phone"
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
                                    type="email"
                                    placeholder="johndoe@correo.com"
                                    required
                                />
                            </div>
                            <div className="w-full flex gap-2 flex-col">
                                <Label htmlFor="phone">Tipo de categoria</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona una categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                    <Label htmlFor="password">Contraseña</Label>
                                </div>
                                <Input id="password" type="password" required placeholder="**********" />
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
