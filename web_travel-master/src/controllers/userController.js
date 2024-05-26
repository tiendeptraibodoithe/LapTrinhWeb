const { resolveShowConfigPath } = require("@babel/core/lib/config/files");
const userService = require("../service/userService");

let handleCreateUser = async (req, res) => {
  let newUser = await userService.createNewUser(req.body);
  console.log(newUser);
  return res.render("login.ejs");
};

let handleLogin = async (req, res) => {
  let email = req.query.email;
  let password = req.query.password;
  console.log(req.query);
  if (!email || !password) {
    let errorMessage = "Vui lòng nhập đầy đủ email và mật khẩu.";
    return res.render("login.ejs", { errorMessage: errorMessage });
  }
  let userData = await userService.handleUserLogin(email, password);
  if (!userData) {
    let errorMessage = "Email hoặc mật khẩu không chính xác. Vui lòng thử lại.";
    return res.render("login.ejs", { errorMessage: errorMessage });
  } else {
    if (userData.errorCode === 3) {
      let errorMessage = "Mật khẩu không chính xác. Vui lòng thử lại.";
      return res.render("login.ejs", { errorMessage: errorMessage });
    } else if (userData.errorCode !== 0) {
      // Xử lý các mã lỗi khác nếu cần
      let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại sau.";
      return res.render("login.ejs", { errorMessage: errorMessage });
    } else {
      // Đăng nhập thành công, chuyển hướng người dùng đến trang chính
      // Thêm token vào cookie
      res.cookie("token", userData.token);
      return res.render("shop/index", {
        path: "/",
      });
    }
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleCreateUser: handleCreateUser,
};
