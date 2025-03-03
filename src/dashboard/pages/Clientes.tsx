import { useEffect, useState } from "react"
import { DeleteIcon } from "../components/icons/DeleteIcon"
import { useDashboardStore } from "@/hooks/useDashboardStore"
import { NewClientes } from "../components/new-clientes"
import { UpdatedClientes } from "../components/updated-clientes"
import { EditIcon } from "../components/icons/EditIcon"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const Clientes = () => {
  const { clientes, mostrarClientes, eliminarClientePorId } = useDashboardStore()
  const [clienteAEditar, setClienteAEditar] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    mostrarClientes()
  }, [])

  const handleDelete = async (cliente_id: string) => {
    await eliminarClientePorId({ cliente_id })
  }

  const handleEditar = (cliente: any) => {
    setClienteAEditar(cliente);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setClienteAEditar(null);
  };



  return (
    <div className="overflow-x-auto font-rubik">
      <div>
        <NewClientes />
      </div>
      {clientes.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
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
                <td className="px-6 py-4 text-sm text-gray-800">{item.apellido} {item.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.dni}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.fechaNac}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.telefono}</td>
                <td className="px-4 py-4 ">
                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          type="submit"
                          className="hover:cursor-pointer"
                        // onClick={() => handleDelete(item.cliente_id)}
                        >
                          <DeleteIcon />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
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
                            onClick={() => handleDelete(item.cliente_id)}
                          >Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    {/* <button
                      className="hover:cursor-pointer"
                      onClick={() => handleDelete(item.cliente_id)}>
                      <DeleteIcon />
                    </button> */}
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
      {clienteAEditar && (
        <UpdatedClientes
          clientes={clienteAEditar}
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
        />
      )}
    </div>
  )
}
