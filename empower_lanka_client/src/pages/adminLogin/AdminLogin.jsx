import React from 'react'
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthAdminContext } from '../../context/authAdminContext';
import "./adminLogin.scss";

const AdminLogin = () => {

    const [inputs, setInputs] = useState({
        username:"",
        password:""
      });
    
      const navigate = useNavigate()
    
      const [err, setErr] = useState(null);
      const [isTyping, setIsTyping] = useState(false);
    
      const handleChange = e => {
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
      };
      
      const handleFocus = () => {
        setIsTyping(true);
        setErr(null);
      }
    
      const handleBlur = () => {
        setIsTyping(false);
      }
    
      const { adminLogin } = useContext(AuthAdminContext);
    
      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await adminLogin(inputs);
          navigate("/admin")
        } catch (error) {
          setErr(error.message);
        }
      };

  return (
    <div className="admininlogin">
    <div className="card">
      <div className="left">
        <h1>Welcome to Empower Lanka's admin panel. <br />  </h1>
        <p>
        Please log in to access your account and begin managing the site.<br />
          Unauthorized Access Is Strictly Prohibited!
        </p>
      </div>
      <div className="right">
        <h1>Login</h1>
        <form>
          <input type="text" placeholder="Username" name="username" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          <input type="password" placeholder="Password" name="password" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          {err && !isTyping && <span className='error'>{err}</span>}
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default AdminLogin