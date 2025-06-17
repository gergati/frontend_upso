import { useEffect, useState } from "react"
import { RootState } from "@/store/store"
import { getServicios } from "@/services/dashboard/servicios/get-servicios"
import { useSelector } from "react-redux"
import { NewServicios } from "../components/new-servicios"
import { DeleteIcon } from "../components/icons/DeleteIcon"
import { deletefacturaServicios } from "@/services/dashboard/servicios/delete-servicios"
import { useDashboardStore } from "@/hooks/useDashboardStore"
import Invoice from "../components/invoces"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { FaFilePdf } from "react-icons/fa"



export const Servicios = () => {
  const { mostrarClientes } = useDashboardStore();
  const { datos } = useSelector((state: RootState) => state.auth)
  const { usuario_id } = datos;
  const [servicios, setServicios] = useState<any[]>([])
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      if (!datos || !datos.usuario_id) {
        console.error("No recibe usuario_id");
        return;
      }

      await mostrarClientes();
      const response = await getServicios(datos.usuario_id);

      if (response) {
        setServicios(response);
      } else {
        console.error("No se encontraron servicios en la respuesta de la API");
      }
    };

    fetchServicios();
  }, [datos])



  const cargarServicios = async () => {
    if (!usuario_id) return;
    const response = await getServicios(usuario_id);
    if (response) {
      setServicios(response);
    }
  };

  const handleDelete = async (servicio_id: string) => {
    try {
      await deletefacturaServicios({ usuario_id, servicio_id })

      const response = await getServicios(usuario_id)
      if (response) {
        setServicios(response)
      } else {
        console.error("No se encontraron clientes en la respuesta de la API");
      }
    } catch (error) {
      console.error('Error al eliminar servicio => ', error);
    }
  }

  const handleShowInvoice = (cliente: any) => {
    setSelectedCliente(cliente);
    setIsInvoiceDialogOpen(true);
  };

  const handleInvoiceDialogClose = () => {
    setIsInvoiceDialogOpen(false);
    setSelectedCliente(null);
  };


  return (
    <div className="overflow-x-auto font-rubik">
      <div className="flex gap-4 items-center">
        <NewServicios onServicioCreado={cargarServicios} />
      </div>
      {servicios.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="px-6 py-3 text-sm font-medium">Servicio realizado</th>
              <th className="px-6 py-3 text-sm font-medium">Cliente</th>
              <th className="px-6 py-3 text-sm font-medium">Fecha</th>
              <th className="px-6 py-3 text-sm font-medium">Hora</th>
              <th className="px-6 py-3 text-sm font-medium">Acción</th>
              <th className="px-6 py-3 text-sm font-medium">Factura</th>
            </tr>
          </thead>
          <tbody>

            {servicios.map((item) => (
              <tr key={`${item['id del servicio']}-${item.usuario_id}`} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-800">{item['servicio realizado']}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.cliente.nombre} {item.cliente.apellido}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.fecha}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.hora}</td>
                <td className="px-9 py-4 ">
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
                          onClick={() => handleDelete(item['id del servicio'])}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
                <td className="px-6 py-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        type="button"
                        className="hover:cursor-pointer px-6 py-4  text-blue-600 hover:text-blue-800"
                        onClick={() => handleShowInvoice(item)}
                      >
                        <FaFilePdf size={20} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent aria-describedby={undefined} className="font-rubik">
                      <AlertDialogHeader className="flex gap-2 justify-between flex-row">
                        <AlertDialogTitle>Factura</AlertDialogTitle>
                        <AlertDialogCancel onClick={handleInvoiceDialogClose}>
                          Cerrar
                        </AlertDialogCancel>
                      </AlertDialogHeader>
                      <Invoice
                        clientName={`${item.cliente.nombre} ${item.cliente.apellido}`}
                        clientAddress={item.cliente.email}
                        precio={item.precio}
                        description={item['servicio realizado']}
                        nombreProd={item.cliente_id}
                        key={item.cliente_id}
                      />
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay servicios disponibles.</p>
      )}
    </div>
  )
}
