import { Payment } from "../../components/payment/payment";
import { Entrepreneur, Consultant } from "../../components/search/entrepreneur";
import { GetCustomers } from "../../components/search/consultant";
import { ListProduct } from "../../components/listProducts/ListProduct";
import { DeleteProduct } from "../../components/deleteProducts/DeleteProducts";

import {
  UserRequests,
  StartupRequests,
  EntreprenureRequests,
  ConsultantRequests,
  DistributorRequests,
  SwitchAccountRequests,
} from "../../components/admin/admin";
import "./home.scss";

export const Home = () => {
  return (
    <div className="home">
      <div className="welcome-page">
      <h1 className="welcome-heading">
        <span className="welcome-text">Welcome back, user!</span>
      </h1>
      <p className="platform-description">
         Simply click on the left bar menu to get started.
      </p>
    </div>
    </div>
  );
};

export const SearchEntrepreneur = () => {
  return (
    <div className="home">
      <Entrepreneur />
    </div>
  );
};

export const Consultations = () => {
  return (
    <div className="home">
      <GetCustomers />
    </div>
  );
};

export const PaymentP = () => {
  return (
    <div className="home">
      <Payment />
    </div>
  );
};

export const SearchConsultant = () => {
  return (
    <div className="home">
      <Consultant />
    </div>
  );
};

export const UserReq = () => {
  return (
    <div className="home">
      <UserRequests />
    </div>
  );
};

export const StartupReq = () => {
  return (
    <div className="home">
      <StartupRequests />
    </div>
  );
};

export const EntrepreneurReq = () => {
  return (
    <div className="home">
      <EntreprenureRequests />
    </div>
  );
};

export const ConsultantReq = () => {
  return (
    <div className="home">
      <ConsultantRequests />
    </div>
  );
};

export const DistributorReq = () => {
  return (
    <div className="home">
      <DistributorRequests />
    </div>
  );
};

export const SwitchReq = () => {
  return (
    <div className="home">
      <SwitchAccountRequests />
    </div>
  );
};


export const ListProducts = () => {
  return (
    <div className="home">
      <ListProduct />
    </div>
  );
};


export const DeleteProducts = () => {
  return (
    <div className="home">
    <DeleteProduct/>
  </div>
  );
}
