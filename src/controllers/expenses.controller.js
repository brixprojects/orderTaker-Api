const db = require("../../models");
const Expenses = db.expenses;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

const { getPagingDate, getPagination, getPagingData } = require('../utils/helpers');


exports.createRecord = async (req, res) => {
  const { userId } = req;

  Expenses.create({...req.body, user: userId})
  .then(a => {
      res.status(200).json({message: 'Expense Recorded', data: a})
  })
  .catch(err => {
    res.status(400).json({message: 'Something went wrong!', error: err})
  })
 }


exports.updateRecordById = async (req, res) => {  
  let {id} = req.params
  let { amount, description, notes } = req.body;
  Payments.update({amount, description, notes}, {where: {id}})
.then(payment => {
  res.send({message: "Expense data updated successfully"})
})
.catch(err => {
  console.log(err)
  res.status(500).send({message: err.message})
})
  

  }



exports.getAllRecords = async (req, res) => {
  const { start, end } = req.query



  
      Expenses.findAll({ where: {deletedAt: {
      [Op.is] : null
  }, recordedAt: getPagingDate(start, end)}})
      .then(doc => {
        const allRecords = doc;
      let totalExpenses = doc && doc.map(a => { return a.amount }).reduce((a, b) => a + b, 0)  
      res.status(200).json({total: totalExpenses, records: allRecords})
      })
      .catch(err => {
      console.log(err)
      res.status(500).json({message: err.message})
  })
  }


exports.getRecordById = async (req, res) => {
  //     let {id} = req.params;
  //     Payments.findByPk(id, {where: {deletedAt: {
  //     [Op.ne]: null
  // } }})
  //     .then(payment => {
  //     res.send(payment)
  //   })
  //     .catch(err => {
  //     res.status(500).send({message: err.message})
  // })
  }

exports.deleteRecordById = async (req, res) => {
    let {id} = req.params
      Payments.update({deletedAt: new Date ()}, {where: {id}})

    .then(payment => {
      res.send({message: "Expense data deleted successfully"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
    
  }
  