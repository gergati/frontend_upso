import { getClientes } from "@/services/dashboard/clientes/get-cliente"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NewClientes } from "../components/new-clientes"
import { DeleteIcon } from "../components/icons/DeleteIcon"
import { deleteClientes } from "@/services/dashboard/clientes/delete-clientes"

export const Clientes = () => {
  const [clientes, setClientes] = useState<any[]>([])
  const { datos } = useSelector((state: RootState) => state.auth)

  const { usuario_id } = datos;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!datos || !datos.usuario_id) {
        console.log("No recibe usuario_id");
        return;
      }

      const response = await getClientes(usuario_id);
      console.log("📦 Respuesta de la API:", response); // Log para ver la respuesta

      if (response) {
        setClientes(response); // Asegúrate de acceder correctamente a la propiedad 'products'
      } else {
        console.error("No se encontraron productos en la respuesta de la API");
      }
    };

    fetchProducts();
  }, [datos?.usuario_id]);

  const handleDelete = async (cliente_id: string) => { 
    try {
      await deleteClientes({ usuario_id, cliente_id }); // Usa el cliente_id recibido
      // Después de eliminar, recarga los clientes para actualizar la tabla
      const response = await getClientes(datos.usuario_id);
      if (response) {
        setClientes(response);
      } else {
        console.error("No se encontraron clientes en la respuesta de la API");
      }

    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  }


  return (
    <div className="overflow-x-auto font-rubik">
      <div>
        <NewClientes usuario_id={datos.usuario_id} />
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
                <td className="px-9 py-4 "><button className="hover:cursor-pointer" type="submit" onClick={() => handleDelete(item.cliente_id)}><DeleteIcon /></button>  </td>
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
