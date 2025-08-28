import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Calendar, ChevronDown, ChevronsUpDown, Home, Inbox, Search, Settings, ShoppingBasket, Users } from "lucide-react"
import { useTranslations } from "next-intl";
import Link from "next/link";

export function AppSidebar() {
    const t = useTranslations();

    const items = [
        {
            title: t("Dashboard"),
            url: "/",
            icon: Home,
            type: "link",
        },
        {
            title: t("Partners"),
            url: "/partners",
            icon: Users,
            type: "link",
        },
        {
            title: t("Purchases"),
            url: "/",
            icon: ShoppingBasket,
            type: "group",
            items: [
                {
                    title: t("Orders"),
                    url: "/",
                    icon: ShoppingBasket,
                },
                {
                    title: t("Suppliers"),
                    url: "/",
                    icon: Users,
                },
                {
                    title: t("Sales"),
                    url: "/",
                    icon: ShoppingBasket,
                },
                {
                    title: t("Refunds"),
                    url: "/",
                    icon: ShoppingBasket,
                }
            ]
        },
        {
            title: t("Inbox"),
            url: "#",
            icon: Inbox,
            type: "link",
        },
        {
            title: t("Calendar"),
            url: "#",
            icon: Calendar,
            type: "link",
        },
        {
            title: t("Search"),
            url: "#",
            icon: Search,
            type: "link",
        }
    ]

    return (
        <Sidebar collapsible="icon" className="overflow-x-hidden py-6">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2 p-[2px]">
                        <SidebarTrigger />

                        <h1 className="text-4xl font-semibold px-2">Ply</h1>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                {
                    items.map((item) => {
                        if (item.type === "link") {
                            return (
                                <SidebarMenuItem key={item.title} className="px-2">
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        } else if (item.type === "group") {
                            return (
                                <Collapsible key={item.title} defaultOpen className="group/collapsible">
                                    <SidebarGroup className="py-0">
                                        <SidebarGroupLabel asChild>
                                            <CollapsibleTrigger>
                                                <section className="flex items-center gap-2">
                                                    <item.icon className="w-4 h-4" />
                                                    <span>{item.title}</span>
                                                </section>
                                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                            </CollapsibleTrigger>
                                        </SidebarGroupLabel>
                                        <CollapsibleContent>
                                            <SidebarGroupContent>
                                                {
                                                    item.items && item.items.map((item) => (
                                                        <SidebarMenuItem key={item.title} className="px-2">
                                                            <SidebarMenuButton asChild>
                                                                <Link href={item.url}>
                                                                    <item.icon />
                                                                    <span>{item.title}</span>
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    ))
                                                }
                                            </SidebarGroupContent>
                                        </CollapsibleContent>
                                    </SidebarGroup>
                                </Collapsible>
                            )
                        }
                    })
                }
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem
                        className="flex gap-2 px-4"
                    >
                        <Avatar className="h-5 w-5 rounded-full">
                            <AvatarImage src="https://github.com/d7mi-b.png" alt="Abdulrahman" className="rounded-full" />
                            <AvatarFallback className="rounded-lg">AB</AvatarFallback>
                        </Avatar>

                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">Abdulrahman</span>
                        </div>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="px-2">
                        <SidebarMenuButton asChild>
                            <Link href='/'>
                                <Settings />
                                <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}