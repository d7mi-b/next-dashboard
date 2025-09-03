"use client";

import { requestOdoo } from "@/actions/request-odoo";
import { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip, LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";
import renderActiveShape from "./render-active-shape";
import chartColors from "@/config/chart-colors";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function StatisticsPartners() {
    const [totalPartners, setTotalPartners] = useState<{name: string, value: number}[]>([]);
    const [saleOrdersAmount, setSaleOrdersAmount] = useState<{amount: number; state?: string; date: string}[]>([]);

    useEffect(() => {
        getTotalPartners();
        getSaleOrdersAmount();
    }, []);

    async function getTotalPartners() {
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

    async function getSaleOrdersAmount() {
        const saleOrders = await requestOdoo({
            "model": "sale.order",
            "method": "search_read",
            "args": [
                []
            ],
            "kwargs": {
                "fields": [
                    "date_order",
                    "amount_total",
                    "state"
                ],
                "order": "date_order asc",
            }
        });

        const salesByDate = new Map();
        saleOrders.forEach(d => {
            const dateKey = new Date(d.date_order).toLocaleDateString();
            const amount = d.amount_total;
            const state = d.state === 'sale' ? 'confirmed' : 'draft';

            if (!salesByDate.has(dateKey)) {
                salesByDate.set(dateKey, { date: dateKey, amount: amount, state: state });
            }

            if (!salesByDate.get(dateKey)[state]) {
                salesByDate.get(dateKey)[state] = 0;
            }

            salesByDate.get(dateKey)[state] += amount;
        });

        // Convert map to a sorted array for Recharts
        const aggregatedData = Array.from(salesByDate.values())
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        console.log(aggregatedData);

        setSaleOrdersAmount(aggregatedData);
    }

    return (
        <section>
            <header className="flex items-center justify-between gap-4 my-6">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Statistics</h1>
            </header>

            <section className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                <section className="w-full h-[25vh] flex flex-col items-center justify-center gap-4 text-center min-h-fit shadow-md rounded-md border p-6">
                    <header>
                        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight text-balance">Total Partners</h2>
                    </header>
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

                <section className="w-full flex flex-col items-center justify-center gap-4 text-center min-h-[28vh] shadow-md rounded-md border p-6">
                    <header>
                        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight text-balance">Total Partners</h2>
                    </header>
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

            <section className="my-4 w-full h-[350px] flex flex-col items-center justify-center gap-4 text-center min-h-[25vh] shadow-md rounded-md border p-6">
                <header>
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight text-balance">Sales Over Time</h2>
                </header>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={saleOrdersAmount}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis dataKey="amount" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </section>
        </section>
    );
}