// const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/payment.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/payments",
    controller.createRecord
  );

  app.put(
    "/api/payments/:id",
    controller.updateRecordById
  );


  app.get(
    "/api/payments",
    controller.getAllRecords
  );

  app.get(
    "/api/payments/:id",
    controller.getRecordById
  );

  app.delete(
    "/api/payments/:id",
    controller.deleteRecordById
  );
};