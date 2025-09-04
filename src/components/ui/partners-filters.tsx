import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./button";
import { Filter } from "lucide-react";
import { Label } from "./label";
import { Input } from "./input";
import { requestOdoo } from "@/actions/request-odoo";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Combobox } from "./combobox";
import { Switch } from "./switch";

const orderOptions = [
    { value: "desc", label: "Descending" },
    { value: "asc", label: "Ascending" },
];

export default function PartnersFilters({
    country,
    setCountry,
    city,
    setCity,
    isCustomer,
    setIsCustomer,
    isSupplier, 
    setIsSupplier,
    order,
    setOrder,
}: {
    country: string,
    setCountry: React.Dispatch<React.SetStateAction<string>>,
    city: string,
    setCity: React.Dispatch<React.SetStateAction<string>>,
    isCustomer: boolean,
    setIsCustomer: React.Dispatch<React.SetStateAction<boolean>>,
    isSupplier: boolean,
    setIsSupplier: React.Dispatch<React.SetStateAction<boolean>>,
    order: string,
    setOrder: React.Dispatch<React.SetStateAction<string>>,
}) {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState<any[]>([]);

    async function fetchCountries() {
        const { result } = await requestOdoo({
            "model": "res.country",
            "method": "search_read",
            "args": [
                [],
                ["name"]
            ],
            "kwargs": {
                "order": "name",
            }
        });

        if (result) {
            setCountries(result);
        }
    }

    async function fetchCities() {
        const { result } = await requestOdoo({
            "model": "res.partner",
            "method": "search_read",
            "args": [
                [],
                ["city"]
            ],
            "kwargs": {}
        });

        if (result) {
            const cities = [...new Set(result.filter((c: { city: string }) => c.city).map((p: { city: string }) => ({ id: p.city, name: p.city })))]
            setCities([...cities]);
        }
    }

    useEffect(() => {
        fetchCountries();
        fetchCities();
    }, []);

    return (
        <Popover>
            <PopoverTrigger>
                <Filter />
            </PopoverTrigger>
            <PopoverContent className="w-100 bg-white shadow-lg rounded-md p-6 text-sm z-10">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Filters</h4>
                        <p className="text-muted-foreground text-sm">
                            Set the filters you want to apply to your data.
                        </p>
                    </div>
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Country</Label>
                        <Combobox items={countries} value={country} setValue={setCountry as Dispatch<SetStateAction<string | number | undefined>>} />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">City</Label>
                        <Combobox items={cities} value={city} setValue={setCity as Dispatch<SetStateAction<string | number | undefined>>} />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Is Customer</Label>
                        <Switch
                            checked={isCustomer}
                            onCheckedChange={() => setIsCustomer(!isCustomer)}
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Is Supplier</Label>
                        <Switch
                            checked={isSupplier}
                            onCheckedChange={() => setIsSupplier(!isSupplier)}
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Order By Created Date</Label>
                        <Combobox items={orderOptions} value={order} setValue={setOrder as Dispatch<SetStateAction<string | number | undefined>>} keyLabel="label" keyValue="value" />
                    </div>
                </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}