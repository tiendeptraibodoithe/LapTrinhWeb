const TourDetail = require("../models/detail_tours");
const tourService = require("../service/tourService");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../util/path");

const checkAdminPermission = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const payload = jwt.verify(token, secretKey); // Giải mã token
      console.log("Decoded payload:", payload); // Kiểm tra payload đã giải mã
      if (payload.permission === 1) {
        next(); // Cho phép tiếp tục nếu có quyền admin
      } else {
        res.status(403).json({ message: "Unauthorized access" }); // Trả về lỗi 403 nếu không phải là admin
      }
    } catch (error) {
      console.error("Invalid token:", error);
      res.status(403).json({ message: "Invalid token" }); // Trả về lỗi nếu token không hợp lệ
    }
  } else {
    res.redirect("/login"); // Redirect nếu không có token
  }
};

exports.getTours = [
  checkAdminPermission,
  async (req, res, next) => {
    try {
      const tours = await tourService.findAllTours();
      res.render("admin/products", {
        tours: tours,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching tours" });
    }
  },
];

exports.createTour = [
  checkAdminPermission,
  async (req, res, next) => {
    try {
      const { title, imageUrl, price, description, id_agency } = req.body;
      const response = await tourService.createNewTour({
        title,
        imageUrl,
        price,
        description,
        id_agency, // Thêm id_agency vào đây
      });
      console.log(response);
      res.status(201).json({ message: "Tour created successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating tour" });
    }
  },
];

exports.getAddTour = [
  checkAdminPermission,
  (req, res, next) => {
    res.render("admin/add-tour", {
      pageTitle: "Add Tour",
      path: "/admin/add-tour",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      isEditing: false,
    });
  },
];
exports.getAllToursbyAdmin = [
  checkAdminPermission,
  async (req, res) => {
    try {
      const tours = await tourService.findAllTours();
      res.render("admin/list-tour-admin", { tours, path: "admin/list-tour" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi lấy tất cả tour" });
    }
  },
];
exports.deleteTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    await tourService.deleteTour(tourId);
    res.status(200).json({ message: "Xoá tour thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Xoá tour thất bại" });
  }
};
exports.getEditTour = [
  checkAdminPermission,
  async (req, res, next) => {
    const tourId = req.params.id;
    try {
      const tour = await tourService.findTourById(tourId);
      if (!tour) {
        return res.status(404).render("404", { pageTitle: "Tour Not Found" });
      }
      res.render("admin/add-tour", {
        pageTitle: "Edit Tour",
        path: "/admin/edit-tour",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        isEditing: true, // Thêm dòng này
        tour: tour,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching tour" });
    }
  },
];
exports.postEditTour = [
  checkAdminPermission,
  async (req, res, next) => {
    const tourId = req.params.id;
    const { title, imageUrl, price, description } = req.body;
    try {
      await tourService.updateTour(tourId, {
        title,
        imageUrl,
        price,
        description,
      });
      res.redirect("/admin/list-tour"); // Chuyển hướng về trang danh sách sản phẩm sau khi cập nhật thành công
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating tour" });
    }
  },
];

exports.getResponse = async (req, res, next) => {
  let listFeedback = await tourService.getAllCustomerFeedback();
  console.log("da vao duoc");
  console.log(listFeedback);
  res.render("admin/list-response", {
    pageTitle: "Response Customer",
    path: "/admin/get-response",
    listFeedback: listFeedback,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
