import { Products } from '@/interfaces/products.interfaces'
import { getProducts } from '@/services/dashboard'
import { RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NewProductos } from '../components/new-productos'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { deleteProductos } from '@/services/productos/delete-productos'

export const Productos = () => {
  const [products, setProducts] = useState<Products[]>([])
  const { datos } = useSelector((state: RootState) => state.auth)

  const { usuario_id } = datos;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!datos || !datos.usuario_id) {
        console.log("No recibe usuario_id");
        return;
      }

      const response = await getProducts(datos.usuario_id);
      console.log("📦 Respuesta de la API:", response); // Log para ver la respuesta

      if (response) {
        setProducts(response); // Asegúrate de acceder correctamente a la propiedad 'products'
      } else {
        console.error("No se encontraron productos en la respuesta de la API");
      }
    };

    fetchProducts();
  }, [datos?.usuario_id]);

  const handleDelete = async (producto_id: number) => { // Recibe cliente_id como argumento
    try {
      await deleteProductos({ usuario_id, producto_id }); // Usa el cliente_id recibido
      // Después de eliminar, recarga los clientes para actualizar la tabla
      const response = await getProducts(datos.usuario_id);
      if (response) {
        setProducts(response);
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
        <NewProductos usuario_id={datos.usuario_id} />
      </div>
      {products.length > 0 ? (
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
            {products.map((item) => (
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
