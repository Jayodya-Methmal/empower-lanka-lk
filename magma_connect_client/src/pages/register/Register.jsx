import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    telephone: "",
    name: "",
    Paddress: "",
    roll: "",
    nic: "",
    category: "",
    businessName: "",
    regNo: "",
    address: "",
    qualification: "",
    consultationFee: "",
    driveLicNo: "",
    vehicleType: "",
    vehicleNo: "",
    ex_category: "",
    area: "",
    institute: "",
    experiences: "",
  });

  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = () => {
    setIsTyping(true);
    setErr(null);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  const resetInputs = () => {
    setInputs({
      username: "",
      email: "",
      password: "",
      telephone: "",
      Paddress: "",
      name: "",
      roll: "",
      nic: "",
      category: "",
      businessName: "",
      regNo: "",
      address: "",
      qualification: "",
      consultationFee: "",
      driveLicNo: "",
      vehicleType: "",
      vehicleNo: "",
      ex_category: "",
      area: "",
      institute: "",
      experiences: "",
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
  
      Swal.fire({
        title: "Enter your verification code that you received via email",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Verify",
        showLoaderOnConfirm: true,
        preConfirm: async (code) => {
          try {
            const response = await axios.post(
              "http://localhost:8800/api/auth/verify",
              {
                username: inputs.username,
                code: code,
              }
            );
  
            if (response.data.message === "User has been approved.") {
              Swal.fire({
                title: "Verification Successful",
                text: response.data.message,
                icon: "success",
              });
              if (inputs.roll === "customer") {
                navigate("/login");
              } else {
                setErr(
                  "Successfully submitted. Please wait for the approval. It will take 24 hours to process your data."
                );
              }
            } else {
              Swal.fire({
                title: "Verification Failed",
                text: "Your email verified successfully.",
                icon: "error",
              });
            }
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: false, // Disable outside click to close the dialog
      });
      resetInputs();
    } catch (err) {
      setErr(err.response.data);
    }
  };
  

  console.log(err);

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setInputs((prev) => ({ ...prev, roll: role }));
    setShowAdditionalFields(true);
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Empower Lanka.</h1>
          <p>
            We are an international corporation that takes on regional
            initiatives and aids in the expansion of your business through
            reliable communities and networks.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <select
              name="roll"
              value={inputs.roll}
              onChange={handleRoleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="startup">Startup Entrepreneur</option>
              <option value="existing">Existing Entrepreneur</option>
              <option value="distributor">Distributor</option>
              <option value="consultant">Consultant</option>
            </select>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="text"
              placeholder="Contact Number"
              name="telephone"
              value={inputs.telephone}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <input
              type="text"
              placeholder="Personal Address"
              name="Paddress"
              value={inputs.Paddress}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            {showAdditionalFields && inputs.roll === "existing" && (
              <>
                <div>
                  <select
                    name="category"
                    value={inputs.category}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Apperal">Apperal</option>
                    <option value="stationary">stationary</option>
                    <option value="export">Export</option>
                    <option value="import">Import</option>
                    <option value="import">Buty</option>
                    <option value="">other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="category"
                    value={inputs.category}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Business Name"
                  name="businessName"
                  value={inputs.businessName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  placeholder="Registration Number"
                  name="regNo"
                  value={inputs.regNo}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  placeholder="Business Address"
                  name="address"
                  value={inputs.address}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </>
            )}

            {showAdditionalFields && inputs.roll === "startup" && (
              <>
                <input
                  type="text"
                  placeholder="NIC"
                  name="nic"
                  value={inputs.nic}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div>
                  <select
                    name="ex_category"
                    value={inputs.ex_category}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option value="">Select Business category</option>
                    <option value="Food">Food</option>
                    <option value="Apperal">Apperal</option>
                    <option value="stationary">stationary</option>
                    <option value="export">export</option>
                    <option value="import">import</option>
                    <option value="">other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="ex_category"
                    value={inputs.ex_category}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Target area (ex: Colombo West)"
                  name="area"
                  value={inputs.area}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </>
            )}
            {showAdditionalFields && inputs.roll === "distributor" && (
              <>
                <input
                  type="text"
                  placeholder="Driving Licenese No"
                  name="driveLicNo"
                  value={inputs.driveLicNo}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  placeholder="VehicleT ype"
                  name="vehicleType"
                  value={inputs.vehicleType}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  placeholder="Vehicle No"
                  value={inputs.vehicleNo}
                  name="vehicleNo"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </>
            )}
            {showAdditionalFields && inputs.roll === "consultant" && (
              <>
                <input
                  type="text"
                  placeholder="Highest Education Qualification (min: dip in relevent field)"
                  name="qualification"
                  value={inputs.qualification}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  placeholder="Institute"
                  name="institute"
                  value={inputs.institute}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <textarea
                  type="text"
                  placeholder="Work experiences (Company, title and duration)"
                  name="experiences"
                  value={inputs.experiences}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  placeholder="Consultation Fee Per Session (LKR)"
                  name="consultationFee"
                  value={inputs.consultationFee}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </>
            )}

            {err && !isTyping && (
              <span
                className="error"
                style={{
                  color:
                    err ===
                    "Successfully submitted. Please wait for the approval. It will takes 24 hours to process your data"
                      ? "rgb(0, 172, 95)"
                      : "red",
                }}
              >
                {err}
              </span>
            )}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
