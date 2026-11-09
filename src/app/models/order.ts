export type OrderItem = {
    productId: string;
    quantity: number;
    price: number;
}

export type Order = {
    id: string;
    userId: string;
    total: number;
    items: OrderItem[];
    paymentStatus: 'success' | 'failure';
}
