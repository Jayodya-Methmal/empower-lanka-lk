import "./leftBar.scss";
import { NavLink } from "react-router-dom";
import ProfilePic from "../../assets/user.png";
import StartupReq from "../../assets/startup request 2.png";
import EntreReq from "../../assets/entrepreneur requests 1.png";
import SwitchReq from "../../assets/interaction.png";
import DistributorReq from "../../assets/distributor requests.png";
import ConsultantReq from "../../assets/consultant requests.png";
import Blog from "../../assets/blog.png";
import Consultant from "../../assets/consulting.png";
import Payment from "../../assets/credit-card.png";
import Entrepreneur from "../../assets/entrepreneur.png";
import ListProd from "../../assets/listProduct.png";
import OnGoing from "../../assets/tracking.png";
import OrdersRequests from "../../assets/received.png";

import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

export const LeftBarEntre = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={ProfilePic} alt="" />
            <NavLink activeClassName="active" to="/profile/:id">
              <span>{currentUser.name}</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={Blog} alt="" />
            <NavLink activeClassName="active" to="/blog">
              <span>Blog</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={Payment} alt="" />
            <NavLink activeClassName="active" to="/payment">
              <span>Hired</span>
            </NavLink>
          </div>
          <hr />
          <div className="item">
            <img src={Entrepreneur} alt="" />
            <NavLink activeClassName="active" to="/searchentrepreneur">
              <span>Entrepreneurs</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={Consultant} alt="" />
            <NavLink activeClassName="active" to="/searchconsultant">
              <span>Consultants</span>
            </NavLink>
          </div>
          <hr />
          <div className="item">
            <img src={ListProd} alt="" />
            <NavLink activeClassName="active" to="/listproducts">
            <span>List Products</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={ListProd} alt="" />
            <NavLink activeClassName="active" to="/deleteproducts">
            <span>Unlist Products</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LeftBarSEntre = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={ProfilePic} alt="" />
            <NavLink to="/profile/:id">
              <span>{currentUser.name}</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={Blog} alt="" />
            <NavLink activeClassName="active" to="/blog">
              <span>Blog</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={Payment} alt="" />
            <NavLink activeClassName="active" to="/payment">
              <span>Hired</span>
            </NavLink>
          </div>
          <hr />
          <div className="item">
            <img src={Entrepreneur} alt="" />
            <NavLink activeClassName="active" to="/searchentrepreneur">
              <span>Entrepreneurs</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={Consultant} alt="" />
            <NavLink activeClassName="active" to="/searchconsultant">
              <span>Consultants</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LeftBarConsultant = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={ProfilePic} alt="" />
            <NavLink activeClassName="active" to="/profile/:id">
              <span>{currentUser.name}</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={Consultant} alt="" />
            <NavLink activeClassName="active" to="/consultations">
              <span>Consultations</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={Blog} alt="" />
            <NavLink activeClassName="active" to="/blog">
              <span>Blog</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LeftBarDistributor = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={ProfilePic} alt="" />
            <NavLink activeClassName="active" to="/profile/:id">
              <span>{currentUser.name}</span>
            </NavLink>
          </div>

          <div className="item">
            <img src={OrdersRequests} alt="" />
            <span>Order Requests</span>
          </div>
          <div className="item">
            <img src={OnGoing} alt="" />
            <span>Ongoing Orders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LeftBarCustomer = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={ProfilePic} alt="" />
            <NavLink activeClassName="active" to="/profile/:id">
              <span>{currentUser.name}</span>
            </NavLink>
          </div>

          <div className="item">
            <img src={OrdersRequests} alt="" />
            <NavLink activeClassName="active" to="/ecommerce">
            <span>Browse catelog</span>
            </NavLink>
          </div>
          {/* <div className="item">
            <img src={OnGoing} alt="" />
            <span>Ongoing Orders</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export const LeftBarAdmin = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <img src={StartupReq} alt="" />
            <NavLink activeClassName="active" to="/admin/startup">
              <span>Startup Requests</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={EntreReq} alt="" />
            <NavLink activeClassName="active" to="/admin/entreprenure">
              <span>Entreprenure Requests</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={ConsultantReq} alt="" />
            <NavLink activeClassName="active" to="/admin/consultant">
              <span>Consultant Requests</span>
            </NavLink>
          </div>
          <div className="item">
            <img src={DistributorReq} alt="" />
            <NavLink activeClassName="active" to="/admin/distributor">
              <span>Distributor Requests</span>
            </NavLink>
          </div>
          <div></div>
          <div></div>
          <div className="item">
            <img src={SwitchReq} alt="" />
            <NavLink activeClassName="active" to="/admin/switchAC">
              <span>Switch Account Requests</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
