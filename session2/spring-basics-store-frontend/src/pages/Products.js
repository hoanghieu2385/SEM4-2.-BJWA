import React, { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/productApi";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: 0 });
    const [editProduct, setEditProduct] = useState(null);
    const [errors, setErrors] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    };

    const validateProduct = (product) => {
        const errors = {};
        if (!product.name.trim()) {
            errors.name = "Product name is required";
        }
        if (!product.price || product.price <= 0) {
            errors.price = "Price must be greater than 0";
        }
        return errors;
    };

    const handleAdd = async () => {
        const validationErrors = validateProduct(newProduct);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await addProduct(newProduct);
                setNewProduct({ name: "", price: 0 });
                fetchProducts();
            } catch (error) {
                console.error("Error adding product:", error);
            }
        }
    };

    const handleEdit = async () => {
        if (!editProduct) return;

        const validationErrors = validateProduct(editProduct);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await updateProduct(editProduct.id, editProduct);
                setEditProduct(null);
                fetchProducts();
            } catch (error) {
                console.error("Error updating product:", error);
            }
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await deleteProduct(deleteId);
            setShowDeleteModal(false);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-3">Products Management</h2>

            {/* Add Product Form */}
            <div className="card mb-4">
                <div className="card-header">Add New Product</div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input 
                            type="number" 
                            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                        />
                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                    </div>

                    <button className="btn btn-primary" onClick={handleAdd}>Add Product</button>
                </div>
            </div>

            {/* Edit Product Form */}
            {editProduct && (
                <div className="card mb-4">
                    <div className="card-header">Edit Product</div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={editProduct.name}
                                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input 
                                type="number" 
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                value={editProduct.price}
                                onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) || 0 })}
                            />
                            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                        </div>

                        <div className="d-flex gap-2">
                            <button className="btn btn-primary" onClick={handleEdit}>Save Changes</button>
                            <button className="btn btn-secondary" onClick={() => setEditProduct(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="card">
                <div className="card-header">Product List</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>
                                            <button 
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => setEditProduct(product)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => confirmDelete(product.id)}
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
                                Are you sure you want to delete this product? This action cannot be undone.
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

export default Products;