"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { count } from "console"
const chartData = [
    { day: "Sunday", added: 305, moved: 200 },
    { day: "Monday", added: 237, moved: 58 },
    { day: "Tuesday", added: 190, moved: 100 },
    { day: "Wednesday", added: 240, moved: 200 },
    { day: "Thursday", added: 250, moved: 200 },
    { day: "Friday", added: 250, moved: 200 },
    { day: "Saturday", added: 200, moved: 200 },
]
const chartConfig = {
    added: {
        label: "Added",
        color: "#46917a",
    },
    moved: {
        label: "Moved",
        color: "#f2d1dc",
    }
} satisfies ChartConfig

const materials = [
    {
        id: 1,
        name: "Wood",
        count: 100,
    },
    {
        id: 2,
        name: "Metal",
        count: 200,
    },
    {
        id: 3,
        name: "Plastic",
        count: 300,
    },
    {
        id: 4,
        name: "Glass",
        count: 400,
    },
]

export default function PupolarWherehouse() {
    return (
        <section>
            <header className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-md">Papular Wherehouses</h3>

                <Select defaultValue="week">
                    <SelectTrigger className="w-fit font-semibold border-none">
                        <SelectValue placeholder="Interval" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                        ["week", "month", "year"].map((item) => (
                            <SelectItem key={item} value={item}>
                            {item}
                            </SelectItem>
                        ))
                        }
                    </SelectContent>
                </Select>
            </header>

            <section className="mt-4">
                <header>
                    <h4 className="font-semibold">Main Warehouse</h4>
                </header>

                <section>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="added" fill="var(--color-added)" radius={100} />
                            <Bar dataKey="moved" fill="var(--color-moved)" radius={100} />
                        </BarChart>
                    </ChartContainer>
                </section>

                <section className="mt-4">
                    <header>
                        <h5 className="font-semibold">Top materials</h5>
                    </header>

                    <ul>
                        {
                            materials.map((material, index) => (
                                <li key={material.id} className="flex items-center justify-between gap-4 my-2">
                                    <p>{index + 1}. {material.name}</p>
                                    <p className="font-medium">{material.count}</p>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </section>
        </section>
    );
}