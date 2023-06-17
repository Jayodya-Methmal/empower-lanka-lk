import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./admin.scss";

export const UserRequests = () => {
  return (
    <div className="Home">
      <h2>User Registration Requests</h2>
    </div>
  );
};

export const StartupRequests = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    // Fetch all users with registration status = 0 from the backend API
    axios
      .get("http://localhost:8800/api/admins/getStartupRequests")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (username, email) => {
    // Update the user's registration status to 1
    Swal.fire({
      title: "Do you want to approve this request?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Approve",
      denyButtonText: `Don't Approve`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      axios
        .put(
          `http://localhost:8800/api/admins/approveRequests/${username}/${email}`
        )
        .then((res) => {
          console.log(res.data.message);
          // Remove the user from the list
          setUsers(users.filter((user) => user.username !== username));
        })
        .catch((err) => console.log(err));
      if (result.isConfirmed) {
        Swal.fire("Approved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Request is not approved", "", "info");
      }
    });
  };

  const handleDecline = (username, email) => {
    // Check if a comment has been entered
    if (!comments[username]) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a comment before declining the request.!",
      });
      return;
    }

    console.log(comments);

    // Add comment to the user's registration request
    axios
      .put(`http://localhost:8800/api/admins/declineRequests/${username}`, {
        email: email,
        comment: comments[username],
        username: username,
      })
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
        // Clear the comment for the user
        setComments({
          ...comments,
          [username]: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleCommentChange = (username, value) => {
    setComments({
      ...comments,
      [username]: value,
    });
  };

  return (
    <div className="Home">
      {users.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button
                  className="approveBtn"
                  onClick={() => handleApprove(user.username, user.email)}
                >
                  Approve
                </button>

                <button
                  className="declineBtn"
                  onClick={() => handleDecline(user.username, user.email)}
                >
                  Decline
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Contact No : </span>
                <span className="data">{user.telephone}</span>
              </span>
              <span>
                <span className="label">Email : </span>
                <span className="data">{user.email}</span>
              </span>
              <span>
                <span className="label">Address : </span>
                <span className="data">{user.address}</span>
              </span>
              <span>
                <span className="label">NIC : </span>
                <span className="data">{user.nic}</span>
              </span>
              <span>
                <span className="label">Category : </span>
                <span className="data">{user.category}</span>
              </span>
              <span>
                <span className="label">Target Area : </span>
                <span className="data">{user.target_area}</span>
              </span>
            </div>
            <form>
              <input
                className="comment"
                type="text"
                placeholder="put a comment"
                value={comments[user.username] || ""}
                onChange={(e) =>
                  handleCommentChange(user.username, e.target.value)
                }
              ></input>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EntreprenureRequests = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    // Fetch all users with registration status = 0 from the backend API
    axios
      .get("http://localhost:8800/api/admins/getEntreprenureRequests")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (username, reg_no, email) => {
    // Update the user's registration status to 1
    Swal.fire({
      title: "Do you want to approve this request?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Approve",
      denyButtonText: `Don't Approve`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      axios
        .put(
          `http://localhost:8800/api/admins/approveRequests/${username}/${reg_no}/${email}`
        )
        .then((res) => {
          console.log(reg_no);
          console.log(res.data.message);
          // Remove the user from the list
          setUsers(users.filter((user) => user.username !== username));
        })
        .catch((err) => console.log(err));
      if (result.isConfirmed) {
        Swal.fire("Approved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Request is not approved", "", "info");
      }
    });
    console.log(email);
  };

  const handleDecline = (username, email) => {
    // Check if a comment has been entered
    if (!comments[username]) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a comment before declining the request.!",
      });
      return;
    }
    // Add comment to the user's registration request
    axios
      .put(`http://localhost:8800/api/admins/declineRequests/${username}`, {
        email: email,
        comment: comments[username],
        username: username,
      })
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
        // Clear the comment for the user
        setComments({
          ...comments,
          [username]: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleCommentChange = (username, value) => {
    setComments({
      ...comments,
      [username]: value,
    });
  };

  return (
    <div className="Home">
      {users.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button
                  className="approveBtn"
                  onClick={() =>
                    handleApprove(user.username, user.reg_no, user.email)
                  }
                >
                  Approve
                </button>
                <button
                  className="declineBtn"
                  onClick={() => handleDecline(user.username, user.email)}
                >
                  Decline
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Contact No : </span>
                <span className="data">{user.telephone}</span>
              </span>
              <span>
                <span className="label">Email : </span>
                <span className="data">{user.email}</span>
              </span>
              <span>
                <span className="label">Personal Address : </span>
                <span className="data">{user.pddress}</span>
              </span>
              <span>
                <span className="label">Category : </span>
                <span className="data">{user.category}</span>
              </span>
              <span>
                <span className="label">Business Name : </span>
                <span className="data">{user.business_name}</span>
              </span>
              <span>
                <span className="label">Business Address : </span>
                <span className="data">{user.address}</span>
              </span>
              <span>
                <span className="label">Business Registration No : </span>
                <span className="data">{user.reg_no}</span>
              </span>
            </div>
            <form>
              <input
                className="comment"
                type="text"
                placeholder="put a comment"
                value={comments[user.username] || ""}
                onChange={(e) =>
                  handleCommentChange(user.username, e.target.value)
                }
              ></input>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ConsultantRequests = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    // Fetch all users with registration status = 0 from the backend API
    axios
      .get("http://localhost:8800/api/admins/getConsultantRequests")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (username, email) => {
    // Update the user's registration status to 1
    Swal.fire({
      title: "Do you want to approve this request?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Approve",
      denyButtonText: `Don't Approve`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:8800/api/admins/approveRequests/${username}/${email}`
          )
          .then((res) => {
            console.log(res.data.message);
            // Remove the user from the list
            setUsers(users.filter((user) => user.username !== username));
          })
          .catch((err) => console.log(err));
        Swal.fire("Approved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Request is not approved", "", "info");
      }
    });
  };

  const handleDecline = (username, email) => {
    // Check if a comment has been entered
    if (!comments[username]) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a comment before declining the request.!",
      });
      return;
    }

    // Add comment to the user's registration request
    axios
      .put(`http://localhost:8800/api/admins/declineRequests/${username}`, {
        email: email,
        comment: comments[username],
        username: username,
      })
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
        // Clear the comment for the user
        setComments({
          ...comments,
          [username]: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleCommentChange = (username, value) => {
    setComments({
      ...comments,
      [username]: value,
    });
  };

  return (
    <div className="Home">
      {users.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button
                  className="approveBtn"
                  onClick={() => handleApprove(user.username, user.email)}
                >
                  Approve
                </button>
                <button
                  className="declineBtn"
                  onClick={() => handleDecline(user.username, user.email)}
                >
                  Decline
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Contact No : </span>
                <span className="data">{user.telephone}</span>
              </span>
              <span>
                <span className="label">Email : </span>
                <span className="data">{user.email}</span>
              </span>
              <span>
                <span className="label">Address : </span>
                <span className="data">{user.address}</span>
              </span>
              <span>
                <span className="label">Qualifications : </span>
                <span className="data">{user.qualification}</span>
              </span>
              <span>
                <span className="label">Institute : </span>
                <span className="data">{user.institute}</span>
              </span>
              <span>
                <span className="label">Experiences : </span>
                <span className="data">{user.experiences}</span>
              </span>
              <span>
                <span className="label">Consultation Fee Per Session : </span>
                <span className="data">{user.fee}</span>
              </span>
            </div>
            <form>
              <input
                className="comment"
                type="text"
                placeholder="put a comment"
                value={comments[user.username] || ""}
                onChange={(e) =>
                  handleCommentChange(user.username, e.target.value)
                }
              ></input>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DistributorRequests = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    // Fetch all users with registration status = 0 from the backend API
    axios
      .get("http://localhost:8800/api/admins/getDistributorRequests")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (username, email) => {
    // Update the user's registration status to 1
    Swal.fire({
      title: "Do you want to approve this request?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Approve",
      denyButtonText: `Don't Approve`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:8800/api/admins/approveRequests/${username}/${email}`
          )
          .then((res) => {
            console.log(res.data.message);
            // Remove the user from the list
            setUsers(users.filter((user) => user.username !== username));
          })
          .catch((err) => console.log(err));
        Swal.fire("Approved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Request is not approved", "", "info");
      }
    });
  };

  const handleDecline = (username, email) => {
    // Check if a comment has been entered
    if (!comments[username]) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a comment before declining the request.!",
      });
      return;
    }

    // Add a comment to the user's registration request
    axios
      .put(`http://localhost:8800/api/admins/declineRequests/${username}`, {
        email: email,
        comment: comments[username],
        username: username,
      })
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
        // Clear the comment for the user
        setComments({
          ...comments,
          [username]: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleCommentChange = (username, value) => {
    setComments({
      ...comments,
      [username]: value,
    });
  };

  return (
    <div className="Home">
      {users.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button
                  className="approveBtn"
                  onClick={() => handleApprove(user.username, user.email)}
                >
                  Approve
                </button>
                <button
                  className="declineBtn"
                  onClick={() => handleDecline(user.username, user.email)}
                >
                  Decline
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Contact No : </span>
                <span className="data">{user.telephone}</span>
              </span>
              <span>
                <span className="label">Email : </span>
                <span className="data">{user.email}</span>
              </span>
              <span>
                <span className="label">Address : </span>
                <span className="data">{user.address}</span>
              </span>
              <span>
                <span className="label">Driving License No : </span>
                <span className="data">{user.drl_no}</span>
              </span>
              <span>
                <span className="label">Type of the Vehicle : </span>
                <span className="data">{user.vehicle_type}</span>
              </span>
              <span>
                <span className="label">Vehicle No : </span>
                <span className="data">{user.vehicle_no}</span>
              </span>
            </div>
            <form>
              <input
                className="comment"
                type="text"
                placeholder="put a comment"
                value={comments[user.username] || ""}
                onChange={(e) =>
                  handleCommentChange(user.username, e.target.value)
                }
              ></input>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SwitchAccountRequests = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    // Fetch all users with registration status = 0 from the backend API
    axios
      .get("http://localhost:8800/api/admins/getSwitchRequests")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (
    username,
    category,
    business_name,
    address,
    reg_no,
    email
  ) => {
    // Update the user's registration status to 1
    Swal.fire({
      title: "Do you want to approve this request?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Approve",
      denyButtonText: `Don't Approve`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:8800/api/admins/approveSwitchRequests/${username}/${category}/${business_name}/${address}/${reg_no}/${email}`
          )
          .then((res) => {
            console.log(reg_no);
            console.log(res.data.message);
            // Remove the user from the list
            setUsers(users.filter((user) => user.username !== username));

            localStorage.removeItem("user");
          })
          .catch((err) => console.log(err));
        Swal.fire("Approved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Request is not approved", "", "info");
      }
    });
  };

  const handleDecline = (username, email) => {
    // Check if a comment has been entered
    if (!comments[username]) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a comment before declining the request.!",
      });
      return;
    }
    // Add comment to the user's registration request
    axios
      .put(
        `http://localhost:8800/api/admins/declineSwitchRequests/${username}`,
        {
          email: email,
          comment: comments[username],
          username: username,
        }
      )
      .then((res) => {
        console.log(res.data.message);
        // Remove the user from the list
        setUsers(users.filter((user) => user.username !== username));
        // Clear the comment for the user
        setComments({
          ...comments,
          [username]: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleCommentChange = (username, value) => {
    setComments({
      ...comments,
      [username]: value,
    });
  };

  return (
    <div className="Home">
      {users.map((user) => (
        <div className="request" key={user.username}>
          <div className="container">
            <div className="top">
              <h2 className="left">{user.name}</h2>
              <div className="right">
                <button
                  className="approveBtn"
                  onClick={() =>
                    handleApprove(
                      user.username,
                      user.category,
                      user.business_name,
                      user.address,
                      user.reg_no,
                      user.email
                    )
                  }
                >
                  Approve
                </button>
                <button
                  className="declineBtn"
                  onClick={() => handleDecline(user.username, user.email)}
                >
                  Decline
                </button>
              </div>
            </div>
            <hr />
            <div className="content">
              <span>
                <span className="label">Name : </span>
                <span className="data">{user.name}</span>
              </span>
              {/* <span>
                <span className="label">Email : </span>
                <span className="data">{user.email}</span>
              </span>
              <span>
                <span className="label">Personal Address : </span>
                <span className="data">{user.pddress}</span>
              </span> */}
              <span>
                <span className="label">Category : </span>
                <span className="data">{user.category}</span>
              </span>
              <span>
                <span className="label">Business Name : </span>
                <span className="data">{user.business_name}</span>
              </span>
              <span>
                <span className="label">Business Address : </span>
                <span className="data">{user.address}</span>
              </span>
              <span>
                <span className="label">Business Registration No : </span>
                <span className="data">{user.reg_no}</span>
              </span>
            </div>
            <form>
              <input
                className="comment"
                type="text"
                placeholder="put a comment"
                value={comments[user.username] || ""}
                onChange={(e) =>
                  handleCommentChange(user.username, e.target.value)
                }
              ></input>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};
