export const productColumns = [
    {
        name: "Product",
        key: "name",
        visibility: true,
        changable: false,
    },
    {
        name: "Code",
        key: "default_code",
        visibility: true,
        changable: true,
    },
    {
        name: "Price",
        key: "list_price",
        visibility: true,
        changable: false,
    },
    {
        name: "Quantity",
        key: "quantity",
        visibility: true,
        changable: false,
    },
    {
        name: "Taxes",
        key: "taxes",
        visibility: true,
        changable: true,
    },
    {
        name: "Amount Before Tax",
        key: "price_subtotal",
        visibility: true,
        changable: false,
    },
    {
        name: "Tax Amount",
        key: "tax_amount",
        visibility: true,
        changable: true,
    },
    {
        name: "Amount After Tax",
        key: "price_total",
        visibility: true,
        changable: false,
    },
];