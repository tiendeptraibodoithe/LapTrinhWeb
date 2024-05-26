import db from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { secretKey } = require("../util/path");
var salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "password", "permission"], // Thêm permission vào attributes
          where: {
            email: email,
          },
          raw: true,
        });

        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            console.log("User permission:", user.permission); // Kiểm tra giá trị permission
            const tokenPayload = {
              email: user.email,
              permission: user.permission,
            };
            console.log("Token payload:", tokenPayload); // In ra payload trước khi mã hóa

            const token = jwt.sign(
              tokenPayload,
              secretKey,
              { expiresIn: "1h" } // Thời hạn token
            );
            userData.token = token;
            userData.errorCode = 0;
            userData.errorMessage = "ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errorCode = 3;
            userData.errorMessage = `Wrong password`;
          }
        } else {
          userData.errorCode = 2;
          userData.errorMessage = `User isn't found`;
        }
      } else {
        userData.errorCode = 1;
        userData.errorMessage =
          "Your Email isn't exist in database. Plz use email other to sign in";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (emailUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: emailUser,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordUserByBcrypt = await hashPasswordNewUser(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordUserByBcrypt,
        permission: data.permission || 0,
      });
      resolve("ok ! tao new user thanh cong !");
    } catch (e) {
      reject(e);
    }
  });
};

let hashPasswordNewUser = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  createNewUser: createNewUser,
};
