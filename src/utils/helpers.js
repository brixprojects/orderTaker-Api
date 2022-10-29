const db = require("../../models");
const Notifications = db.notifications;
const Users = db.users;
const Op = db.Sequelize.Op;


const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };


exports.parseObject = (data) => {

   return JSON.parse(JSON.stringify(data, getCircularReplacer()));

}

 
exports.parseProducts = (data) => {
    let newProducts = [];
    let products = JSON.parse(JSON.stringify(data, getCircularReplacer()));
    products.forEach(a => {
       const obj = {
          ...a,
          labels: a.labels.map(ab => { return ab.id }),
          folder: a.deletedAt ? 'trash' : 'products'
        }
            newProducts.push(obj);
        });
        return newProducts;
 }


 exports.parseCustomers = (data) => {
  let newCustomers = [];
  let customers = JSON.parse(JSON.stringify(data, getCircularReplacer()));
  customers.forEach(a => {
     const obj = {
        ...a,
        tags: a.tags.map(ab => { return ab.id }),
        folder: a.deletedAt ? 'trash' : 'customers'
      }
          newCustomers.push(obj);
      });
      return newCustomers;
}


exports.getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};

exports.getPagingDate = (start, end) => {

// here startDate and endDate are Date objects
  let startDate = start ? new Date(`${start} 00:00:00`) : new Date();
  let endDate = end ? new Date(`${end} 00:00:00`) : new Date();

  return {
      [Op.between]: [startDate, endDate]
  };
};


exports.createNotif = async (req, data, type) => {



  let notification = await Notifications.create(data)
  .then(a => {
    return Notifications.findByPk(a.id, { order: [['id', 'DESC']],
    include: [{ model: Users, as: 'views'}, { model: Users, as: 'sender'}]
  })
  })
  .then(a => {
    return a
  })
  .catch(err => {
    console.log(err);
    return null
  });


  let io = req.io;
  let userId = req.userId;

  if(type !== 'all'){
    let userGroup = global.users[type];


    Object.keys(userGroup).forEach(ab => {
      console.log('ISUSERNOTIF')
      console.log(ab)
      console.log(userId)
        console.log(ab !=  userId)
      if(ab != userId){
        console.log(userGroup[ab])
        userGroup[ab].forEach(ab => {
            console.log('Sending back to FE... ')
            io.to(ab).emit("notification", notification);
        })
    }

  
    })

  } else {

    Object.keys(global.users).forEach(tp => {
      let userGroup = global.users[tp];

    Object.keys(userGroup).forEach(ab => {
      console.log('ISUSERNOTIF')
      console.log(ab)
      console.log(userId)
        console.log(ab !=  userId)
      if(ab != userId){
        userGroup[ab].forEach(ab => {
            console.log('Sending back to FE... ')
            io.to(ab).emit("notification", notification);
        })
    }

  
    })
  })



  }





  return notification;

};

