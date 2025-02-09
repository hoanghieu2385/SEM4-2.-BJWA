import React, { useEffect, useState } from "react";
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from "../services/customerApi";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ fullName: "", phone: "" });
    const [editCustomer, setEditCustomer] = useState(null);
    const [errors, setErrors] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const data = await getCustomers();
        setCustomers(data);
    };

    const validateCustomer = (customer) => {
        const errors = {};
        if (!customer.fullName.trim()) {
            errors.fullName = "Full name is required";
        } else if (customer.fullName.length < 2) {
            errors.fullName = "Full name must be at least 2 characters";
        }

        if (!customer.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!/^[0-9]{10,11}$/.test(customer.phone.trim())) {
            errors.phone = "Phone must be 10-11 digits";
        }

        return errors;
    };

    const handleAdd = async () => {
        const validationErrors = validateCustomer(newCustomer);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await addCustomer(newCustomer);
                setNewCustomer({ fullName: "", phone: "" });
                fetchCustomers();
            } catch (error) {
                console.error("Error adding customer:", error);
            }
        }
    };

    const handleEdit = async () => {
        if (!editCustomer) return;

        const validationErrors = validateCustomer(editCustomer);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await updateCustomer(editCustomer.id, editCustomer);
                setEditCustomer(null);
                fetchCustomers();
            } catch (error) {
                console.error("Error updating customer:", error);
            }
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await deleteCustomer(deleteId);
            setShowDeleteModal(false);
            fetchCustomers();
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-3">Customers Management</h2>

            {/* Add Customer Form */}
            <div className="card mb-4">
                <div className="card-header">Add New Customer</div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                            value={newCustomer.fullName}
                            onChange={(e) => setNewCustomer({ ...newCustomer, fullName: e.target.value })}
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            value={newCustomer.phone}
                            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    <button className="btn btn-primary" onClick={handleAdd}>Add Customer</button>
                </div>
            </div>

            {/* Edit Customer Form */}
            {editCustomer && (
                <div className="card mb-4">
                    <div className="card-header">Edit Customer</div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                value={editCustomer.fullName}
                                onChange={(e) => setEditCustomer({ ...editCustomer, fullName: e.target.value })}
                            />
                            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                value={editCustomer.phone}
                                onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>

                        <div className="d-flex gap-2">
                            <button className="btn btn-primary" onClick={handleEdit}>Save Changes</button>
                            <button className="btn btn-secondary" onClick={() => setEditCustomer(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Table */}
            <div className="card">
                <div className="card-header">Customer List</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.fullName}</td>
                                        <td>{customer.phone}</td>
                                        <td>
                                            <button 
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => setEditCustomer(customer)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => confirmDelete(customer.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
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
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowDeleteModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this customer? This action cannot be undone.
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
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;