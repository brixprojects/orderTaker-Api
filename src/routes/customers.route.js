
const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/customers.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.post(
    "/api/customers/labels",
    controller.createLabelRecord
  );


  app.post(
    "/api/customers",
    controller.createRecord
  );


    app.get(
    "/api/customers",
    controller.getAllRecords
  );

  app.get(
    "/api/customers/labels",
    controller.getAllCustomersLabels
  );

  app.get(
    "/api/customers/counter",
    controller.getCustomersCount
  );




  app.put(
    "/api/customers/labels/:id",
    controller.updateLabelsRecordById
  );


  app.put(
    "/api/customers/update-labels/:id",
    controller.updateCustomerLabels
  );

  app.put(
    "/api/customers/update-starred",
    controller.updateStarredCustomers
  );


  app.put(
    "/api/customers/:id",
    controller.updateRecordById
  );






  app.patch(
    "/api/customers",
    controller.deleteRecordByIds
  );

  app.delete(
    "/api/customers/labels/:id",
    controller.deleteLabelsRecord
  );

  app.put(
    "/api/customers/:id",
    controller.updateRecordById
  );

  app.get(
    "/api/customers/:id",
    controller.getRecordById
  );


};