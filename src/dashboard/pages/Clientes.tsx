import { useEffect } from "react"
import { DeleteIcon } from "../components/icons/DeleteIcon"
import { EditIcon } from "../components/icons/EditIcon"
import { useDashboardStore } from "@/hooks/useDashboardStore"
import { NewClientes } from "../components/new-clientes"

export const Clientes = () => {
  const { clientes, mostrarClientes } = useDashboardStore()
 
  useEffect(() => {
    mostrarClientes()
  }, [])

  const handleDelete = async (cliente_id: string) => {
    return cliente_id
  }


  return (
    <div className="overflow-x-auto font-rubik">
      <div>
        <NewClientes />
      </div>
      {clientes.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="px-6 py-3 text-sm font-medium">Nro cliente</th>
              <th className="px-6 py-3 text-sm font-medium">Nombre completo</th>
              <th className="px-6 py-3 text-sm font-medium">Nro. documento</th>
              <th className="px-6 py-3 text-sm font-medium">Correo elect.</th>
              <th className="px-6 py-3 text-sm font-medium">Fecha Nac.</th>
              <th className="px-6 py-3 text-sm font-medium">Telefono</th>
              <th className="px-6 py-3 text-sm font-medium">Acción</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((item) => (
              <tr key={`${item.cliente_id}-${item.fechaNac}`} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-800">{item.cliente_id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.apellido} {item.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.dni}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.fechaNac}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.telefono}</td>
                <td className="px-4 py-4 ">
                  <div className="flex gap-2">
                    <button className="hover:cursor-pointer" type="submit" onClick={() => handleDelete(item.cliente_id)}><DeleteIcon /></button>
                    <button
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
        <p>No hay productos disponibles.</p> // Mensaje cuando no hay productos
      )}
    </div>
  )
}
