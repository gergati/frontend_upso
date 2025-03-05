import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDashboardStore } from "@/hooks/useDashboardStore"
import { modificarProductos } from "@/store/dashboard/dashboardSlice"
import { useEffect, useState } from "react"



export const UpdatedProductos = ({ isOpen, onClose, productos }: any) => {

  const { agregarNuevoProducto, mostrarProductos } = useDashboardStore()

  const [nombreProd, setNombreProd] = useState('')
  const [marca, setMarca] = useState('')
  const [precio, setPrecio] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (productos) {
      setNombreProd(productos.nombreProd)
      setMarca(productos.marca)
      setPrecio(productos.precio)
      setCantidad(productos.cantidad)
      setDescripcion(productos.descripcion)
    }
  }, [productos])


  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    try {

      const updatedProduct = {
        ...productos,
        nombreProd,
        marca,
        precio,
        cantidad,
        descripcion
      }

      await agregarNuevoProducto(updatedProduct)

      modificarProductos(updatedProduct)
      mostrarProductos()

    } catch (error) {
      console.error('Error al agregar producto: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="font-rubik"
        onClick={() => setOpen(!open)}
      >
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>

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
