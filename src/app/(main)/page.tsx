import { Button } from "@/components/ui/button";
import { CalendarSync, CheckCircle2, FolderSync, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge";
import WarehousesTab from "@/components/ui/warehouses-tab";
import Pupolarwarehouse from "@/components/ui/pupolar-warehouse";
import Navbar from "@/components/ui/navbar";
import StatisticsPartners from "@/components/ui/statistics-partners";
import Link from "next/link";

export default async function Home() {

  const tabs = [
    {
      id: "warehouses",
      name: 'warehouses',
      tab: <WarehousesTab />,
      badge: 12
    },
    {
      id: "partners",
      name: 'Partners',
      tab: <WarehousesTab />,
      badge: 0
    },
    {
      id: "fields-requests",
      name: 'Fields Requests',
      tab: <WarehousesTab />,
      badge: 5
    },
    {
      id: "pick-lists",
      name: 'Pick Lists',
      tab: <WarehousesTab />,
      badge: 0
    },
    {
      id: "activity",
      name: 'Activity',
      tab: <WarehousesTab />,
      badge: 0
    }
  ]

  return (
    <main className="p-4 w-full">
      <Navbar 
        button={
          <Button asChild>
            <Link href="/invoice/create">
              <Plus />
              <span className="max-sm:hidden">Create Invoice</span>
            </Link>
          </Button>
        }
      />

      <section className="p-4">
        <StatisticsPartners />
      </section>

      <section className="p-4">
        <header className="flex items-center justify-between gap-4 my-6">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Stock</h1>
          
          <section className="text-sm flex gap-2 items-center">
            <p className="text-neutral-500">Sync data:</p>
            <Button variant="outline" size="sm">
              <CalendarSync /> House Call Pro
            </Button>
          </section>
        </header>
        
        <Tabs defaultValue="warehouses" className="w-full">
          <section className="overflow-x-auto scrollbar-none">
            <TabsList>
              {
                tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.name}

                    { tab.badge > 0 && <Badge variant="outline">{tab.badge}</Badge> }
                  </TabsTrigger>
                ))
              }
            </TabsList>
          </section>
          
          <section className="flex gap-8 justify-between max-lg:flex-col">
            <section className="flex-grow">
              {
                tabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id}>
                    {tab.tab}
                  </TabsContent>
                ))
              }
            </section>

            <aside className="min-w-[300px] p-4 border rounded-lg h-fit">
              <Pupolarwarehouse />

              <section className="mt-4 flex items-center gap-2">
                <CheckCircle2 className="text-main" />
                <p>Stocks are great, good job!</p>
              </section>
            </aside>
          </section>
        </Tabs>
      </section>
    </main>
  );
}
