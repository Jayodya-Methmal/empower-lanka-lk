import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import "./deleteProducts.scss";
import Swal from 'sweetalert2';

export const DeleteProduct = () => {
  const { currentUser } = useContext(AuthContext);
  const username = currentUser.username;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products for the current user
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/auth/getEntrProducts/${username}`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [username]);


  const handleDelete = async (productId) => {
    try {
      // Show a sweet alert to confirm the deletion
      const result = await Swal.fire({
        title: 'Confirmation',
        text: 'Do you want to unlist this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, unlist it!',
        cancelButtonText: 'Cancel'
      });
  
      if (result.isConfirmed) {
        // Delete the product with the given ID
        await axios.delete(`http://localhost:8800/api/auth/deleteProduct/${productId}`);
        // Remove the deleted product from the state
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  
        // Show a success sweet alert
        Swal.fire('Unlisted!', 'The product has been successfully unlisted.', 'success');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="unlist-products ">
    <h2>Your Listed Products</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Image</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.desc}</td>
            <td>{product.category}</td>
            <td>
              <img src={product.imageurl} alt="Product" width="100" height="100" />
            </td>
            <td> LKR {product.price}.00</td>
            <td>
              <button onClick={() => handleDelete(product.id)}>Unlist</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};
