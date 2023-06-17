import { db } from "../connect.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cd258f01e65898",
    pass: "47e7f4c95fa55d",
  },
});

function sendConfirmationEmail(userEmail) {
  const mailOptions = {
    from: "empowerlanka@gmail.com",
    to: userEmail,
    subject: "Account confirmation",
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
            <h1>Account confirmation</h1>
            <p>Hello!</p>
            <p>Congratulations! You are now a member of Empower Lanka.</p><br><br>
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

function sendDeclineEmail(userEmail, comment) {
  const mailOptions = {
    from: "empowerlanka@gmail.com",
    to: userEmail,
    subject: "Your account has been declined",
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
            <h1>Your account has been declined</h1>
            <p>Dear customer!</p>
            <p>Sorry! Your account has been declined regarding to the bellow issue</p><br><br>
            <p>${comment}</p><br><br>
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

function sendSwitchConfirmationEmail(userEmail) {
  const mailOptions = {
    from: "empowerlanka@gmail.com",
    to: userEmail,
    subject: "Switch account confirmation",
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
            <h1>Switch account confirmation</h1>
            <p>Hello!</p>
            <p>Congratulations! You are now a member of entreprenur community of Empower Lanka.</p>
            <p>Please visit and relogin to our website to explore your new features</p><br><br>
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

function sendSwitchDeclineEmail(userEmail, comment) {
  const mailOptions = {
    from: "empowerlanka@gmail.com",
    to: userEmail,
    subject: "Your switch request has been declined",
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
            <h1>Your switch request has been declined</h1>
            <p>Dear customer!</p>
            <p>Sorry! Your account switch request has been declined regarding to the bellow issue</p><br><br>
            <p>${comment}</p><br><br>
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

// Get all users with registration status = 0
export const getStartupRequests = (req, res) => {
  const sql =
    "SELECT users.*, startup.* from users, startup where users.username = startup.username and users.username in (select username from users where reg_status=0) ";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getEntreprenureRequests = (req, res) => {
  const sql =
    "SELECT users.username, users.name, users.telephone, users.email, users.address as pddress, business.* FROM users INNER JOIN entrepreneur ON users.username = entrepreneur.username INNER JOIN business ON entrepreneur.id = business.entr_id WHERE users.reg_status = 0 and users.comment is null";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getSwitchRequests = (req, res) => {
  const sql =
    "SELECT switch_requests.*, users.name, users.email FROM switch_requests INNER JOIN users ON switch_requests.username = users.username";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getConsultantRequests = (req, res) => {
  const sql =
    "SELECT users.*, consultant.* from users, consultant where users.username = consultant.username and users.username in (select username from users where reg_status=0)  ";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getDistributorRequests = (req, res) => {
  const sql =
    "SELECT users.*, distributor.*, vehicle.* FROM users INNER JOIN distributor ON users.username = distributor.username INNER JOIN vehicle ON distributor.id = vehicle.distributor_id WHERE users.reg_status = 0";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Approve requests
export const approveRequests = (req, res) => {
  const sql = "UPDATE users SET reg_status = 1 WHERE username = ?";
  const username = req.params.username;
  const email = req.params.email;

  const sql1 = "UPDATE business SET reg_status = 1 WHERE reg_no = ?";
  const reg_no = req.params.reg_no;

  db.query(sql, username, (err, result) => {
    if (err) throw err;
    db.query(sql1, [reg_no], (err, result) => {
      if (err) throw err;
      sendConfirmationEmail(email);
      console.log("Email sent to:", email);
      res.json({
        message: `user with username ${username} and business with registration number ${reg_no} has been approved.`,
      });
    });
  });
};

export const approveSwitchRequests = (req, res) => {
  const queries = {
    remove: "DELETE from switch_requests where username = ?",
    remove2: "DELETE from startup where username = ?",
    update: "UPDATE users SET roll = 'existing' WHERE username = ?",
    entrepreneur: "INSERT INTO entrepreneur (`username`) VALUE (?)",
    business:
      "INSERT INTO business (`category`,`business_name`,`reg_no`,`address`,`entr_id`) VALUES (?)",
  };
  const username = req.params.username;
  const values = {
    category: req.params.category,
    business_name: req.params.business_name,
    reg_no: req.params.reg_no,
    address: req.params.address,
  };

  const email = req.params.email;
  console.log(email);

  db.query(queries.update, username, (err, result) => {
    if (err) throw err;
    let businessArray = Object.values(values);
    db.query(queries.entrepreneur, username, (err, data) => {
      const entr_id = data.insertId;
      businessArray.push(entr_id);

      if (err) {
        console.error(err);
        return res.status(500).json("Error while saving entrepreneur data!");
      }

      db.query(queries.business, [businessArray], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Error while saving business data!");
        }
        db.query(queries.remove, username, (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Error while removing request!");
          }
          db.query(queries.remove2, username, (err, data) => {
            if (err) {
              console.error(err);
              return res.status(500).json("Error while removing startup!");
            }
          });
          sendSwitchConfirmationEmail(email);
          return res.status(200).json("User added successfully");
        });
      });
    });
  });
};

// Decline requests
export const declineRequests = (req, res) => {
  const sql = "UPDATE users SET comment = ? WHERE username = ?";
  const { username, comment, email } = req.body;

  db.query(sql, [comment, username], (err, result) => {
    if (err) throw err;
    sendDeclineEmail(email, comment);
    console.log("Email sent to:", email);
    res.json({ message: `User with username ${username} has been declined.` });
  });
};

export const declineSwitchRequests = (req, res) => {
  const sql = "UPDATE users SET comment = ? WHERE username = ?";
  const sql2 = "DELETE from switch_requests where username = ?";
  const { username, comment, email } = req.body;

  db.query(sql, [comment, username], (err, result) => {
    if (err) throw err;
    db.query(sql2, username, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error while removing request!");
      }
      sendSwitchDeclineEmail(email, comment);
      return res.status(200).json("Removed successfully");
    });
  });
};
