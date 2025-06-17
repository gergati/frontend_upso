import { getFacturaServicio } from "@/services/dashboard/facturaServicios/get-factura-servicios";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const Facturas = () => {
  const [facturaServicios, setFacturasServicio] = useState<any[]>([])
  const { datos } = useSelector((state: RootState) => state.auth)


  useEffect(() => {
    const fetchProducts = async () => {
      if (!datos || !datos.usuario_id) {
        console.log("No recibe usuario_id");
        return;
      }

      const response = await getFacturaServicio({ usuario_id: datos.usuario_id });

      if (response) {
        setFacturasServicio(response);
      } else {
        console.error("No se encontraron productos en la respuesta de la API");
      }
    };

    fetchProducts();
  }, [datos?.usuario_id]);
  return (
    <div>
      {
        facturaServicios.length === 0 && (
          <>No hay facturas</>
        )
      }
      {
        facturaServicios.map((item) => (
          <ul>
            <li>{item}</li>
          </ul>
        ))
      }
    </div>
  )
}
