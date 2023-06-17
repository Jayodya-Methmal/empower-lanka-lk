import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import {
  registerValidation,
  switchValidation,
  updateValidation,
  validateValues,
} from "./validation.js";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cd258f01e65898",
    pass: "47e7f4c95fa55d",
  },
});

function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

function sendConfirmationEmail(userEmail, code) {
  const mailOptions = {
    from: "empowerlanka@gmail.com",
    to: userEmail,
    subject: "Verify your email address",
    html: `
      <html>
        <head>
          <style>
            body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              text-align: center;
              color: #000000;
            }
            .container {
              padding: 20px;
              border: 1px solid #dddddd;
              border-radius: 5px;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              font-size: 16px;
              margin-bottom: 10px;
            }
            span {
              font-size: 12px;
              color: #aaaaaa;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Confirmation</h1>
            <p>Hello!</p>
            <p>You are almost ready to start your journey with Empower Lanka.</p><br><br>
            <p>Your verification code is: ${code}</p>
            <p>Please use this code to verify your email address.</p><br><br>
            <p>Thank you</p>
            <p>Empower Lanka</p>
            <span>© 2021 Empower Lanka</span>
          </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending confirmation email:", error);
    } else {
      console.log("Confirmation email sent:", info.response);
    }
  });
}

export const register = (req, res) => {
  // check queries
  const check = {
    username: "SELECT * FROM users WHERE username = ?",
    nic: "SELECT * FROM startup WHERE nic = ?",
    regNo: "SELECT * FROM business WHERE reg_no = ?",
    driveLicNo: "SELECT * FROM distributor WHERE drl_no = ?",
    vehicleNo: "SELECT * FROM vehicle WHERE vehicle_no = ?",
  };

  //  insert query
  const q =
    "INSERT INTO users (`username`,`email`,`password`,`telephone`,`name`,`roll`,`address`) VALUE (?)";

  // sub queries
  const q1 = {
    startup:
      "INSERT INTO startup (`username`,`nic`,`category`,`target_area`) VALUE (?)",
    entrepreneur: "INSERT INTO entrepreneur (`username`) VALUE (?)",

    distributor: "INSERT INTO distributor (`username`,`drl_no`) VALUE (?)",
    consultant:
      "INSERT INTO consultant (`username`,`qualification`,`fee`,`institute`,`experiences`) VALUE (?)",
  };

  // inner queries
  const q2 = {
    business:
      "INSERT INTO business (`category`,`business_name`,`reg_no`,`address`,`entr_id`) VALUES (?)",
    vehicle:
      "INSERT INTO vehicle (`vehicle_type`,`vehicle_no`,`distributor_id`) VALUES (?)",
  };

  // hash the passowrd
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const values = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    telephone: req.body.telephone,
    name: req.body.name,
    roll: req.body.roll,
    Paddress: req.body.Paddress,
  };

  const startupValues = {
    username: req.body.username,
    nic: req.body.nic,
    ex_category: req.body.ex_category,
    area: req.body.area,
  };

  const entrepreneurValues = {
    username: req.body.username,
  };

  const businessValues = {
    category: req.body.category,
    businessName: req.body.businessName,
    regNo: req.body.regNo,
    address: req.body.address,
  };

  const distributorValues = {
    username: req.body.username,
    driveLicNo: req.body.driveLicNo,
  };

  const vehicleValues = {
    vehicleType: req.body.vehicleType,
    vehicleNo: req.body.vehicleNo,
  };

  const consultantValues = {
    username: req.body.username,
    qualification: req.body.qualification,
    consultationFee: req.body.consultationFee,
    institute: req.body.institute,
    experiences: req.body.experiences,
  };

  // run check queries
  db.query(check.username, values.username, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      return res.status(400).json("User already exists!");
    }

    // check validations
    const { error } = registerValidation(req.body);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).send(errorMessages);
    }

    if (values.roll === "customer") {
      const sql2 = "UPDATE users SET code = ? WHERE username = ?";
      const verificationCode = generateRandomCode();
      db.query(q, [Object.values(values)], (err, data) => {
        if (err) {
          return res.status(500).json("Error while saving user!");
        }
        sendConfirmationEmail(values.email, verificationCode);

        if (err) throw err;
        db.query(sql2, [verificationCode, values.username], (err, result) => {
          if (err) throw err;
          res.status(200).json({
            message: "Customer added successfully for verification.",
          });
        });
      });
    }

    if (values.roll === "startup") {
      const verificationCode = generateRandomCode();
      const sql2 = "UPDATE users SET code = ? WHERE username = ?";
      db.query(check.nic, startupValues.nic, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) {
          return res.status(400).json("NIC already exists!");
        } else {
          // run insert queries
          db.query(q, [Object.values(values)], (err, data) => {
            if (err) {
              return res.status(500).json("Error while saving user!");
            }
            db.query(
              q1.startup,
              [Object.values(startupValues)],
              (err, data) => {
                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .json("Error while saving startup data!");
                }
                sendConfirmationEmail(values.email, verificationCode);
                db.query(
                  sql2,
                  [verificationCode, values.username],
                  (err, result) => {
                    if (err) throw err;
                    res.status(200).json({
                      message: "user added successfully for verification.",
                    });
                  }
                );
              }
            );
          });
        }
      });
    }

    if (values.roll === "existing") {
      const verificationCode = generateRandomCode();
      const sql2 = "UPDATE users SET code = ? WHERE username = ?";
      db.query(check.regNo, businessValues.regNo, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) {
          return res.status(400).json("Your business is already registered!");
        } else {
          // run insert queries
          db.query(q, [Object.values(values)], (err, data) => {
            if (err) return res.status(500).json("Error while saving user!");

            let businessArray = Object.values(businessValues);
            db.query(
              q1.entrepreneur,
              [Object.values(entrepreneurValues)],
              (err, data) => {
                const entr_id = data.insertId;
                businessArray.push(entr_id);

                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .json("Error while saving entrepreneur data!");
                }

                db.query(q2.business, [businessArray], (err, data) => {
                  if (err) {
                    console.error(err);
                    return res
                      .status(500)
                      .json("Error while saving business data!");
                  }
                  sendConfirmationEmail(values.email, verificationCode);
                  db.query(
                    sql2,
                    [verificationCode, values.username],
                    (err, result) => {
                      if (err) throw err;
                      res.status(200).json({
                        message: "user added successfully for verification.",
                      });
                    }
                  );
                });
              }
            );
          });
        }
      });
    }

    if (values.roll === "distributor") {
      const verificationCode = generateRandomCode();
      const sql2 = "UPDATE users SET code = ? WHERE username = ?";
      db.query(check.driveLicNo, distributorValues.driveLicNo, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) {
          return res.status(400).json("existing driving licence number!");
        } else {
          // run insert queries
          db.query(q, [Object.values(values)], (err, data) => {
            if (err) return res.status(500).json("Error while saving user!");

            let vehicleArray = Object.values(vehicleValues);
            db.query(
              q1.distributor,
              [Object.values(distributorValues)],
              (err, data) => {
                const entr_id = data.insertId;
                vehicleArray.push(entr_id);

                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .json("Error while saving distributor data!");
                }

                db.query(q2.vehicle, [vehicleArray], (err, data) => {
                  if (err) {
                    console.error(err);
                    return res
                      .status(500)
                      .json("Error while saving vehihcle data!");
                  }
                  sendConfirmationEmail(values.email, verificationCode);
                  db.query(
                    sql2,
                    [verificationCode, values.username],
                    (err, result) => {
                      if (err) throw err;
                      res.status(200).json({
                        message: "user added successfully for verification.",
                      });
                    }
                  );
                });
              }
            );
          });
        }
      });
    }

    if (values.roll === "consultant") {
      const verificationCode = generateRandomCode();
      const sql2 = "UPDATE users SET code = ? WHERE username = ?";
      // run insert queries
      db.query(q, [Object.values(values)], (err, data) => {
        if (err) {
          return res.status(500).json("Error while saving user!");
        }
        db.query(
          q1.consultant,
          [Object.values(consultantValues)],
          (err, data) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json("Error while saving consultant data!");
            }
            sendConfirmationEmail(values.email, verificationCode);
            db.query(
              sql2,
              [verificationCode, values.username],
              (err, result) => {
                if (err) throw err;
                res.status(200).json({
                  message: "user added successfully for verification.",
                });
              }
            );
          }
        );
      });
    }
  });
};

export const verify = (req, res) => {
  const { username, code } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  const sql2 = "UPDATE users SET reg_status = 1 WHERE username = ?";

  db.query(sql, username, (err, result) => {
    if (err) throw err;
    if (result.length) {
      const user = result[0];
      if (user.code === code) {
        if (user.roll === "customer") {
          db.query(sql2, username, (err, result2) => {
            if (err) throw err;
            res.status(200).json({
              message: "User has been approved.",
            });
          });
        } else {
          res.status(200).json({
            message: "User has been approved.",
          });
        }
      } else {
        res.status(400).json({
          message: "Invalid code.",
        });
      }
    } else {
      res.status(400).json({
        message: "User not found.",
      });
    }
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  const q1 = "SELECT comment FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or Username!");
    else if (data[0].reg_status === 0) {
      db.query(q1, [req.body.username], (err, data) => {
        if (data[0].comment === null) {
          return res
            .status(400)
            .json("Please wait for the approval. Come back later!");
        } else {
          let comment = data[0].comment;
          comment =
            comment +
            ". " +
            "Sorry! your request has been declined." +
            "For more details please check your email.";
          return res.status(400).json(comment.toUpperCase());
        }
      });
    } else {
      const token = jwt.sign({ id: data[0].id }, "secretkey");

      const { password, ...others } = data[0];

      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    }
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};

export const adminLogin = (req, res) => {
  const q = "SELECT * FROM admin WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) return res.status(404).json("admin not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong admin password or admin username!");
    else {
      const token = jwt.sign({ id: data[0].id }, "secretadminkey");

      const { password, ...others } = data[0];

      res
        .cookie("accessAdminToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    }
  });
};

export const consultationPayment = (req, res) => {
  console.log(req.body);

  const q =
    "INSERT INTO consultation_payment (`username`,`const_id`,`amount`,`description`) VALUE (?)";

  const values = {
    username: req.body.username,
    const_id: req.body.const_id,
    amount: req.body.amount,
    description: req.body.description,
  };

  db.query(q, [Object.values(values)], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      return res.status(400).json("error!");
    }
  });
};

export const getEntreprenures = (req, res) => {
  const sql =
    "SELECT users.username, business.description, business.category, business.business_name, business.reg_no, business.address FROM users INNER JOIN entrepreneur ON users.username = entrepreneur.username INNER JOIN business ON entrepreneur.id = business.entr_id WHERE users.reg_status = 1";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getConsultants = (req, res) => {
  const sql =
    "SELECT users.username, users.name, consultant.* from users, consultant where users.username = consultant.username and users.username in (select username from users where reg_status=1)  ";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getConsultations = (req, res) => {
  const sql =
    "SELECT consultation_payment.username, consultation_payment.amount, consultation_payment.date, users.* from consultation_payment, users where consultation_payment.username = users.username and const_id = ?";
  const thisUser = req.query.thisUser;
  db.query(sql, thisUser, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getStartupDetails = (req, res) => {
  const sql = "SELECT * FROM startup WHERE username = ?";
  const username = req.params.username;

  db.query(sql, username, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

export const getEntreprenureDetails = (req, res) => {
  const sql =
    "SELECT business.* FROM business INNER JOIN entrepreneur ON entrepreneur.id = business.entr_id WHERE entrepreneur.username = ?";
  const username = req.params.username;

  db.query(sql, username, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

export const getConsultantDetails = (req, res) => {
  const sql = "SELECT * FROM consultant WHERE username = ?";
  const username = req.params.username;

  db.query(sql, username, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

export const getDistributorDetails = (req, res) => {
  const sql =
    "SELECT distributor.*, vehicle.* FROM distributor, vehicle WHERE distributor.id = vehicle.distributor_id and username = ?";
  const username = req.params.username;

  db.query(sql, username, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

export const switchRequest = (req, res) => {
  const sql =
    "INSERT INTO switch_requests (`username`,`category`,`business_name`,`reg_no`,`address`) VALUES (?)";

  const check = {
    username: "SELECT * FROM switch_requests WHERE username = ?",
    regNo: "SELECT * FROM business WHERE reg_no = ?",
  };

  const values = {
    username: req.params.username,
    category: req.body.category,
    businessName: req.body.businessName,
    regNo: req.body.regNo,
    address: req.body.address,
  };

  let businessArray = Object.values(values);

  const regNo = req.body.regNo;

  // check validations
  const { error } = switchValidation(req.body);

  db.query(check.username, values.username, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length) {
      return res.status(400).json("You have already submitted your request!");
    }

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).send(errorMessages);
    }

    db.query(check.regNo, values.regNo, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) {
        return res.status(400).json("Your business is already registered!");
      }

      db.query(sql, [businessArray], (err, result) => {
        if (err) throw err;
        res.json(result);
      });
    });
  });
};

export const updateProfile = (req, res) => {
  const { name, email, paddress, telephone } = req.body;
  const { username } = req.params;

  let update = "UPDATE users SET ";
  const updateDes =
    "UPDATE business SET description = ? WHERE entr_id = (SELECT id FROM entrepreneur WHERE username = ?)";

  let values = [];

  if (name !== null) {
    update += "name = ?, ";
    values.push(name);
  }
  if (email !== null) {
    update += "email = ?, ";
    values.push(email);
  }
  if (paddress !== null) {
    update += "address = ?, ";
    values.push(paddress);
  }
  if (telephone !== null) {
    update += "telephone = ?, ";
    values.push(telephone);
  }

  update = update.slice(0, -2);

  update += " WHERE username = ?";

  values.push(username);

  const description = req.body.description;

  // check validations
  const { error } = updateValidation(req.body);
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).send(errorMessages);
  } else {
    db.query(update, values, (err, result) => {
      if (err) throw err;
      if (description !== null && description !== "") {
        db.query(updateDes, [description, username], (err, result) => {
          if (err) throw err;
          res.json(result);
        });
      } else {
        res.json(result);
      }
    });
  }
};

export const connectEntr = (req, res) => {
  const insert = "INSERT INTO connect (entre1, entre2, room) VALUES (?, ?, ?)";
  const { username, currentUsername } = req.params;
  const roomCode = generateRoomCode(10); // Generate a random room code with 10 characters
  console.log(username, currentUsername);
  db.query(insert, [username, currentUsername, roomCode], (err, result) => {
    if (err) throw err;
    db.query(insert, [currentUsername, username, roomCode], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
};

function generateRoomCode(length) {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

export const getConnectedUsers = (req, res) => {
  const selectAll =
    "SELECT connect.*, business.business_name FROM connect INNER JOIN entrepreneur ON entrepreneur.username = connect.entre1 INNER JOIN business ON entrepreneur.id = business.entr_id WHERE entre2 = ?;";
  const entre2 = req.params.username;
  db.query(selectAll, [entre2], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

export const getPaidConsultants = (req, res) => {
  const selectPaidConsultants =
    "SELECT const_id from consultation_payment where username = ? ;";
  const username = req.params.username;
  db.query(selectPaidConsultants, [username], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

export const checkConnectEntr = (req, res) => {
  const select =
    "SELECT * FROM connect WHERE (entre1 = ? AND entre2 = ?) OR (entre1 = ? AND entre2 = ?)";
  const { username, currentUsername } = req.params;
  console.log(username, currentUsername);
  db.query(
    select,
    [username, currentUsername, currentUsername, username],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.json({ connected: true });
      } else {
        res.json({ connected: false });
      }
    }
  );
};

export const getHiredConsultants = (req, res) => {
  const sql =
    "SELECT consultation_payment.*, users.*, consultant.fee FROM consultation_payment INNER JOIN users ON users.username = consultation_payment.const_id INNER JOIN consultant ON consultant.username = users.username WHERE consultation_payment.username = ? ";
  const username = req.params.username;

  db.query(sql, username, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

export const listProducts = (req, res) => {
  const insert2 =
    "INSERT INTO product_table (`name`,`category`,`desc`,`imageurl`,`price`,`quantity`,`username`) VALUES (?)";
    const username = req.params.username;
    console.log(username);

  const values = [
    req.body.name,
    req.body.category,
    req.body.desc,
    req.body.imageurl,
    req.body.price,
    req.body.quantity,
    req.params.username,
  ];

  const error = validateValues(req.body);
  if (error) {
    return res.status(400).send(error);
  } else {
    console.log(values);

    db.query(insert2, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) {
        return res.status(400).json("error!");
      }
      return res.status(200).json("Success!");
    });
  }
};

export const getProducts = (req, res) => {
  const q = "SELECT * FROM product_table";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
};

export const getEntrProducts = (req, res) => {
  const username = req.params.username;
  console.log(username);
  const query = 'SELECT * FROM product_table WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    } else {
      res.json(results);
    }
  });
};

export const deleteProduct = (req, res) => {
  const { productId } = req.params;
  const query = 'DELETE FROM product_table WHERE id = ?';
  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to delete product' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.sendStatus(204); // Success, no content
    }
  });
};