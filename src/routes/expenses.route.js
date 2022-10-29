const { authJwt } = require("../middleware");
const controller = require("../controllers/expenses.controller");



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/expense",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createRecord
  );

  app.put(
    "/api/expense/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateRecordById
  );

  app.get(
    "/api/expenses",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllRecords
  );

  app.get(
    "/api/expense/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getRecordById
  );

  app.delete(
    "/api/expense/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteRecordById
  );
};