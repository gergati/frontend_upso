import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
    clientAddress: string;
    clientName: string;
    description: string;
    precio: string
}

export default function InvoiceProductos({ clientAddress, clientName, description, precio }: Props) {
    const printRef = useRef(null);

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${clientName || "factura"}_invoice.pdf`);
    };

    return (
        <div className="bg-white p-1">
            <div
                ref={printRef}
                className="p-8 bg-white border border-gray-400"
            >
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 font-sans">NicoAdmin.</h1>
                        <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                        <p>
                            Cuyo 529<br />
                            Bahía Blanca, 8000
                        </p>
                    </div>
                </div>

                <div className="mb-8 text-sm">
                    <h3 className="font-semibold">Remitido a:</h3>
                    <p className="text-gray-700">
                        {clientName || "Nombre del Cliente"}<br />
                        {clientAddress || "Dirección del Cliente"}<br />
                        Bahía Blanca
                    </p>
                </div>

                <table className="w-full mb-4 border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Descripción</th>
                            <th className="border border-gray-300 p-2 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2">{description || "Sin descripción"}</td>
                            <td className="border border-gray-300 p-2 text-right">
                                {precio !== undefined ? `$${precio}` : "$0.00"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-1 flex justify-center">
                <button
                    onClick={handleDownloadPdf}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                    Descargar PDF
                </button>
            </div>
        </div>
    );
}
