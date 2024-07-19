import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../Pages/Redux/UserSlice";
import "../Css/Products.css";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const Products = ({ handleClick }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    description: "",
    price: 0,
    rate: 0,
    image: "",
    category: ""
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ecomm-backend-hnkq.onrender.com/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://ecomm-backend-hnkq.onrender.com/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) &&
          (selectedCategory === "" || product.category === selectedCategory)
      )
    );
  }, [search, products, selectedCategory]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          "https://ecomm-backend-hnkq.onrender.com/user/getUserData",
          { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(setUser(response.data.data));
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setError("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, [dispatch]);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
  };

  const handleUpdateClick = (product) => {
    setProductToUpdate(product);
    setUpdateFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      rate: product.rate,
      image: product.image,
      category: product.category
    });
    setIsUpdatePopupOpen(true);
  };

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://ecomm-backend-hnkq.onrender.com/update-product/${productToUpdate._id}`,
        updateFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productToUpdate._id ? response.data.product : product
        )
      );
      setIsUpdatePopupOpen(false);
    } catch (err) {
      console.error("Failed to update product", err);
      setError("Failed to update product.");
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="main0">
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search Products"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="searchCategory"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button type="submit" className="searchButton">
            <i className="fa fa-search" />
          </button>
        </div>
      </div>
      {filteredProducts.length ? (
        <div className="main">
          {filteredProducts.map((item) => (
            <div key={item._id} className="product-card">
              <img src={item.image} className="product-image" alt={item.title} />
              <div className="product-body">
                <h5 className="product-title">{truncateText(item.title, 25)}</h5>
                <p className="product-text" style={{ maxWidth: 250 }}>
                  {truncateText(item.description, 55)}
                </p>
                <p className="product-price" style={{ maxWidth: 250 }}>
                  $ {item.price}
                </p>
                <p className="product-rating" style={{ maxWidth: 250 }}>
                  <StarRatings
                    rating={item.rate}
                    starDimension="16px"
                    starSpacing="1px"
                    starRatedColor="red"
                  />
                </p>
                {user?.role === "admin" ? (
                  <button
                    className="product-button1"
                    onClick={() => handleUpdateClick(item)}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="product-button1"
                    onClick={() => handleClick(item)}
                  >
                    Add To Cart
                  </button>
                )}
                <Link to={`/products/${item._id}`} state={item}>
                  <button className="product-button2">More Info</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <h1 className="no-products1">SORRY ☹️!!!</h1>
          <h1 className="no-products2">No Products Found !!!</h1>
        </div>
      )}
      {isUpdatePopupOpen && (
        <div className="update-popup">
          <form onSubmit={handleUpdateSubmit}>
            <h2>Update Product</h2>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={updateFormData.title}
                onChange={handleUpdateFormChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={updateFormData.description}
                onChange={handleUpdateFormChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={updateFormData.price}
                onChange={handleUpdateFormChange}
              />
            </label>
            <label>
              Rating:
              <input
                type="number"
                name="Rate"
                value={updateFormData.rate}
                onChange={handleUpdateFormChange}
                max="5"
                min="0"
                step="0.1"
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={updateFormData.image}
                onChange={handleUpdateFormChange}
              />
            </label>
            <label>
              Category:
              <select
                name="category"
                value={updateFormData.category}
                onChange={handleUpdateFormChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setIsUpdatePopupOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
