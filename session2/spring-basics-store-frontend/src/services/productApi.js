import API_BASE_URL from "./api";

export const getProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
};

export const addProduct = async (product) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    return response.json();
};

export const updateProduct = async (id, product) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    return response.json();
};

export const deleteProduct = async (id) => {
    await fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE" });
};