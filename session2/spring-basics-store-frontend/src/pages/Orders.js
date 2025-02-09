import React, { useEffect, useState } from "react";
import { getOrders, addOrder, deleteOrder } from "../services/orderApi";
import { getCustomers } from "../services/customerApi";
import { getProducts } from "../services/productApi";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [newOrder, setNewOrder] = useState({
        customer: { id: "" },
        items: [],
        totalPrice: 0,
        orderDate: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
        });
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchOrders();
        fetchCustomers();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]);
        }
    };

    const fetchCustomers = async () => {
        const data = await getCustomers();
        setCustomers(data);
    };

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const handleAddItem = (productId) => {
        const product = products.find((p) => p.id === Number(productId));
        if (!product) return;

        const existingItem = newOrder.items.find(
            (item) => item.product.id === product.id
        );
        
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.price = product.price * existingItem.quantity;
        } else {
            newOrder.items.push({
                product: {
                    id: product.id,
                    name: product.name
                },
                quantity: 1,
                price: product.price
            });
        }

        const totalPrice = newOrder.items.reduce((acc, item) => acc + item.price, 0);
        setNewOrder({ ...newOrder, totalPrice });
    };

    const handleChangeQuantity = (index, quantity) => {
        let items = [...newOrder.items];
        const numQuantity = Number(quantity);
        
        // Remove item if quantity is 0
        if (numQuantity === 0) {
            items.splice(index, 1);
        } else {
            const product = products.find(p => p.id === items[index].product.id);
            items[index].quantity = numQuantity;
            items[index].price = product.price * numQuantity;
        }
        
        const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
        setNewOrder({ 
            ...newOrder, 
            items, 
            totalPrice: totalPrice || 0 
        });
    };

    const handleAddOrder = async () => {
        if (newOrder.customer.id && newOrder.items.length > 0) {
            const formattedItems = newOrder.items.map(item => ({
                product: {
                    id: item.product.id
                },
                quantity: Number(item.quantity),
                price: Number(item.price)
            }));
    
            const orderToSend = {
                customer: {
                    id: Number(newOrder.customer.id)
                },
                orderDate: newOrder.orderDate,
                totalPrice: Number(newOrder.totalPrice),
                items: formattedItems
            };
                
            try {
                const response = await addOrder(orderToSend);
                console.log("Order created:", response);
                setNewOrder({
                    customer: { id: "" },
                    items: [],
                    totalPrice: 0,
                    orderDate: new Date().toISOString()
                });
                fetchOrders();
            } catch (error) {
                console.error("Error adding order:", error);
            }
        } else {
            console.warn("Missing customer or items in new order");
        }
    };

    const confirmDelete = (orderId) => {
        setDeleteId(orderId);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            await deleteOrder(deleteId);
            fetchOrders();
            setShowDeleteModal(false);
            setDeleteId(null);
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-3">Orders Management</h2>

            {/* Add Order Section */}
            <div className="card mb-4">
                <div className="card-header">Create New Order</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <select 
                                className="form-select" 
                                value={newOrder.customer.id}
                                onChange={(e) => setNewOrder({ 
                                    ...newOrder, 
                                    customer: { id: e.target.value } 
                                })}
                            >
                                <option value="">Select Customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <select 
                                className="form-select" 
                                onChange={(e) => handleAddItem(e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>Select Product</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} - ${product.price.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Order Items Table */}
                    {newOrder.items.length > 0 && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newOrder.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.product.name}</td>
                                        <td>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                value={item.quantity}
                                                onChange={(e) => handleChangeQuantity(index, e.target.value)} 
                                                min="0"
                                            />
                                        </td>
                                        <td>${item.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Total Price: ${newOrder.totalPrice.toFixed(2)}</h5>
                        <button 
                            className="btn btn-primary" 
                            onClick={handleAddOrder}
                            disabled={!newOrder.customer.id || newOrder.items.length === 0}
                        >
                            Create Order
                        </button>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="card">
                <div className="card-header">Existing Orders</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Products</th>
                                    <th>Order Date</th>
                                    <th>Total Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.customer?.fullName || "Unknown"}</td>
                                            <td>
                                                {order.items?.map((item, index) => (
                                                    <div key={index}>
                                                        {item.product.name} x {item.quantity} (${item.price.toFixed(2)})
                                                    </div>
                                                ))}
                                            </td>
                                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                                            <td>${order.totalPrice.toFixed(2)}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-danger btn-sm" 
                                                    onClick={() => confirmDelete(order.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No orders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Order Deletion</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowDeleteModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this order? This action cannot be undone.
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    onClick={handleDelete}
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;