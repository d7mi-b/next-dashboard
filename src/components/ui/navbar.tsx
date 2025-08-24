import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { SidebarMenuButton, SidebarTrigger } from "./sidebar";
import { Input } from "./input";
import { Button } from "./button";
import { File, Search } from "lucide-react";

export default function Navbar() {
    return (
        <NavigationMenu className="max-w-full justify-between py-4">
            <NavigationMenuList>
                <NavigationMenuItem className="md:hidden">
                    <SidebarTrigger />
                </NavigationMenuItem>
                <NavigationMenuItem className="flex items-center gap-2">
                    <Search />
                    <Input placeholder="search" type="search" className="border-none" />
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Button className="bg-main">
                        <File />
                        <span className="max-sm:hidden">New Request</span>
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}