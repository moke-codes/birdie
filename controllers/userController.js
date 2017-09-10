exports.authenticate = function(req, res, next) {
  console.log(req.body.email, req.body.password);

  // TODO: implement authentication
  req.session.UserInfo = {};
  res.redirect("/");
};
