import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Swal from "sweetalert2";
import "./search.scss";

export const Entrepreneur = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [connectedUsersRes, usersRes] = await Promise.all([
          axios.get(
            `http://localhost:8800/api/auth/getConnectedUsers/${currentUser.username}`
          ),
          axios.get("http://localhost:8800/api/auth/getEntreprenures"),
        ]);

        const connectedUsersData = connectedUsersRes.data;
        const usersData = usersRes.data.filter(
          (user) => user.username !== currentUser.username
        );

        console.log("Connected Users:", connectedUsersData);
        console.log("Users:", usersData);

        setConnectedUsers(connectedUsersData);
        setUsers(usersData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, [currentUser.username]);

  const handleConnect = async (e, username, currentUsername) => {
    e.preventDefault();

    // Display confirmation dialog using SweetAlert2
    Swal.fire({
      title: "Do you want to connect?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(
            `http://localhost:8800/api/auth/connectEntr/${username}/${currentUsername}`
          );
          Swal.fire("Successfully connected!", "", "success");
          console.log("Successfully added to database.");
          window.location.reload();
        } catch (err) {
          Swal.fire("Error", `${err}`, "error");
          console.error("Error:", err);
        }
      } else if (result.isDenied) {
        Swal.fire("Connection canceled", "", "info");
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const business_name = user.business_name.toLowerCase();
    const category = user.category.toLowerCase();
    const address = user.address.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      business_name.includes(lowerSearchTerm) ||
      category.includes(lowerSearchTerm) ||
      address.includes(lowerSearchTerm)
    );
  });

  return (
    <div className="Home">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search by business category, name, or address "
          onChange={handleSearch}
        />
      </div>
      {filteredUsers.map((user) => {
        const isConnected = connectedUsers.some(
          (connectedUser) => connectedUser.entre1 === user.username
        );

        return (
          <div className="request" key={user.username}>
            <div className="container">
              <div className="top">
                <h2 className="left">{user.business_name}</h2>
                <div className="right">
                  {isConnected ? (
                    <button className="connectBtn connected" disabled>
                      Connected
                    </button>
                  ) : (
                    <button
                      className="connectBtn"
                      onClick={(e) =>
                        handleConnect(e, user.username, currentUser.username)
                      }
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
              <hr />
              <div className="content">
                <span>
                  <span className="label">Business Name : </span>
                  <span className="data">{user.business_name}</span>
                </span>
                <span>
                  <span className="label">Category : </span>
                  <span className="data">{user.category}</span>
                </span>
                <span>
                  <span className="label">Address : </span>
                  <span className="data">{user.address}</span>
                </span>
                <span>
                  <span className="label">Description : </span>
                  <span className="data">{user.description}</span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Consultant = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [hiredConsultants, setHiredConsultants] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users with registration status = 1 from the backend API
    axios
      .get("http://localhost:8800/api/auth/getConsultants")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  
    // Fetch hired consultants
    axios
    .get(`http://localhost:8800/api/auth/getPaidConsultants/${currentUser.username}`)
    .then((res) => {
      const hiredConsultants = res.data.map((item) => item.const_id);
      setHiredConsultants(hiredConsultants);
    })
    .catch((err) => console.log(err));
  }, []);
  
  

  const handleToken = async (token, user) => {
    try {
      const amount = user.fee;
      const username = currentUser.username;
      const const_id = user.username;
      const { name, description } = user;

      await axios.post("http://localhost:8800/api/auth/consultationPayment", {
        token,
        amount,
        name,
        username,
        const_id,
        description,
      });

      console.log("Payment success");
    } catch (err) {
      alert( err );
      console.log(err);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const name = user.name.toLowerCase();
    const fee = user.fee;
    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      name.includes(lowerSearchTerm) || fee.toString().includes(lowerSearchTerm)
    );
  });

  return (
    <div className="Home">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search by consultant name, or consultant fee"
          onChange={handleSearch}
        />
      </div>
      {filteredUsers.map((user) => {
        const isHired = hiredConsultants.includes(user.username); // Check if the user is a hired consultant
        
        return (
          <div className="request" key={user.username}>
            <div className="container">
              <div className="top">
                <h2 className="left">{user.name}</h2>
                <div className="right">
                  {isHired ? (
                    <button className="btnHired" type="button" disabled>
                      Hired
                    </button>
                  ) : (
                    <StripeCheckout
                      locale="en"
                      className="hireBtn"
                      stripeKey="pk_test_51MjHDhIEmwpzpx2CznjamGPiR01TA7FIV9TJyvlDFMPLMcwJvpZLTeU0YX3uknfaJ16v6Yzr7pABzqY1WeIAIS4g007Do8qbJI"
                      amount={user.fee * 100}
                      currency="LKR"
                      name={user.name}
                      description={`Pay LKR ${user.fee}`}
                      token={(token) => handleToken(token, user)}
                    >
                      <button className="btnHire" type="button">
                        Hire
                      </button>
                    </StripeCheckout>
                  )}
                </div>
              </div>
              <hr />
              <div className="content">
                <span>
                  <span className="label">Qualifications : </span>
                  <span className="data">{user.qualification}</span>
                </span>
                <span>
                  <span className="label">Consultation Fee Per Session : </span>
                  <span className="data">LKR</span>
                  <span className="data">{user.fee}</span>
                </span>
                <span>
                  <span className="label">Institute : </span>
                  <span className="data">{user.institute}</span>
                </span>
                <span>
                  <span className="label">Experiences : </span>
                  <span className="data">{user.experiences}</span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  
};
