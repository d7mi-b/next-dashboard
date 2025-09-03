"use client";

import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadcrumbApp() {
    const [breadcrumbs, setBreadcrumbs] = useState<{ name: string, href: string }[]>([]);
    const path = usePathname();

    useEffect(() => {
        const breadcrumbs: { name: string, href: string }[] = [];

        path.split('/').forEach((path, index) => {
            console.log(path, index);
            const name = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            const item = { name: name || "Home", href: `/${path}` };

            breadcrumbs.push(item);
        });

        setBreadcrumbs(breadcrumbs);
    }, [path]);

    return (
        <Breadcrumb className="text-sm mt-2 px-4">
            <BreadcrumbList>
                {
                    breadcrumbs.map((b, index) => {
                        if (index === breadcrumbs.length - 1) {
                            return (
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbPage>{b.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            );
                        } else {
                            return (
                                <div className="flex items-center gap-4" key={index}>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={b.href}>{b.name}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </div>
                            );
                        }
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
}