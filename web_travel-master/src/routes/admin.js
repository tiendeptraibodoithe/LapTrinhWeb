const path = require("path");

const adminController = require("../controllers/admin");

const express = require("express");

const router = express.Router();

const products = [];
const tours = [];

router.post("/add-tour", adminController.createTour);

router.get("/add-tour", adminController.getAddTour);

router.get("/list-tour", adminController.getAllToursbyAdmin);

router.delete("/tour/:id", adminController.deleteTour);

router.get("/edit-tour/:id", adminController.getEditTour);

router.post("/edit-tour/:id", adminController.postEditTour);

router.get("/statistic", adminController.getTest);

router.get("/get-response", adminController.getResponse);

module.exports = router;
