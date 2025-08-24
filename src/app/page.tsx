import { Button } from "@/components/ui/button";
import { CalendarSync, FolderSync } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge";
import WherehousesTab from "@/components/ui/wherehouses-tab";

export default async function Home() {

  const tabs = [
    {
      id: "wherehouses",
      name: 'Wherehouses',
      tab: <WherehousesTab />,
      badge: 12
    },
    {
      id: "trucks",
      name: 'Trucks',
      tab: <WherehousesTab />,
      badge: 0
    },
    {
      id: "fields-requests",
      name: 'Fields Requests',
      tab: <WherehousesTab />,
      badge: 5
    },
    {
      id: "pick-lists",
      name: 'Pick Lists',
      tab: <WherehousesTab />,
      badge: 0
    },
    {
      id: "activity",
      name: 'Activity',
      tab: <WherehousesTab />,
      badge: 0
    }
  ]

  return (
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

      <section>
        <Tabs defaultValue="wherehouses" className="w-full">
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
          
          {
            tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                {tab.tab}
              </TabsContent>
            ))
          }
        </Tabs>
      </section>
    </section>
  );
}
