
const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/products.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.post(
    "/api/products/stocks",
    controller.addProductStocks
  );

  app.post(
    "/api/products/labels",
    controller.createLabelRecord
  );





  app.put(
    "/api/products/labels/:id",
    controller.updateLabelsRecordById
  );


  app.put(
    "/api/products/update-labels/:id",
    controller.updateProductLabels
  );

  app.put(
    "/api/products/update-starred",
    controller.updateStarredProducts
  );



  app.get(
    "/api/products/labels",
    controller.getAllProductsLabels
  );

  app.get(
    "/api/products/counter",
    controller.getProductsCount
  );


  app.delete(
    "/api/products/labels/:id",
    controller.deleteLabelsRecord
  );




  //OtherAMounts
  app.post(
    "/api/products/other_amount",
    controller.addProductOtherAmount
  );


  app.put(
    "/api/products/other_amount",
    controller.updateProductOtherAmountById
  );

  app.delete(
    "/api/products/other_amount",
    controller.deleteProductOtherAmountById
  );

  app.get(
    "/api/products/other_amount",
    controller.getAllProductOtherAmount
  );



  
  app.put(
    "/api/products/:id",
    controller.updateRecordById
  );


  app.get(
    "/api/products",
    controller.getAllRecords
  );
  

  app.patch(
    "/api/products",
    controller.deleteRecordByIds
  );


  app.post(
    "/api/products",
    controller.createRecord
  );



  app.put(
    "/api/products/:id",
    controller.updateRecordById
  );

  app.get(
    "/api/products/:id",
    controller.getRecordById
  );

};