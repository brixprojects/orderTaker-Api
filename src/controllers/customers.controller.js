const db = require("../../models");
const Customers = db.customers;

const Tags = db.tags;
const Phones = db.phones;
const Businesses = db.businesses;



const Op = db.Sequelize.Op;

const { parseObject, parseCustomers } = require('../utils/helpers');
const { customersFoldersList } = require('../utils/commonData');



exports.createRecord = async (req, res) => {

  let { tags } = req.body;
  Customers.create(req.body)
    .then(customer => {
        if(tags.length !== 0) {
          customer.setTags(tags)
        }

        res.send({ message: "Customer was created successfully!", customer });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.createLabelRecord = async (req, res) => {
  const { name } = req.body;
  const slug = name.replace(/\s/g, '').toLowerCase();

  Tags.create({...req.body, slug: slug, type: 'customers'})
    .then(tag => {
        res.send({ message: "Tag was created successfully!" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.getAllRecords = async (req, res) => {
  const { selectedLabel, searchText, selectedFolder } = req.query;
  let options = {};

  options['deletedAt'] = null

  Object.entries(req.query).forEach(([key, value]) => {
    

    if(key === 'selectedFolder' && value){

      if(value === 'unpaid'){
        options['balance'] = { [Op.gt]: 0 }
      }

      if(value === 'starred'){
        options['starred'] = true
      }

      if(value === 'customers'){
        options['deletedAt'] = null
      }
    }
  })

  try {

    let customers = await Customers.findAll({where: options, include: [{ model: Tags }, { model: Phones}] })


  let labeled =  await Promise.all(customers.map(async (a) => {
    let obj = {};
    
    await a.getTags();
    obj = a
    obj.hasTag = selectedLabel ? await a.hasTag(Number(selectedLabel)) : true 
    return obj
  }));


  let parsed = await parseCustomers( labeled.filter(a => a.hasTag));
      if(searchText){
      parsed = parsed.filter(a => String(a.id).toLowerCase().includes(searchText.toLowerCase()) ||
      a.name.toLowerCase().includes(searchText.toLowerCase()) ||
      a.address.toLowerCase().includes(searchText.toLowerCase()) ||
      a.email.toLowerCase().includes(searchText.toLowerCase()));
      return res.status(200).json(parsed);
      }  else {
        return res.status(200).json(parsed);
      }



     
  } catch(err) {
    console.log(err)
    res.status(500).send({ message: err.message });
  }
};

exports.updateRecordById = async (req, res) => {
  let { id } = req.params;

  Customers.update(req.body, { where: { id } })
    .then(customer => {
      res.send({ message: "Customer was updated successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};



exports.updateStarredCustomers = async (req, res) => {
  let { ids, status } = req.body;


  Customers.update({starred: status}, { where: { id: { [Op.or]: ids }} })
    .then(customer => {
      res.send({ message: `${ids.length > 1 ? 'Customers' : 'Customer'} starred status was updated successfully!` });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.updateCustomerLabels = async (req, res) => {
  let { id } = req.params;
  let { label } = req.body;
  try {
    const customer = await Customers.findOne({
      where: {
        id: id,
        deletedAt: null
      },
    });

    let ind = await customer.hasTag(label)
    if(ind){
        customer.removeTag(label);
    } else {
        customer.addTag(label);
    }

    customer.save();

    res.send({ message: "Customer labels was updated successfully!" });
  } catch(err) {
    res.status(500).send({ message: err.message });
  }

};

exports.updateLabelsRecordById = async (req, res) => {
  let { id } = req.params;

  Tags.update(req.body, { where: { id } })
    .then(customer => {
      res.send({ message: "Label was updated successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};




exports.getRecordById = async (req, res) => {
  let { id } = req.params;
    Customers.findByPk(id, { where: { deletedAt: {
			[Op.ne]: null
		} } })
    .then(customer => {
      res.send(customer);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.deleteRecordByIds = async (req, res) => {
  const { ids } = req.body;
    Customers.update({deletedAt: new Date()}, { where: { id: {
      [Op.or]: ids
    } } })
    .then(customer => {
      res.send({ message: `${ids.length > 1 ? 'Customers' : 'Customer'} was deleted successfully!` });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.deleteLabelsRecord = async (req, res) => {
  let { id } = req.params;

    Tags.update({deletedAt: new Date()}, { where: { id } })
    .then(customer => {
      res.send({ message: "Label was deleted successfully!" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.getCustomersCount = async (req, res) => {
  try {

    let customersList = await parseCustomers(await Customers.findAll({ include: [{ model: Tags}] }));

    let tagsList = await Tags.findAll({ where: { deletedAt: null, type: 'customers' }}); 
  
  
  
    const counter = { folders: {}, tags: {} };
    customersFoldersList.map(item => {
      if (item.slug === 'starred') {
        counter.folders[item.id] = customersList.filter(customer => customer.starred && !customer.deletedAt).length;
      } else if (item.slug === 'unpaid') {
        counter.folders[item.id] = customersList.filter(customer => customer.balance >= 1 && !customer.deletedAt).length;
      } else {
        counter.folders[item.id] = customersList.filter(customer => customer.folder === item.slug).length;
      }
      return null;
    });
    
    tagsList.map(item => {
      counter.tags[item.id] = customersList.filter(customer => customer.tags.includes(item.id) && !customer.deletedAt).length;
      return null;
    });

    res.status(200).json(counter);

  } catch(err){
    console.log(err)
    res.status(500).send({ message: err.message });
  }

};


exports.getAllCustomersLabels = async (req, res) => {
  Tags.findAll({ where: { type: 'customers', deletedAt: null }})
  .then(doc => {
    res.send(doc);
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ message: err.message });
  });
};


