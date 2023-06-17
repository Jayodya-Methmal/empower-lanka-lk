import express from "express";
import {
  login,
  checkConnectEntr,
  connectEntr,
  register,
  logout,
  switchRequest,
  updateProfile,
  getHiredConsultants,
  getStartupDetails,
  getDistributorDetails,
  getEntreprenureDetails,
  getConsultantDetails,
  adminLogin,
  consultationPayment,
  getEntreprenures,
  getConsultants,
  getConsultations,
  getConnectedUsers,
  listProducts,
  getProducts,
  verify,
  getPaidConsultants,
  getEntrProducts,
  deleteProduct,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/adminlogin", adminLogin);
router.post("/consultationPayment", consultationPayment);
router.post("/listProduct/:username", listProducts);
router.get("/getEntreprenures", getEntreprenures);
router.get("/getConsultants", getConsultants);
router.get("/getConsultations", getConsultations);
router.get("/getStartupDetails/:username", getStartupDetails);
router.get("/getEntreprenureDetails/:username", getEntreprenureDetails);
router.get("/getConsultantDetails/:username", getConsultantDetails);
router.get("/getDistributorDetails/:username", getDistributorDetails);
router.post("/switchRequest/:username", switchRequest);
router.post("/updateProfile/:username", updateProfile);
router.post("/connectEntr/:username/:currentUsername", connectEntr);
router.post("/checkConnectEntr/:username/:currentUsername", checkConnectEntr);
router.get("/getHiredConsultants/:username", getHiredConsultants);
router.get("/getConnectedUsers/:username", getConnectedUsers);
router.get("/getProducts", getProducts);
router.post("/verify", verify);
router.get("/getPaidConsultants/:username", getPaidConsultants);

router.delete("/deleteProduct/:productId", deleteProduct);
router.get("/getEntrProducts/:username", getEntrProducts);

export default router;
