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
      console.log("📦 Respuesta de la API:", response); // Log para ver la respuesta

      if (response) {
        setFacturasServicio(response); // Asegúrate de acceder correctamente a la propiedad 'products'
      } else {
        console.error("No se encontraron productos en la respuesta de la API");
      }
    };

    fetchProducts();
  }, [datos?.usuario_id]);
  return (
    <div>
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
