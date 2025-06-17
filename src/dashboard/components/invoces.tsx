import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
    clientName?: string;
    clientAddress?: string;
    description?: string;
    nombreProd?: string;
    precio?: number;
}

export default function Invoice({ clientAddress, clientName, description, precio }: Props) {
    const printRef = useRef<HTMLDivElement>(null);

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element,{
            scale: 2
        });

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
        pdf.save(`${clientName}_invoice.pdf`);
    };

    return (
        <div style={{ backgroundColor: "#ffffff", padding: "0.25rem" }}>
            <div
                ref={printRef}
                style={{
                    padding: "2rem",
                    backgroundColor: "#ffffff",
                    border: "1px solid #9ca3af", 
                }}
            >
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2rem"
                }}>
                    <div>
                        <h1 style={{ fontSize: "40px", fontFamily: "sans-serif", color: "#1f2937" }}>
                            NicoAdmin.
                        </h1>
                        <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                            Invoice #INV-2024-001
                        </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                            Cuyo 529
                            <br />
                            Bahia Blanca, 8000
                        </p>
                    </div>
                </div>

                <div style={{ marginBottom: "2rem", fontSize: "0.875rem" }}>
                    <h3 style={{ fontSize: "0.875rem", fontWeight: "600" }}>Remitido a:</h3>
                    <p style={{ color: "#374151"  }}>
                        {clientName || "Nombre del Cliente"}
                        <br />
                        {clientAddress || "Dirección del Cliente"}
                        <br />
                        Bahia Blanca
                    </p>
                </div>

                <table style={{ width: "100%", marginBottom: "1rem", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f3f4f6" }}>
                            <th style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "left" }}>
                                Descripción
                            </th>
                            <th style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "right" }}>
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                                {description || "Sin descripción"}
                            </td>
                            <td style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "right" }}>
                                {precio}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: "0.25rem", display: "flex", justifyContent: "center" }}>
                <button
                    onClick={handleDownloadPdf}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#2563eb", 
                        color: "#ffffff",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.375rem",
                        transition: "background-color 0.3s ease",
                        cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#1d4ed8")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#2563eb")
                    }
                >
                    Descargar PDF
                </button>
            </div>
        </div>
    );
}
