const db = require("../models/index");

const getTotalTours = async () => {
  try {
    const totalTours = await db.DetailTour.count({});
    return totalTours;
  } catch (error) {
    throw error;
  }
};
const getTotalFeedback = async () => {
  try {
    const totalFeedback = await db.Feedback.count({});
    return totalFeedback;
  } catch (error) {
    throw error;
  }
};
const getRateGood = async () => {
  try {
    const totalRateGood = await db.User.count({});
    return totalRateGood;
  } catch (error) {
    throw error;
  }
};
const getTourListWithFeedbackCount = async () => {
  try {
    let tourList = await db.DetailTour.findAll({});
    return tourList;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getTotalTours,
  getTotalFeedback,
  getRateGood,
  getTourListWithFeedbackCount,
};
