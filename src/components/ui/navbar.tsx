import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { SidebarTrigger } from "./sidebar";
import { Input } from "./input";
import { Button } from "./button";
import { File, Search } from "lucide-react";

export default function Navbar() {
    return (
        <NavigationMenu className="max-w-full justify-between py-4">
            <NavigationMenuList>
                <NavigationMenuItem className="flex items-center gap-2">
                    <Search />
                    <Input placeholder="search" type="search" />
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Button className="bg-main">
                        <File />
                        New Request
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}