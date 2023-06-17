import { useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useContext } from "react";

export const Payment = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all payment details
    const username = currentUser.username;
    axios
      .get(`http://localhost:8800/api/auth/getHiredConsultants/${username}`)

      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="Home">
      {users.map((user) => (
        <div className="request" key={user.paymemnt_id}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button className="connectBtn">Chat</button>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Email address : </span>
                <span className="data">{user.email}</span>
              </span>
              <span>
                <span className="label">Contact no : </span>
                <span className="data">{user.telephone}</span>
              </span>
              <span>
                <span className="label">Consultation Fee : </span>
                <span className="data">LKR {user.fee}</span>
              </span>
              <span>
                <span className="label">Paid : </span>
                <span className="data">{user.date}</span>
              </span>
              <span>
                <span className="label">Valid for : </span>
                <span className="data">One month</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
