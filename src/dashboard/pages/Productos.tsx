import { useEffect } from 'react'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { useDashboardStore } from '@/hooks/useDashboardStore'
import { NewProductos } from '../components/new-productos'

export const Productos = () => {


  const { mostrarProductos, productos } = useDashboardStore()

  useEffect(() => {
    mostrarProductos()
  }, []);

  const handleDelete = async (producto_id: number) => {
    return producto_id
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
                <td className="px-9 py-4 "><button className="hover:cursor-pointer" type="submit" onClick={() => handleDelete(item.producto_id)}><DeleteIcon /></button>  </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>

  )
}
