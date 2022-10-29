const db = require("../../models");
const Orders = db.orders;
const Products = db.products;
const Payments = db.payments;
const Customers = db.customers;
const Order_items = db.order_items;
const CodeNum = db.codenums;
const Other_Amounts = db.other_amounts;
const Users = db.users;
const Phones = db.phones;


const Op = db.Sequelize.Op;

// const { validateLoginData } = require('../utils/validators')
const { createNotif } = require('../utils/helpers')


let activeUsers = global.users;


exports.createRecord = async (req, res) => {
  const { userId, businessId, user } = req;
  const { cart_items, customerId, payment, amount_due, order_no }  = req.body;
  let isError = false;
  let message = '';
  let limitedProducts = [];
  let orderItemsIds = [];
  let newProducts = [];
  try { 


    console.log(activeUsers)


  await Promise.all(cart_items.map(async a => {
          let product = await Products.findByPk(a.productId, { 
            include: [{ model: Other_Amounts }] 
           });
          let stk = product.stocks - a.qty;

          if(stk < 0) {
            isError = true;
            message = 'Not enough stocks:' +  ` ${product.stocks}${product.stocks === 1 ? 'pc' : 'pcs'} remaining of ${product.name}`
        
            limitedProducts.push({
              title: product.name,
              discription: 'Not enough stocks:' +  ` ${product.stocks}${product.stocks === 1 ? 'pc' : 'pcs'} remaining.`
            });










          }


          if(stk < product.limit ){
            limitedProducts.push({
              title: product.name,
              description: 'Minimum stock alert:' +  ` ${stk}${stk === 1 ? 'pc' : 'pcs'} remaining.`
            });            
          }



           a.total = a.qty * a.price;
          a.name = product.name;
          a.description = product.description;
     
          let orderItem = new Order_items(a);
            product.stocks = stk;
             newProducts.push({product, orderItem});
            return orderItem;
        }))


    if(isError) return res.status(404).send({message});


        for(let product of limitedProducts){
          await createNotif(req, {
            title: product.title,
            description: product.description,
            audience: 'admin',
            type: 'LIMITS',
            senderId: userId
      }, 'all');
      


    
     }




if(Number(payment) < amount_due && !customerId) return res.status(404).send({message: 'Insufficienct Payment, a customer is required.'})


let newCustomer = await Customers.findByPk(customerId);
let isPaid;
let amount_paid;
let amount_payable;
let newPayment = new Payments({amount: Number(payment)});



if(newPayment.amount < amount_due){
    amount_paid = newPayment.amount;
    amount_payable = amount_due - newPayment.amount;
    isPaid = false;

}

if(newPayment.amount >= amount_due){
  isPaid = true;
  amount_paid = newPayment.amount;
}


 let newPayable = newCustomer ? newCustomer.balance + amount_payable : amount_payable
if(newCustomer
   && (newCustomer.limit < newPayable)
   ){ 

  // return res.status(404).send({message: `Unable to find customer details.`})

     //Responsible of notifying.
     await createNotif(req, {
      title: newCustomer.name,
      description: `Already reach maximum credit limit of ₱${newCustomer.limit}.`,
      audience: 'admin',
      type: 'LIMITS',
      senderId: userId
}, 'admin');


  return res.status(404).send({message: `Customer reached its credit limit of ${newCustomer.limit} pesos.`})
} else {





await Promise.all(newProducts.map(async a => {
  await a.orderItem.save();
  await a.product.save();
  if(a.product.other_amounts.length !== 0) {
    a.orderItem.setOther_amounts(a.product.other_amounts.map(ab => { return ab.id }))
  }
  
  orderItemsIds.push(a.orderItem.id);
}));






  







      Orders.create({
        ...req.body,
        tax_disc: JSON.stringify(req.body.tax_disc),
        userId,
        businessId,
        amount_paid,
        amount_payable,
        isPaid,
        order_no: await generateInvoiceNumber()
      })
      .then( async order => {
        newPayment.orderId = order.id;

   
        
        order.setOrder_items(orderItemsIds);
        if(customerId){
          newCustomer.balance = newPayable;
          newCustomer.isPaid = newPayable > 0 ? false : true;
        await newCustomer.save();
        await order.setCustomers([customerId])
        }

        if(Number(payment) > 0) {
          newPayment.save();
        }


      return await Orders.findOne({where: { id: order.id }, include: [{ model: Order_items }, { model: Customers}] })
      })
      .then(async a => {
          let obj = {};
          obj = a;
          obj.tax_disc =  a.tax_disc ? JSON.parse(a.tax_disc) : [];






        //Responsible of notifying.
        await createNotif(req, {
              title: user.name,
              description: `Sold items with Ref: ${a.order_no}, amounting ₱${a.amount_due}.`,
              audience: 'admin',
              type: 'SALES',
              senderId: userId
        }, 'admin');

        res.send({message : "order created succesfully", data: obj});
      })
      .catch(err => {
      console.log(err);
      res.status(500).send ({message: err.message});
      });
}

} catch (err){
  console.log(err)
  res.status(400).send ({error: err,message: 'Error on creating order.'});
}
    }


    
exports.updateRecordById = async (req, res) => {  
      let { id } = req.params;
      Orders.update(req.body, {where: { id }})
      .then (order => {
      res.send({message: "order updated succesfully"})
      })

      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
      })
  }



exports.getAllRecords = async (req, res) => {

      let unpaid_orders = [];
      let orders = [];

      Orders.findAll({ where: {deletedAt: {
      [Op.is] : null
      } }, 
      order: [['id', 'DESC']],
      include: [{ model: Order_items, include: {
        model: Other_Amounts,
      } }, { model: Customers,  include: {
        model: Phones
      } }, { model: Users, as: 'createdBy' }, { model: Payments }] ,
    })
      .then(doc => {
      orders = doc;
      unpaid_orders = doc.filter(a => { return !a.isPaid });


      res.status(200).json({orders, unpaid_orders})
      })
      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
  }

exports.getRecordById = async (req, res) => {
      let {id} = req.params;
      Orders.findByPk(id, {where: {deletedAt: {
      [Op.ne]: null
  } }, include: [{ model: Order_items, include: {
    model: Other_Amounts,
  } }, { model: Customers,  include: {
    model: Phones
  } }, { model: Users, as: 'createdBy' }, { model: Payments }] })
      .then(order => {
      res.send(order)
    })
      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
  }

exports.deleteRecordById = async (req, res) => {
    let {id} = req.params
      Orders.update({deletedAt: new Date ()}, {where: {id}})

    .then(order => {
      res.send({message: "order data deleted succesfully"})
    })

    
  }

  exports.generateNumber = async (req, res) => {
    let order_no = await generateInvoiceNumber();
    res.send(order_no);
  }
  


const generateInvoiceNumber = async () => {

  let oldNum = await CodeNum.findOne({where: { codeType: 'order' } });
  oldNum.count += 1;
  oldNum.save();

  let str = String(oldNum.count).padStart(oldNum.digit, '0');


  let codenum = `${oldNum.common}-${str}`;
  return codenum;
}