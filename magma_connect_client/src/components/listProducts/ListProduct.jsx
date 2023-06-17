import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import Swal from "sweetalert2";
import "./listProduct.scss"
export const ListProduct = () => {
  const [inputs, setInputs] = useState({
    name: "",
    desc: "",
    category: "",
    imageurl: '',
    price: "",
    quantity:"",
    // image: null,
  });


  const resetInputs = () => {
    setInputs({
      name: '',
      desc: '',
      category: '',
      imageurl: '',
      price: "",
      quantity:"",
    // image: null,
    });
  };

  const { currentUser } = useContext(AuthContext);
  const username = currentUser.username;

  const handleInputChange = (e) => {
    if (e.target.type === 'file') {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/api/auth/listproduct/${username}`,inputs);
      resetInputs();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product/Service added successfully',
      });
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessages = Array.isArray(err.response.data) ? err.response.data : [err.response.data];
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessages.join("\n"),
        });
      } else {
        console.log(err);
      }
    }
  };
  

  return (
    <div className="form-wrapper">
      <h2>Add New Product or Service</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={inputs.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing & Accessories</option>
            <option value="beauty">Home & Kitchen</option>
            <option value="Beauty & Personal Care">Beauty & Personal Care</option>
            <option value="Sports & Fitness">Sports & Fitness</option>
            <option value="Books & Stationery">Books & Stationery</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Automotive">Automotive</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="desc"
            rows="5"
            value={inputs.desc}
            onChange={handleInputChange}
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="imageurl">ImageUrl:</label>
          <input
            type="text"
            id="imageurl"
            name="imageurl"
            value={inputs.imageurl}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={inputs.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name"> Product Quantity : </label>
          <input
            type="number"
            id="quantitity"
            name="quantity"
            value={inputs.quantity}
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="image">Product/Service Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
        </div> */}
        <button type="submit">Add Product/Service</button>
      </form>
    </div>
  );
};
