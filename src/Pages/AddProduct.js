import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';
import '../Css/AddProduct.css'; // Import the CSS file

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    rate: '',
    amount: '',
    category: ''
  });

  const [categories, setCategories] = useState([]); // State to store categories
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // Check if the user is authenticated and has admin role
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      navigate('/login'); // Redirect to login if not admin
    }
  }, [user, navigate]);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecomm-backend-hnkq.onrender.com/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
        message.error('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.post('https://ecomm-backend-hnkq.onrender.com/add-product', product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Product added successfully');
      setProduct({
        title: '',
        price: '',
        description: '',
        image: '',
        rate: '',
        amount: '',
        category: ''
      }); // Clear form
    } catch (error) {
      console.error('Error adding product', error);
      message.error('Error adding product');
    }
    setLoading(false);
  };

  if (!isAdmin) {
    return <p>You do not have permission to access this page.</p>;
  }

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rate:
          <input
            type="number"
            name="rate"
            value={product.rate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={product.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
