export const addWherehouseformFields = [
    {
        id: "name",
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        description: "This is the name of the warehouse.",
    },
    {
        id: "address",
        name: "address",
        label: "Address",
        type: "text",
        required: true,
        description: null,
    },
    {
        id: "isDefault",
        name: "isDefault",
        label: "Is Default",
        type: "checkbox",
        required: false,
        description: null,
    }
]