import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

function ProductList({ category }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  useEffect(() => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  }, [category, products]);

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <div className="product-list container mt-5">
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product._id.$oid} className="col-md-3 mb-4">
            <div className="card h-100 product-card" onClick={() => handleProductClick(product._id.$oid)}>
              <img src={product.img1} alt={product.name} className="card-img-top product-image" />
              <div className="card-body">
                <h5 >{product.name}</h5>
                <p className="card-text">{Number(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
