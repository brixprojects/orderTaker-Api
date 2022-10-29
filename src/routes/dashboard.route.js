
const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/dashboard.controller");




module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/admin/dashboard",
    authJwt.verifyToken,
    controller.getAdminDashboard
  );

  app.get(
    "/api/notifications",
    authJwt.verifyToken,
    controller.getAllNotifications
  );

  app.put(
    "/api/notification/:id",
    authJwt.verifyToken,
    controller.readNotification
  );


};