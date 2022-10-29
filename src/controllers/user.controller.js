require('dotenv');
const db = require("../../models");
const Users = db.users;
const Businesses = db.businesses;
const Roles = db.roles;
const Phones = db.phones;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.createRecord = async (req, res) => {
    const { username, email_address, password } = req.body;


    Users.create({
    ...req.body,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {
      res.send({ message: "Users was registered successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.updateRecordById = async (req, res) => {
      let id = req.params.id;

  const { name, email, address, dpUrl } = req.body;
  Users.update({name, email, address, dpUrl}, {where: {id }})
    .then(user => {
      res.send({ message: "Users was Updated successfully!" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.getAllRecords = async (req, res) => {


    Users.findAll({
        where: { deletedAt: { [Op.is]: null }},
        include: [{model: Businesses, as: 'business'}, {model: Roles}, {model: Phones }],
        attributes: { exclude: ['password'] }
    })
    .then(doc => {
      res.send(doc);
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};



exports.getRecordById = async (req, res) => {
    const { id } = req.params;


    Users.findByPk(id, {where: { deletedAt: {
      [Op.ne]: null
    }
    }})
    .then(user => {
      res.send(user);
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};



exports.deleteUser = async (req, res) => {
  const { userIds } = req.body;
       
  Users.update({deletedAt: new Date, status: "deleted"}, {where: { [Op.or]: userIds.map(a => { return {id: a}}) }})
  .then (doc => {
  res.send({message: "users deleted succesfully"})
  })

  .catch(err => {
  console.log(err)
  res.status(500).send({message: err.message})
  })
};

exports.suspendUser = (req, res) => {
  const {id} = req.params;
  Users.update(
    {suspendedAt: new Date, status: "suspended", suspendedBy: req?.user?.name ? req.user.name : 'admin' },
   {where: {id}
  //  plain: true
   })
  .then (doc => {
  Users.findByPk(id)
  .then(doc1 => {
  res.status(200).json(doc1)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({message: err.message})
    })
  })
  .catch(err => {
  console.log(err)
  res.status(500).send({message: err.message})
  })

}




exports.activateUser = (req, res) => {
  const {id} = req.params;

  Users.update({suspendedAt: null, status: "inactive", suspendedBy: null }, {where: { id }})
  .then (doc => {
    Users.findByPk(id)
    .then(doc1 => {
    res.status(200).json(doc1)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
      })
  })

  .catch(err => {
  console.log(err)
  res.status(500).send({message: err.message})
  })

}



exports.uploadFile =  async (req, res) => {
  const { file } = req;
  

  res.status(200).json({message: 'File Uploaded Successfully', data: { ...file, url: file.filename }})
}

