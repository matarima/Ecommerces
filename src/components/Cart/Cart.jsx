import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateCart, deleteCart } from "../../store/cartSlice";
import "./CartPage.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateCart({ _id: productId, quantity }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center">CART</h1>
      <div className="row">
        <div className="col-md-8">
          <h2>SHOPPING CART</h2>
          <table className="table">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id.$oid}>
                  <td>
                    <img
                      src={item.img1}
                      alt={item.name}
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{formatPrice(item.price.toLocaleString())} VND</td>
                  <td>
                    <div className="quantity-control">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => handleQuantityChange(item._id.$oid, item.quantity - 1)}
                      >-</button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        readOnly
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => handleQuantityChange(item._id.$oid, item.quantity + 1)}
                      >+</button>
                    </div>
                  </td>
                  <td>
                    {formatPrice(item.price * item.quantity).toLocaleString()}{" "}
                    VND
                  </td>
                  <td>
                    <button
                      className="btn btn-link"
                      onClick={() => handleRemove(item._id.$oid)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/shop" className="btn btn-outline-secondary">
            Continue shopping
          </Link>
        </div>
        <div className="col-md-4">
          <h2>CART TOTAL</h2>
          <div className="cart-total">
            <p>
              SUBTOTAL <span>{total.toLocaleString()} VND</span>
            </p>
            <p>
              TOTAL <span>{total.toLocaleString()} VND</span>
            </p>
            <input
              type="text"
              placeholder="Enter your coupon"
              className="form-control mb-3"
            />
            <button className="btn btn-dark btn-block mb-3">
              Apply coupon
            </button>
            <button className="btn btn-dark btn-block" onClick={handleCheckout}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
