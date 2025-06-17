import { useEffect, useState } from "react";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EditIcon } from "../components/icons/EditIcon";
import { useDashboardStore } from "@/hooks/useDashboardStore";
import { NewProductos } from "../components/new-productos";
import { UpdatedProductos } from "../components/updated-productos";
import { NewFactura } from "../components/new-factura";
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
} from "@/components/ui/alert-dialog";

export const Productos = () => {
  const { productos, mostrarProductos, eliminarProductoPorId } = useDashboardStore();
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    mostrarProductos();
  }, []);

  const handleDelete = async (producto_id: number) => {
    await eliminarProductoPorId({ producto_id: producto_id.toString() });
  };

  const handleEditar = (producto: any) => {
    setProductoAEditar(producto);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setProductoAEditar(null);
  };

  return (
    <div className="font-rubik">
      <div className="flex flex-wrap md:gap-4 items-center mb-4">
        <NewProductos />
        <NewFactura />
      </div>

      <div className="md:hidden space-y-4">
        {productos.map((item) => (
          <div
            key={`${item.producto_id}-${item.descripcion}`}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <p><strong>Producto:</strong> {item.nombreProd}</p>
            <p><strong>Descripción:</strong> {item.descripcion}</p>
            <p><strong>Marca:</strong> {item.marca}</p>
            <p><strong>Precio:</strong> ${item.precio}</p>
            <div className="flex gap-2 mt-3">
              {/* Eliminar */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button type="button" className="hover:cursor-pointer">
                    <DeleteIcon />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="font-rubik">
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción es irrevocable.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className="hover:cursor-pointer bg-red-500 hover:bg-red-700"
                      onClick={() => handleDelete(item.producto_id)}
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Editar */}
              <button
                onClick={() => handleEditar(item)}
                className="hover:cursor-pointer"
              >
                <EditIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto mt-6">
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
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* Eliminar */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button type="submit" className="hover:cursor-pointer">
                            <DeleteIcon />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="font-rubik">
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción es irrevocable.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="hover:cursor-pointer bg-red-500 hover:bg-red-700"
                              onClick={() => handleDelete(item.producto_id)}
                            >
                              Eliminar
                            </AlertDialogAction>
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
          <p className="text-center text-gray-600">No hay productos disponibles.</p>
        )}
      </div>

      {productoAEditar && (
        <UpdatedProductos
          productos={productoAEditar}
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
};
