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

export default function Navbar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <SidebarTrigger />
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Input placeholder="search" type="search" />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}