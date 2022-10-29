const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/orders.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/orders",
    [authJwt.verifyToken],
    controller.createRecord
  );

  app.put(
    "/api/orders/:id",
    controller.updateRecordById
  );


  app.get(
    "/api/orders",
    controller.getAllRecords
  );

  app.get(
    "/api/orders/:id",
    controller.getRecordById
  );

  app.delete(
    "/api/orders/:id",
    controller.deleteRecordById
  );

  app.get(
    "/api/generateNumber",
    controller.generateNumber
  );
};