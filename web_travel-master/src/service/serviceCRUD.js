import bcrypt from "bcryptjs";
import db from "../models/index";
let salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordUserByBcrypt = await hashPasswordNewUser(data.password);
      await db.User.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashPasswordUserByBcrypt,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
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

let displayCRUDUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let ListUser = await db.User.findAll();
      resolve(ListUser);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: userId,
        },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        resolve();
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  displayCRUDUser: displayCRUDUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
};
