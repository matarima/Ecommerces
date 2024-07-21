import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/cartSlice";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL =
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatDescription = (description) => {
    return description.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const handleAddToCart = () => {
    const item = {
      ...product,
      quantity,
      id: product._id.$oid,
    };
    dispatch(addCart(item));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        const products = response.data;

        const currentProduct = products.find(
          (product) => product._id.$oid === productId
        );
        setProduct(currentProduct);

        const relatedProducts = products.filter(
          (product) =>
            product.category === currentProduct.category &&
            product._id.$oid !== productId
        );
        setRelatedProducts(relatedProducts);
      } catch (error) {
        console.error("Error fetching the product data", error);
      }
    };

    fetchProducts();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.img1} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{formatPrice(product.price)} VND</p>
          <p>{formatDescription(product.short_desc)}</p>
          <div>
            <label>Category: </label>
            <span> {product.category}</span>
          </div>
          <div className="quantity-control">
            <label>Quantity: </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className="form-control"
            />
          </div>
          <button onClick={handleAddToCart} className="mt-3 btn btn-dark">Add to cart</button>
        </div>
      </div>
      <div className="description mt-5">
        <h3>Product Description</h3>
        <p>{formatDescription(product.long_desc)}</p>
      </div>
      <div className="related-products mt-5">
        <h3>Related Products</h3>
        <div className="row">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id.$oid} className="col-md-3">
              <div
                className="related-product-item"
                onClick={() => handleProductClick(relatedProduct._id.$oid)}
              >
                <img
                  src={relatedProduct.img1}
                  alt={relatedProduct.name}
                  className="img-fluid"
                />
                <p>{relatedProduct.name}</p>
                <p>{formatPrice(relatedProduct.price)} VND</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
