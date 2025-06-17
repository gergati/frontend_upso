import { useDashboardStore } from "@/hooks/useDashboardStore";
import { ControlStock } from "../components/control-stock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Home = () => {
  const { clientes, productos, mostrarFacturas } = useDashboardStore()

  const dashboardData = [
    { title: "Clientes", value: clientes.length },
    { title: "Productos", value: productos.length },
    { title: "Facturas del mes", value: mostrarFacturas.length },
    { title: "Ingresos estimados", value: "$950,000" },
  ];

   

  return (
    <div className="flex flex-col gap-6 p-2 w-full font-rubik">
      <h2 className="font-title text-2xl">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 w-full">

        {dashboardData.map((item) => (
          <Card key={item.title} className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{item.value}</p>
            
            </CardContent>
            
          </Card>
        ))}
      </div>

      <div className="w-full">
        <ControlStock />
      </div>
    </div>
  );
};
