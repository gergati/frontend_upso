import { useEffect, useState } from 'react'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { useDashboardStore } from '@/hooks/useDashboardStore'
import { NewProductos } from '../components/new-productos'
import {
  AlertDialog, AlertDialogAction,
  AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { EditIcon } from '../components/icons/EditIcon'
import { UpdatedProductos } from '../components/updated-productos'

export const Productos = () => {
  const { mostrarProductos, productos } = useDashboardStore()
  const [productoAEditar, setProductoAEditar] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    mostrarProductos()
  }, []);

  const handleDelete = async (producto_id: number) => {
    return producto_id
  }

  const handleEditar = (producto: any) => {
    setProductoAEditar(producto)
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setProductoAEditar(null)
  }



  return (
    <div className="overflow-x-auto font-rubik">
      <div>
        <NewProductos />
      </div>
      {productos.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="px-6 py-3 text-sm font-medium">Producto</th>
              <th className="px-6 py-3 text-sm font-medium">Descripción</th>
              <th className="px-6 py-3 text-sm font-medium">Marca</th>
              <th className="px-6 py-3 text-sm font-medium">Precio</th>
              <th className="px-6 py-3 text-sm font-medium">Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((item) => (
              <tr key={`${item.producto_id}-${item.descripcion}`} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-800">{item.nombreProd}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.descripcion}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.marca}</td>
                <td className="px-6 py-4 text-sm text-gray-600">${item.precio}</td>
                <td className="px-9 py-4 ">
                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          type="submit"
                          className="hover:cursor-pointer"
                        >
                          <DeleteIcon />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="font-rubik">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción es irrevocable.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            className="hover:cursor-pointer bg-red-500 hover:bg-red-700"
                            onClick={() => handleDelete(item.producto_id)}
                          >Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <button
                      onClick={() => handleEditar(item)}
                      className="hover:cursor-pointer"
                    >
                      <EditIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
      {productoAEditar && (
        <UpdatedProductos
          productos={productoAEditar}
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
        />
      )}
    </div>

  )
}
