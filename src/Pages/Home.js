import React, { useEffect, useState } from "react";
import slide1 from "../Images/Slide.jpg";
import slide2 from "../Images/Slide11.jpg";
import slide3 from "../Images/Slide13.jpg";
import zomato from "../Images/Smartphone.png";
import swiggy from "../Images/Book.jpg";
import starbucks from "../Images/cloth.png";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Home.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCategorySelect = () => {
    navigate(`/products?category=${selectedCategory}`);
  };

  return (
    <div className="home">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={slide2} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <Link to="/products">
                    <button className="button1">GO TO PRODUCTS 🍵</button>
                  </Link>
                </div>
              </div>
              <div className="carousel-item">
                <img src={slide1} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <Link to="/products">
                    <button className="button1">GO TO PRODUCTS 🍵</button>
                  </Link>
                </div>
              </div>
              <div className="carousel-item">
                <img src={slide3} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <Link to="/products">
                    <button className="button1">GO TO PRODUCTS 🍵</button>
                  </Link>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="container">
            <h5 className="section-title h1">TODAY'S OFFERS !!!!!!!!!!!!!!</h5>
            <div className="row">
              {/* Team member */}
              <div className="card1 col-xs-12  col-md-4">
                <div
                  className="image-flip"
                  ontouchstart="this.classList.toggle('hover');"
                >
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card-offer">
                        <div className="card-body text-center">
                          <p>
                            <img
                              className=" img-fluid"
                              src={zomato}
                              alt="card image"
                            />
                          </p>
                          <h4 className="card-title">Flat 50% OFF</h4>
                          <p className="card-text">
                          Upgrade your tech game with our incredible deals on the latest electronics and smartphones. Whether you're looking for the newest gadgets or planning to gift someone special, we've got you covered with unbeatable prices and exclusive discounts.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="backside">
                      <div className="card-offer">
                        <div className="card-body text-center mt-4">
                          <h4 className="card-title">SMARTPHONES</h4>
                          <p className="card-text">
                          Smartphones: Get the latest models from top brands like Apple, Samsung, Google, and more at up to 50% off. Whether you want the newest iPhone or the latest Samsung Galaxy, now is the perfect time to upgrade.
Laptops and Tablets: From high-performance laptops for work and gaming to versatile tablets for entertainment and productivity, find the perfect device at a fraction of the cost.
                          </p>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-facebook" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-twitter" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-skype" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-google" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ./Team member */}
              <div className="card2 col-xs-12  col-md-4">
                <div
                  className="image-flip"
                  ontouchstart="this.classList.toggle('hover');"
                >
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card-offer">
                        <div className="card-body text-center">
                          <p>
                            <img
                              className=" img-fluid"
                              src={swiggy}
                              alt="card image"
                            />
                          </p>
                          <h4 className="card-title">Flat 30% OFF</h4>
                          <p className="card-text">
                          Dive into the world of literature with our amazing discounts on a wide selection of books. Whether you're a voracious reader or just looking for the perfect gift, our bookstore has something for everyone. Enjoy incredible savings on bestsellers, classics, and more.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="backside">
                      <div className="card-offer">
                        <div className="card-body text-center mt-4">
                          <h4 className="card-title">BOOKS</h4>
                          <p className="card-text">
                          Bestsellers: Get your hands on the latest bestsellers at up to 40% off. From gripping thrillers to heartwarming romances, find your next favorite read at a fantastic price.
                          Classics: Rediscover timeless classics with significant discounts. Whether it's Jane Austen, Mark Twain, or George Orwell, now is the perfect time to add these essential reads to your collection.
                          </p>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-facebook" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-twitter" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-skype" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-google" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Team member */}
              <div className="card3 col-xs-12  col-md-4">
                <div
                  className="image-flip"
                  ontouchstart="this.classList.toggle('hover');"
                >
                  <div className="mainflip">
                    <div className="frontside">
                      <div className="card-offer">
                        <div className="card-body text-center">
                          <p>
                            <img
                              className=" img-fluid"
                              src={starbucks}
                              alt="card image"
                            />
                          </p>
                          <h4 className="card-title">Flat 12% OFF</h4>
                          <p className="card-text">
                          Revamp your wardrobe with our incredible discounts on a wide range of clothing. Whether you're looking for the latest trends or timeless classics, our fashion sale has something for everyone. Enjoy amazing savings on stylish and high-quality apparel.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="backside">
                      <div className="card-offer">
                        <div className="card-body text-center mt-4">
                          <h4 className="card-title">CLOTHING</h4>
                          <p className="card-text">
                          Men's Clothing: Discover great deals on men's fashion, including shirts, trousers, jackets, and more. Stay stylish and comfortable with up to 60% off on top brands.
                          Women's Clothing: Upgrade your wardrobe with elegant dresses, chic tops, trendy jeans, and more. Find the perfect outfit for any occasion at unbeatable prices.
                          </p>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-facebook" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-twitter" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-skype" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                className="social-icon text-xs-center"
                                target="_blank"
                                href="#"
                              >
                                <i className="fa fa-google" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      )}
    </div>
  );
};

export default Home;
