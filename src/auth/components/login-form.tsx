import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/hooks/useAuthStore"
import { useState } from "react"
import { Link } from "react-router"

export const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { startLogin } = useAuthStore()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    startLogin(username, password)
  }

  return (
    <div className="flex flex-col gap-6 font-rubik">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-rubik font-semibold">Bienvenido</CardTitle>
          <CardDescription className="font-rubik">
            Ingresa tus credenciales para entrar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required placeholder="**********" />
              </div>
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              No tienes cuenta?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Registrarse
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
