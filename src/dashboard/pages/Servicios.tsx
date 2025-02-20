import { getServicios } from "@/services/servicios/get-servicios"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const Servicios = () => {
  const { datos } = useSelector((state: RootState) => state.auth)
  const [servicios, setServicios] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      if (!datos || !datos.usuario_id) {
        console.log("No recibe usuario_id");
        return;
      }

      const response = await getServicios(datos.usuario_id);
      console.log("📦 Respuesta de la API:", response); // Log para ver la respuesta

      if (response) {
        setServicios(response); // Asegúrate de acceder correctamente a la propiedad 'products'
      } else {
        console.error("No se encontraron servicios en la respuesta de la API");
      }
    };

    fetchProducts();
  }, [datos])


  return (
    <div className="overflow-x-auto font-rubik">
      {servicios.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="px-6 py-3 text-sm font-medium">Nro servicio</th>
              <th className="px-6 py-3 text-sm font-medium">Servicio realizado</th>
              <th className="px-6 py-3 text-sm font-medium">Fecha</th>
              <th className="px-6 py-3 text-sm font-medium">Hora</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((item) => (
              <tr key={`${item['id del servicio']}-${item.usuario_id}`} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-800">{item['id del servicio']}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item['servicio realizado']}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{item.fecha}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.hora}</td>
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
