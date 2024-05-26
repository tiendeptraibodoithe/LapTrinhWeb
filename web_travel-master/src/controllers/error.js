exports.get404 = (req, res) => {
  const path = req.path;
  res.status(404).render("404", { path: "/404", pageTitle: "Page Not Found" });
};
