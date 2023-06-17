import React, { useState } from 'react';
import { useEffect } from "react";
import axios from "axios";
import "./ecom.scss";

const Ecom = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/auth/getProducts");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map(item => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });

      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setTotalValue(totalValue + product.price);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    calculateTotalValue(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalValue(0);
  };

  const changeQuantity = (itemId, quantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: quantity
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    calculateTotalValue(updatedCartItems);
  };

  const placeOrder = () => {
    const confirmed = window.confirm("Are you sure you want to proceed with the order?");
    console.log(cartItems);
    
    if (confirmed) {
      axios.post("http://localhost:8800/api/auth/placeOrder", { cartItems })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setCartItems([]);
      setTotalValue(0);
    }
  };

  const calculateTotalValue = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalValue(total);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="cart">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => changeQuantity(item.id, parseInt(e.target.value))}
                        min="1"
                      />
                    </td>
                    <td> LKR {item.price}.00</td>
                    <td>LKR {item.price * item.quantity}.00</td>
                    <td>
                      <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total Value: LKR {totalValue}.00</p>
            <button onClick={placeOrder}>Place Order</button>
            <button onClick={clearCart}>Clear All</button>
          </div>
        )}
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <div>
              <img src={product.imageurl} alt="" />
            </div>
            <p>Desc: {product.desc}</p>
            <p>Category: {product.category}</p>
            <p>Price: LKR {product.price}</p>
            <p>Stock Left: {product.quantity}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ecom;
