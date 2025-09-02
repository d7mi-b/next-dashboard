import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Settings2 } from "lucide-react";
import { Label } from "./label";
import { Switch } from "./switch";
import useCreateSalesStore from "@/hooks/useCreateSalesStore";
import { Button } from "./button";


export default function ProductTableColumnSetting() {
    const columns = useCreateSalesStore((state: any) => state.columns);
    const changeVisibility = useCreateSalesStore((state: any) => state.changeVisibility);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Column settings">
                    <Settings2 className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-fit bg-popover text-popover-foreground border shadow-md rounded-md p-6 text-sm z-50" align="end" sideOffset={8}>
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Visibility Columns</h4>
                        <p className="text-muted-foreground text-sm">
                            Choose which columns to show.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        {
                            columns.map((column: any) => (
                                <div key={column.name} className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor="width">{column.name}</Label>
                                    <Switch
                                        checked={column.visibility}
                                        onCheckedChange={() => changeVisibility(column.name)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}