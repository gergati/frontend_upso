import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashboardStore } from "@/hooks/useDashboardStore";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const NewFactura = () => {
  const data = useSelector((state: RootState) => state.dashboard.clientes);
  const { productos } = useDashboardStore();
  const [open, setOpen] = useState(false);
  const [nombreServicio, setNombreServicio] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [clienteNombreCompleto, setClienteNombreCompleto] = useState("");
  const [precio, setPrecio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clienteSeleccionado = data.find(
    (item) => String(item.cliente_id) === String(clienteId)
  );
  const productoSeleccionado = productos.find(
    (item) => `${item.producto_id}` === productoId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteSeleccionado || !productoSeleccionado) return;
    setIsLoading(true);

    const htmlElement = document.createElement("div");
    htmlElement.style.padding = "2rem";
    htmlElement.style.backgroundColor = "#ffffff";
    htmlElement.style.fontFamily = "sans-serif";
    htmlElement.style.width = "800px";
    htmlElement.innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-bottom:2rem;">
        <div>
          <h1 style="font-size:40px;color:#1f2937;">NicoAdmin.</h1>
          <p style="font-size:14px;color:#4b5563;">Factura electrónica</p>
        </div>
        <div style="text-align:right;font-size:14px;color:#4b5563;">
          Cuyo 529<br />Bahía Blanca, 8000
        </div>
      </div>

      <div style="margin-bottom:2rem;font-size:14px;">
        <h3 style="font-weight:600;">Cliente:</h3>
        <p style="color:#374151;">
          ${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido}<br />
          DNI: ${clienteSeleccionado.dni}<br />
          Fecha de nacimiento: ${clienteSeleccionado.fechaNac || "-"}<br />
          Tel: ${clienteSeleccionado.telefono || "-"}<br />
          Email: ${clienteSeleccionado.email || "-"}
        </p>
      </div>

      <table style="width:100%;margin-bottom:1rem;border-collapse:collapse;">
        <thead>
          <tr style="background-color:#f3f4f6;">
            <th style="border:1px solid #d1d5db;padding:8px;text-align:left;">Marca</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:left;">Descripción</th>
            <th style="border:1px solid #d1d5db;padding:8px;text-align:right;">Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td style="border:1px solid #d1d5db;padding:8px;">
              ${productoSeleccionado.marca}
            </td>
            <td style="border:1px solid #d1d5db;padding:8px;">
              ${productoSeleccionado.descripcion}
            </td>
            <td style="border:1px solid #d1d5db;padding:8px;text-align:right;">
              $${productoSeleccionado.precio}
            </td>
          </tr>
        </tbody>
      </table>
    `;

    document.body.appendChild(htmlElement);

    const canvas = await html2canvas(htmlElement, { scale: 2 });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${clienteSeleccionado.nombre}_${productoSeleccionado.nombreProd}_factura.pdf`);

    document.body.removeChild(htmlElement);
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer my-3">Nueva factura</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="font-rubik w-[90%] m-auto"
      >
        <DialogHeader>
          <DialogTitle>Datos para nueva factura</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <span className="text-sm">Seleccionar un cliente</span>
            <Select
              value={clienteId}
              onValueChange={(value) => {
                setClienteId(value);
                const cliente = data.find((item) => item.cliente_id === value);
                if (cliente) {
                  setClienteNombreCompleto(
                    `${cliente.nombre} ${cliente.apellido}`
                  );
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar un nombre">
                  {clienteNombreCompleto || "Seleccionar un nombre"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="font-rubik">
                <SelectGroup>
                  {data.map((item) => (
                    <SelectItem key={item.cliente_id} value={item.cliente_id}>
                      {item.nombre} {item.apellido}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {clienteSeleccionado && (
              <div className="mt-4 p-3 border rounded-md bg-muted text-sm space-y-1 w-[320px]">
                <p>
                  <strong>Nombre:</strong> {clienteSeleccionado.nombre}{" "}
                  {clienteSeleccionado.apellido}
                </p>
                <p>
                  <strong>DNI:</strong> {clienteSeleccionado.dni}
                </p>
                <p>
                  <strong>Fecha Nac:</strong> {clienteSeleccionado.fechaNac}
                </p>
                <p>
                  <strong>Teléfono:</strong> {clienteSeleccionado.telefono}
                </p>
                <p>
                  <strong>Email:</strong> {clienteSeleccionado.email}
                </p>
              </div>
            )}
          </div>

          {/* Producto */}
          <div>
            <span className="text-sm">Seleccionar un producto</span>
            <Select
              value={productoId}
              onValueChange={(value) => {
                setProductoId(value);
                const prod = productos.find(
                  (item) => `${item.producto_id}` === value
                );
                if (prod) {
                  setPrecio(prod.precio);
                  setNombreServicio(prod.nombreProd);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar un nombre">
                  {nombreServicio || "Seleccionar un nombre"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="font-rubik">
                <SelectGroup>
                  {productos.map((item) => (
                    <SelectItem
                      key={item.producto_id}
                      value={`${item.producto_id}`}
                    >
                      {item.nombreProd}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {productoSeleccionado && (
              <div className="mt-4 p-3 border rounded-md bg-muted text-sm space-y-1 w-[320px]">
                <p>
                  <strong>Nombre:</strong> {productoSeleccionado.nombreProd}
                </p>
                <p>
                  <strong>Marca:</strong> {productoSeleccionado.marca}
                </p>
                <p>
                  <strong>Descripción:</strong>{" "}
                  {productoSeleccionado.descripcion}
                </p>
                <p>
                  <strong>Precio:</strong> ${productoSeleccionado.precio}
                </p>
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full hover:cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Generando factura..." : "Generar factura"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
