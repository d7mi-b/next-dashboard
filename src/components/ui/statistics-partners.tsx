"use client";

import { requestOdoo } from "@/actions/request-odoo";
import { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";
import renderActiveShape from "./render-active-shape";
import chartColors from "@/config/chart-colors";

export default function StatisticsPartners() {
    const [totalPartners, setTotalPartners] = useState<{name: string, value: number}[]>([]);

    useEffect(() => {
        async function totalPartners() {
            const customersCount = await requestOdoo({
                "model": "res.partner",
                "method": "search_count",
                "args": [
                    [
                        ["customer_rank", ">", 0]
                    ]
                ],
                "kwargs": {}
            });

            const suppliersCount = await requestOdoo({
                "model": "res.partner",
                "method": "search_count",
                "args": [
                    [
                        ["supplier_rank", ">", 0]
                    ]
                ],
                "kwargs": {}
            });

            const partnersCount = await requestOdoo({
                "model": "res.partner",
                "method": "search_count",
                "args": [
                    [
                        ["supplier_rank", "=", 0], ["customer_rank", "=", 0]
                    ]
                ],
                "kwargs": {}
            });

            setTotalPartners([
                { name: 'Customers', value: customersCount },
                { name: 'Suppliers', value: suppliersCount },
                { name: 'Partners', value: partnersCount },
            ]);
        }

        totalPartners();
    }, [])

    return (
        <section>
            <header className="flex items-center justify-between gap-4 my-6">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Statistics</h1>
            </header>

            <section className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                <section className="w-full h-[25vh] flex flex-col items-center justify-center gap-4 text-center min-h-[25vh]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie 
                                activeShape={renderActiveShape} 
                                data={totalPartners} 
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                dataKey="value"
                                fill="#8884d8"
                            >
                                {
                                    totalPartners.map((entry, index) => (
                                        <Cell key={`cell-${entry.name}`} fill={chartColors[index % chartColors.length]} />
                                    ))
                                }
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </section>

                <section className="w-full h-[25vh] flex flex-col items-center justify-center gap-4 text-center min-h-[25vh]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie 
                                activeShape={renderActiveShape} 
                                data={totalPartners} 
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                dataKey="value"
                                fill="#8884d8"
                            >
                                {
                                    totalPartners.map((entry, index) => (
                                        <Cell key={`cell-${entry.name}`} fill={chartColors[index % chartColors.length]} />
                                    ))
                                }
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </section>
            </section>
        </section>
    );
}