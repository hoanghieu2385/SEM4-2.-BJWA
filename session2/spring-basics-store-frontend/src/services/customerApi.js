import API_BASE_URL from "./api";

export const getCustomers = async () => {
    const response = await fetch(`${API_BASE_URL}/customers`);
    return response.json();
};

export const addCustomer = async (customer) => {
    const response = await fetch(`${API_BASE_URL}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
    });
    return response.json();
};

export const updateCustomer = async (id, customer) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
    });
    return response.json();
};

export const deleteCustomer = async (id) => {
    await fetch(`${API_BASE_URL}/customers/${id}`, { method: "DELETE" });
};
