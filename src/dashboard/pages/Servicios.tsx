import { getServicios } from "@/services/dashboard/servicios/get-servicios"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NewServicios } from "../components/new-servicios"
import { DeleteIcon } from "../components/icons/DeleteIcon"
import { deletefacturaServicios } from "@/services/dashboard/servicios/delete-servicios"

export const Servicios = () => {
  const { datos } = useSelector((state: RootState) => state.auth)
  const { usuario_id } = datos;
  const [servicios, setServicios] = useState<any[]>([])


  useEffect(() => {
    const fetchProducts = async () => {
      if (!datos || !datos.usuario_id) {
        console.error("No recibe usuario_id");
        return;
      }

      const response = await getServicios(datos.usuario_id);

      if (response) {
        setServicios(response);
      } else {
        console.error("No se encontraron servicios en la respuesta de la API");
      }
    };

    fetchProducts();
  }, [datos])

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


  return (
    <div className="overflow-x-auto font-rubik">
      <div>
        <NewServicios />
      </div>
      {servicios.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="px-6 py-3 text-sm font-medium">Servicio realizado</th>
              <th className="px-6 py-3 text-sm font-medium">Fecha</th>
              <th className="px-6 py-3 text-sm font-medium">Hora</th>
              <th className="px-6 py-3 text-sm font-medium">Acción</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((item) => (
              <tr key={`${item['id del servicio']}-${item.usuario_id}`} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-800">{item['servicio realizado']}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.fecha}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.hora}</td>
                <td className="px-9 py-4 "><button className="hover:cursor-pointer" type="submit" onClick={() => handleDelete(item['id del servicio'])}><DeleteIcon /></button>  </td>
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
