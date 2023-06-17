import "./profile.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import ProfilePic from "../../assets/user profile.png";
import BackgroundPic from "../../assets/background.jpg";

export const Profile = () => {
  const { currentUser, updateUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    name: currentUser.name,
    email: currentUser.email,
    paddress: currentUser.address,
    telephone: currentUser.telephone,
    category: "",
    businessName: "",
    regNo: "",
    address: "",
    description: "",
  });

  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [err, setErr] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  useEffect(() => {
    if (currentUser.roll === "startup") {
      axios
        .get(
          `http://localhost:8800/api/auth/getStartupDetails/${currentUser.username}`
        )
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
    if (currentUser.roll === "existing") {
      axios
        .get(
          `http://localhost:8800/api/auth/getEntreprenureDetails/${currentUser.username}`
        )
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
    if (currentUser.roll === "consultant") {
      axios
        .get(
          `http://localhost:8800/api/auth/getConsultantDetails/${currentUser.username}`
        )
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
    if (currentUser.roll === "distributor") {
      axios
        .get(
          `http://localhost:8800/api/auth/getDistributorDetails/${currentUser.username}`
        )
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  const userRoll = () => {
    if (currentUser.roll === "existing") {
      return "Entrepreneur";
    } else if (currentUser.roll === "consultant") {
      return "Consultant";
    } else if (currentUser.roll === "customer") {
      return "Customer";
    } else if (currentUser.roll === "startup") {
      return "Startup Entrepreneur";
    } else if (currentUser.roll === "distributor") {
      return "Distributor";
    }
  };

  const switchAcc = () => {
    setShowForm(true);
  };

  const handleForm = () => {
    setShowForm(false);
  };

  const handleProfilePic = () => {
    console.log("profile");
  };

  const resetInputs = () => {
    setInputs({
      name: "",
      email: "",
      paddress: "",
      telephone: "",
      category: "",
      businessName: "",
      regNo: "",
      address: "",
      description: "",
    });
  };

  const submitForm = async (e, username) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8800/api/auth/switchRequest/${username}`,
        inputs
      );
      resetInputs();
      setErr(
        "Successfully submitted. Please wait for the approval. It will takes 24 hours to process your data."
      );
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const handleUpdate = async (e, username) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8800/api/auth/updateProfile/${username}`,
        inputs
      );

      const updatedUser = {
        ...JSON.parse(localStorage.getItem("user")),
        name: inputs.name,
        email: inputs.email,
        address: inputs.paddress,
        telephone: inputs.telephone,
      };

      updateUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Details updated successfully");
      resetInputs();
    } catch (err) {
      console.log(err.response.data);
      setErr(err.response.data);
    }
  };

  return (
    <div className="profile">
      <div className="images">
        <img
          src={BackgroundPic}
          alt=""
          className="cover"
        />
        <img
          src={ProfilePic}
          alt=""
          className="profilePic"
          onClick={handleProfilePic}
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="center">
            <span className="userName">{currentUser.name}</span>
            <span className="userRoll">{userRoll()}</span>
            {currentUser.roll === "startup" && (
              <>
                <button onClick={switchAcc}>Switch to entreprenure</button>
                {showForm && (
                  <>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={inputs.category}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
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
                      {err && !isTyping && (
                        <span
                          className="error"
                          style={{
                            color:
                              err ===
                              "Successfully submitted. Please wait for the approval. It will takes 24 hours to process your data."
                                ? "rgb(0, 172, 95)"
                                : "red",
                          }}
                        >
                          {err}
                        </span>
                      )}
                      <div className="footerN">
                        <button
                          onClick={(e) => submitForm(e, currentUser.username)}
                        >
                          Submit
                        </button>
                        <span onClick={handleForm}>^</span>
                      </div>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="userDetails">
        <div className="PInfo">
          <form className="userForm">
            <h2>Personal Information</h2>
            <div className="usual">
              <div className="element">
                <span>Name </span>
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={currentUser.name}
                />
              </div>
              <div className="element">
                <span>Email </span>
                <input
                  type="text"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={currentUser.email}
                />
              </div>
              <div className="element">
                <span>Address </span>
                <input
                  type="text"
                  name="paddress"
                  value={inputs.paddress}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={currentUser.address}
                />
              </div>
              <div className="element">
                <span>Contact Number </span>
                <input
                  type="text"
                  name="telephone"
                  value={inputs.telephone}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={currentUser.telephone}
                />
              </div>

              {currentUser.roll === "customer" && (
                <div className="foot">
                  {err && !isTyping && <span className="error">{err}</span>}
                  <button
                    onClick={(e) => handleUpdate(e, currentUser.username)}
                  >
                    UPDATE
                  </button>
                </div>
              )}
            </div>
            <div className="extra">
              {users.map((user) => (
                <>
                  {currentUser.roll === "startup" && (
                    <>
                      <h2 className="moreDetails">Other Information</h2>
                      <div className="element">
                        <span>NIC </span>
                        <input type="text" placeholder={user.nic} readOnly />
                      </div>
                      <div className="element">
                        <span>Expected Business Category </span>
                        <input
                          type="text"
                          placeholder={user.category}
                          readOnly
                        />
                      </div>
                      <div className="element">
                        <span>Target Business Area </span>
                        <input
                          type="text"
                          placeholder={user.target_area}
                          readOnly
                        />
                      </div>
                    </>
                  )}
                  {currentUser.roll === "existing" && (
                    <>
                      <h2 className="moreDetails">Business Information</h2>
                      <div className="element">
                        <span>Business Category </span>
                        <input
                          type="text"
                          placeholder={user.category}
                          readOnly
                        />
                      </div>
                      <div className="element">
                        <span>Business Name </span>
                        <input
                          type="text"
                          placeholder={user.business_name}
                          readOnly
                        />
                      </div>
                      <div className="element">
                        <span>Registration Number </span>
                        <input type="text" placeholder={user.reg_no} readOnly />
                      </div>
                      <div className="element">
                        <span>Business Address </span>
                        <input
                          type="text"
                          placeholder={user.address}
                          readOnly
                        />
                      </div>
                      <div className="element">
                        <span>Description </span>
                        <textarea
                          type="text"
                          placeholder={user.description}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          name="description"
                          value={inputs.description}
                        />
                      </div>
                    </>
                  )}
                  {currentUser.roll === "consultant" && (
                    <>
                      <h2 className="moreDetails">Other Information</h2>
                      <div className="element">
                        <span>Education Qualifications </span>
                        <input
                          type="text"
                          placeholder={user.qualification}
                          readOnly
                        />
                      </div>
                      <div className="element">
                        <span>Institute </span>
                        <input
                          type="text"
                          placeholder={user.institute}
                          readOnly
                        />
                      </div>
                      <div className="element">
                        <span>Work Experiences </span>
                        <input
                          type="text"
                          placeholder={user.experiences}
                          readOnly
                        />
                      </div>
                      <div className="element">
                        <span>Consultation Fee </span>
                        <input type="text" placeholder={user.fee} readOnly />
                      </div>
                    </>
                  )}
                  {currentUser.roll === "distributor" && (
                    <>
                      <h2 className="moreDetails">Vehicle Information</h2>
                      <div className="element">
                        <span>Driving License No </span>
                        <input type="text" placeholder={user.drl_no} readOnly />
                      </div>
                      <div className="element">
                        <span>Vehicle Type </span>
                        <input
                          type="text"
                          placeholder={user.vehicle_type}
                          readOnly
                        />
                      </div>
                      <div className="element">
                        <span>Vehicle Number </span>
                        <input
                          type="text"
                          placeholder={user.vehicle_no}
                          readOnly
                        />
                      </div>
                      <div className="element">
                        <span>Description </span>
                        <textarea
                          type="text"
                          placeholder={user.description}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          name="description"
                          value={inputs.description}
                        />
                      </div>
                    </>
                  )}
                  <div className="foot">
                    {err && !isTyping && <span className="error">{err}</span>}
                    <button
                      onClick={(e) => handleUpdate(e, currentUser.username)}
                    >
                      UPDATE
                    </button>
                  </div>
                </>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
