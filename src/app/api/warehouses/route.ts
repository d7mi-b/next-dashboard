import { Warehouse } from '@/types/warehouse';

export async function GET() {
  const warehouses: Warehouse[] = [
    {
      id: 1,
      name: 'Main Warehouse',
      address: '123 Main St, San Francisco, CA 94107, USA',
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      items: 12,
    },
    {
      id: 2,
      name: 'Second Warehouse',
      address: '456 Second St, San Francisco, CA 94107, USA',
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      items: 10,
    },
    {
      id: 3,
      name: 'Third Warehouse',
      address: '789 Third St, San Francisco, CA 94107, USA',
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      items: 8,
    },
  ]

  return Response.json(warehouses);
}