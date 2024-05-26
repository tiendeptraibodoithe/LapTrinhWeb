const Tour = require("../models/tour");
const tourService = require("../service/tourService");

const redirectLogin = (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect("/login"); // Chuyển hướng đến trang đăng nhập nếu không có token trong cookies
  } else {
    next(); // Cho phép tiếp tục nếu đã đăng nhập
  }
};

exports.getAllTours = [
  redirectLogin,
  async (req, res) => {
    try {
      const tours = await tourService.findAllTours();
      res.render("shop/list-tour", { tours, path: "list-tour" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi lấy tất cả tour" });
    }
  },
];
exports.getIndex = [
  redirectLogin,
  (req, res, next) => {
    res.render("shop/index", {
      path: "/",
    });
  },
];
exports.getNews = [
  redirectLogin,
  (req, res, next) => {
    res.render("shop/tin-tuc", {
      // pageTitle: "Shop",
      path: "/tin-tuc",
    });
  },
];
