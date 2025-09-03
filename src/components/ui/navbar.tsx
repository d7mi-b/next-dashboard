"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { SidebarMenuButton, SidebarTrigger } from "./sidebar";
import { Input } from "./input";
import { Button } from "./button";
import { File, Search } from "lucide-react";
import { Dispatch, KeyboardEventHandler, SetStateAction, useEffect, useState } from "react";

export default function Navbar({
    button,
    search,
    setSearch,
}: {
    button?: React.ReactNode;
    search?: string;
    setSearch?: Dispatch<SetStateAction<string>>;
}) {
    const [currentSearch, setCurrentSearch] = useState<string>(search ?? "");

    const handleSearch = (e: any) => {
        if (e.key === "Enter") {
            setSearch?.(currentSearch);
        }
    }

    return (
        <NavigationMenu className="max-w-full justify-between">
            <NavigationMenuList>
                <NavigationMenuItem className="xl:hidden">
                    <SidebarTrigger />
                </NavigationMenuItem>
                <NavigationMenuItem className="flex items-center gap-2">
                    <Search />
                    <Input placeholder="search" type="search" className="border-none" value={currentSearch} onChange={(e) => setCurrentSearch(e.target.value)} onKeyDown={handleSearch} />
                </NavigationMenuItem>
            </NavigationMenuList>
            {
                button &&
                <NavigationMenuList>
                    <NavigationMenuItem>
                        { button }
                    </NavigationMenuItem>
                </NavigationMenuList>
            }
        </NavigationMenu>
    );
}