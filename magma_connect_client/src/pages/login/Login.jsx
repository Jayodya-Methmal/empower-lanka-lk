import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [err, setErr] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

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

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Connect, Learn, Succeed</h1>
          <p>A Web Platform for Small Business Owners in Sri Lanka.</p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {err && !isTyping && <span className="error">{err}</span>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
