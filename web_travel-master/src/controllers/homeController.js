const express = require("express");
import tourService from "../service/tourService";
let getHomePage = async (req, res) => {
  return res.render("shop/index", {
    // pageTitle: "Shop",
    path: "/",
  });
};

let getLogin = async (req, res) => {
  return res.render("login.ejs");
};
let getSignUp = async (req, res) => {
  return res.render("signUp.ejs");
};

let getDataTour = async (req, res, next) => {
  try {
    console.log(req.query);
    let tours = await tourService.filterTour(req.query);
    res.render("shop/filter-list-tour.ejs", {
      tours,
      path: "/",
    });
  } catch (e) {
    console.log(e);
  }
};

let getDataTourCommon = async (req, res, next) => {
  try {
    console.log("tung dang lam phan nay");
    let toursCommon = await tourService.filterTourCommon(req.query);
    res.render("shop/filter-common.ejs", {
      tours: toursCommon,
      path: "/",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getHomePage: getHomePage,
  getLogin: getLogin,
  getSignUp: getSignUp,
  getDataTour: getDataTour,
  getDataTourCommon: getDataTourCommon,
};
