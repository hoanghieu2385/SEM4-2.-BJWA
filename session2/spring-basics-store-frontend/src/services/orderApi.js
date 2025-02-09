import API_BASE_URL from "./api";

export const getOrders = async () => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
};

// orderApi.js
export const addOrder = async (order) => {
    // Format lại dữ liệu theo cấu trúc của backend
    const formattedOrder = {
        customer: { id: Number(order.customer.id) },
        orderDate: order.orderDate,
        totalPrice: Number(order.totalPrice),
        items: order.items.map(item => ({
            order: null, // Backend sẽ tự set giá trị này
            product: { id: Number(item.product.id) },
            quantity: Number(item.quantity),
            price: Number(item.price)
        }))
    };

    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formattedOrder)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server response:", errorText);
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Network error:", error);
        throw error;
    }
};

export const updateOrder = async (id, order) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    });
    return response.json();
};

export const deleteOrder = async (id) => {
    await fetch(`${API_BASE_URL}/orders/${id}`, { method: "DELETE" });
};