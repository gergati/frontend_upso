import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartLegend, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
    { month: "January", productos: 186, facturacion: 80 },
    { month: "February", productos: 305, facturacion: 200 },
    { month: "March", productos: 237, facturacion: 120 },
    { month: "April", productos: 73, facturacion: 190 },
    { month: "May", productos: 209, facturacion: 130 },
    { month: "June", productos: 214, facturacion: 140 },
]

const chartConfig = {
    desktop: {
        label: "productos",
        color: "#2563eb",
    },
    mobile: {
        label: "facturacion",
        color: "#60a5fa",
    },
} satisfies ChartConfig



export const ControlStock = () => {
    return (
        <div className="border border-black rounded-2xl">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-[300px] md:w-[600px]">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="productos" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="facturacion" fill="var(--color-mobile)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
