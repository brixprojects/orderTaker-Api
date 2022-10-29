const db = require("../../models");
const Customers = db.customers;
const Notifications = db.notifications;
const Products = db.products;
const Users = db.users;
const Other_Amounts = db.other_amounts;
const Tags = db.tags;
const Op = db.Sequelize.Op;





exports.getAdminDashboard = async (req, res) => {
  let { userId, business } = req;

    try{

      let usersCount = await Users.findAll({where: { deletedAt: {
        [Op.is]: null
      }  }});
      let productsCount = await Products.findAll({where: { deletedAt: {
          [Op.is]: null
        }  }});
      let customersCount = await Customers.findAll({where: { deletedAt: {
        [Op.is]: null
      }  }});
      let popularCustomers = await Customers.findAll({where: { balance: { [Op.gt]: 0 }, 
        deletedAt: {
          [Op.is]: null
        }  }});
      let popularProducts = await Products.findAll({where:  {  deletedAt: {
        [Op.is]: null
      },
      starred: { [Op.is]: true }}, include: [{ model: Tags, as: 'labels' }, { model: Other_Amounts }]})
      .catch(err => console.log(err));

      const data = {
        business: business,
        unpaidCustomers: popularCustomers,
        popularProducts: popularProducts,
        unpaidOrders: [],
        counts: {
            users: usersCount.length,
            products: productsCount.length,
            customers: customersCount.length,
            orders: 0
          },
      }
      res.status(200).send(data);
    } catch (err){
      console.log(err)
      res.status(500).send({ message: err.message });
    }
 
};


exports.getAllNotifications = async (req, res) => {
  let { userId } = req;

 let notif = await Notifications.findAll({where: {
    senderId: {  [Op.ne]: userId }
    },
    order: [['id', 'DESC']],
  include: [{ model: Users, as: 'sender', require: false}, { model: Users, as: 'views', require: false}],
  raw : true,
  nest : true // <
}).catch(err => {
  console.log(err)
});

  
let groupNotif = [];
let newArr = [{
  type: 'SALES',
  records: [],
  total: 0
},{
  type: 'LIMITS',
  records: [],
  total: 0
},{
  type: 'ACTIVITIES',
  records: [],
  total: 0
}];


if(notif && notif.length !== 0){
    for(let ntf of notif){
      let ind = newArr.map(a => { return a.type }).indexOf(ntf.type);
      if(ind !== -1){
          newArr[ind].records.push(ntf);
          newArr[ind].total++;
      }
}
}


res.status(200).json(newArr);



};


exports.readNotification = async (req, res) => {
  let id = req.params.id
  let userId = req.userId;


  let notifications = await Notifications.findByPk(id);


  if(!notifications){
    res.status(400).json({message: "Notification not found."})
  } else {

    await notifications.addView(userId);

    res.status(200).json({message: "Notification mark as read."})
  }
};