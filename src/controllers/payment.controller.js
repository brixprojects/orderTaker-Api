const db = require("../../models");
const Orders = db.orders;
const Products = db.products;
const Payments = db.payments;
const Customers = db.customers;
const Order_items = db.order_items;
const CodeNum = db.codenums;
const Other_Amounts = db.other_amounts;



const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.createRecord = async (req, res) => {
  const { userId, businessId } = req;

  const { orderId, type, amount, description } = req.body;

  let order = await Orders.findByPk(orderId, { include: [{ model: Payments }, { model: Order_items }, { model: Customers}]});


  if(!order) return res.status(400).json({message: "Unable to find Order Record"});
  
  if(order.isPaid) return res.status(400).json({message: "Order is already paid"});
  
  if(amount <= 0) return res.status(400).json({message: "Please enter an amount higher than 0."});

  let customer = await Customers.findByPk(order.customers.length !== 0 ? order.customers[0].id : null);




  order.amount_paid += amount;
  order.amount_payable = order.amount_due <= order.amount_paid ? 0 : order.amount_due - order.amount_paid;
  
  
  let isPaid = order.amount_due <= order.amount_paid ? true : false;
  order.isPaid = isPaid

  if(order.isPaid){
    order.order_status = 'paid'
  }
  
  
  return Payments.create({...req.body, businessId, userId}).then( async payment => {
    
      customer.balance = (customer.balance - amount) <= 0 ? 0 : customer.balance - amount;
      customer.isPaid = (customer.balance - amount) <= 0 ? true : false;

      await customer.save();
      await order.save();

          return  await Orders.findByPk(order.id, { include: [{ model: Payments }, { model: Order_items }, { model: Customers}]});


      })
      .then(doc => {
        // req.io.emit("notification", "HELLO ROM");

        return res.send({message : "payment created succesfully", data: doc});

      })
      .catch(err => {
      console.log(err);
      return  res.status(500).send ({message: err.message});
      });
    }


exports.updateRecordById = async (req, res) => {  
      let { id } = req.params;
      Payments.update(req.body, {where: { id }})
      .then (payment => {
      res.send({message: "payment updated succesfully"})
      })

      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
      })
  }

exports.getAllRecords = async (req, res) => {
      Payments.findAll({ where: {deletedAt: {
      [Op.is] : null
  } }})
      .then(doc => {
      res.send(doc)
      })
      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
  }


exports.getRecordById = async (req, res) => {
      let {id} = req.params;
      Payments.findByPk(id, {where: {deletedAt: {
      [Op.ne]: null
  } }})
      .then(payment => {
      res.send(payment)
    })
      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
  }

exports.deleteRecordById = async (req, res) => {
    let {id} = req.params
      Payments.update({deletedAt: new Date ()}, {where: {id}})

    .then(payment => {
      res.send({message: "payment data deleted succesfully"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
    
  }
  