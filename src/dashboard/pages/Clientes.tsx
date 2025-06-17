import { useEffect, useState } from "react";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EditIcon } from "../components/icons/EditIcon";
import { FaFilePdf } from "react-icons/fa"; // Ícono de PDF
import { useDashboardStore } from "@/hooks/useDashboardStore";
import { NewClientes } from "../components/new-clientes";
import { UpdatedClientes } from "../components/updated-clientes";
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
import Invoice from "../components/invoces";

export const Clientes = () => {
  const { clientes, mostrarClientes, eliminarClientePorId } = useDashboardStore();
  const [clienteAEditar, setClienteAEditar] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    mostrarClientes();
  }, []);

  const handleDelete = async (cliente_id: string) => {
    await eliminarClientePorId({ cliente_id });
  };

  const handleEditar = (cliente: any) => {
    setClienteAEditar(cliente);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    setClienteAEditar(null);
  };

  const handleShowInvoice = (cliente: any) => {
    setSelectedCliente(cliente);
    setIsInvoiceDialogOpen(true);
  };

  const handleInvoiceDialogClose = () => {
    setIsInvoiceDialogOpen(false);
    setSelectedCliente(null);
  };

  return (
    <div className="font-rubik">
      <div>
        <NewClientes />
      </div>

      {/* Vista para dispositivos móviles */}
      <div className="md:hidden space-y-4 mt-4">
        {clientes.map((item) => (
          <div
            key={`${item.cliente_id}-${item.fechaNac}`}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <p><strong>Nombre:</strong> {item.apellido} {item.nombre}</p>
            <p><strong>DNI:</strong> {item.dni}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Fecha Nac.:</strong> {item.fechaNac}</p>
            <p><strong>Teléfono:</strong> {item.telefono}</p>
            <div className="flex gap-2 mt-3">
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
                      onClick={() => handleDelete(item.cliente_id)}
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

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="hover:cursor-pointer text-blue-600 hover:text-blue-800"
                    onClick={() => handleShowInvoice(item)}
                  >
                    <FaFilePdf size={20} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent aria-describedby={undefined} className="font-rubik">
                  <Invoice
                    clientName={`${item.nombre} ${item.apellido}`}
                    clientAddress={item.email}
                    description={item.telefono}
                    nombreProd={item.cliente_id}
                    key={item.cliente_id}
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleInvoiceDialogClose}>
                      Cerrar
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto mt-6">
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
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditar(item)}
                        className="hover:cursor-pointer"
                      >
                        <EditIcon />
                      </button>
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
                              onClick={() => handleDelete(item.cliente_id)}
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

      {clienteAEditar && (
        <UpdatedClientes
          clientes={clienteAEditar}
          isOpen={isEditDialogOpen}
          onClose={handleEditDialogClose}
        />
      )}
    </div>

  );
};