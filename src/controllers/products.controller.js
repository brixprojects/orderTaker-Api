const db = require("../../models");
const Products = db.products;
const Purchases = db.purchases;

const Tags = db.tags;
const Other_Amounts = db.other_amounts;
const Pricings = db.pricings;
const Businesses = db.businesses;



const Op = db.Sequelize.Op;

const { parseObject, parseProducts } = require('../utils/helpers');
const { foldersList } = require('../utils/commonData');


exports.createRecord = async (req, res) => {
  let { labels, other_amounts } = req.body;
  
  Products.create(req.body)
    .then(product => {
        if(labels.length !== 0) {
          product.setLabels(labels)
        }

        if(other_amounts.length!== 0) {
          product.setOther_amounts(other_amounts.map(a => { return a.id }))
        }
        res.send({ message: "Products was created successfully!" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.createLabelRecord = async (req, res) => {
  const { name } = req.body;
  const slug = name.replace(/\s/g, '').toLowerCase();

  Tags.create({...req.body, slug: slug, type: 'products'})
    .then(tag => {
        res.send({ message: "Label was created successfully!" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};




exports.updateRecordById = async (req, res) => {
  let { id } = req.params;
  let { other_amounts } = req.body;


  Products.update(req.body, { where: { id } })
    .then( async product => {
       let prod = await Products.findByPk(id);

      if(other_amounts.length!== 0) {
        prod.setOther_amounts(other_amounts.map(a => { return a.id }))
      }

      res.send({ message: "Product was updated successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};



exports.updateStarredProducts = async (req, res) => {
  let { ids, status } = req.body;


  Products.update({starred: status}, { where: { id: { [Op.or]: ids }} })
    .then(product => {
      res.send({ message: `${ids.length > 1 ? 'Products' : 'Product'} starred status was updated successfully!` });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};




exports.updateProductLabels = async (req, res) => {
  let { id } = req.params;
  let { label } = req.body;
  try {
    const product = await Products.findOne({
      where: {
        id: id,
        deletedAt: null
      },
    });

    let ind = await product.hasLabel(label)
    if(ind){
        product.removeLabel(label);
    } else {
        product.addLabel(label);
    }

    product.save();

    res.send({ message: "Product labels was updated successfully!" });
  } catch(err) {
    res.status(500).send({ message: err.message });
  }

};

exports.updateLabelsRecordById = async (req, res) => {
  let { id } = req.params;

  Tags.update(req.body, { where: { id } })
    .then(product => {
      res.send({ message: "Label was updated successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};





exports.getAllRecords = async (req, res) => {
  const { selectedLabel, searchText, selectedFolder } = req.query;
  let options = {};

  options['deletedAt'] = { [Op.is]: null }

  Object.entries(req.query).forEach(([key, value]) => {


    if(key === 'selectedFolder' && value){
      if(value === 'trash'){
        options['deletedAt'] = { [Op.not]: null }
      } 

      if(value === 'available'){
        options['stocks'] = { [Op.gt]: 0 }
      }

      if(value === 'unavailable'){
        options['stocks'] = { [Op.lte]: 0 }
      }


      if(value === 'starred'){
        options['starred'] = true
      }

      if(value === 'products'){
        options['deletedAt'] = { [Op.is]: null }
      }
    }
  })

  try {
    
    if(selectedFolder === 'trash'){
      options['deletedAt'] = { [Op.not]: null }
    } 

    let products = await Products.findAll({where: options, include: [{ model: Tags, as: 'labels' }, { model: Other_Amounts }] })


  let labeled =  await Promise.all(products.map(async (a) => {
    let obj = {};
    
    await a.getLabels();
    obj = a
    obj.hasLabel = selectedLabel ? await a.hasLabel(Number(selectedLabel)) : true 
    return obj
  }));


  let parsed = await parseProducts( labeled.filter(a => a.hasLabel));
      if(searchText){
      parsed = parsed.filter(a => String(a.id).toLowerCase().includes(searchText.toLowerCase()) ||
      a.name.toLowerCase().includes(searchText.toLowerCase()) ||
      a.description.toLowerCase().includes(searchText.toLowerCase()) ||
      String(a.price).toLowerCase().includes(searchText.toLowerCase()));
      return res.status(200).json(parsed);
      }  else {
        return res.status(200).json(parsed);
      }



     
  } catch(err) {
    console.log(err)
    res.status(500).send({ message: err.message });

  }
};


exports.getAllProductsLabels = async (req, res) => {
  Tags.findAll({ where: { type: 'products', deletedAt: null }})
  .then(doc => {
    res.send(doc);
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ message: err.message });
  });
};



exports.getRecordById = async (req, res) => {
  let { id } = req.params;
    Products.findByPk(id, { where: { deletedAt: {
			[Op.ne]: null
		} } })
    .then(product => {
      res.send(product);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.deleteRecordByIds = async (req, res) => {
  const { ids } = req.body;
    Products.update({deletedAt: new Date()}, { where: { id: {
      [Op.or]: ids
    } } })
    .then(product => {
      res.send({ message: `${ids.length > 1 ? 'Products' : 'Product'} was deleted successfully!` });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.deleteLabelsRecord = async (req, res) => {
  let { id } = req.params;

    Tags.update({deletedAt: new Date()}, { where: { id } })
    .then(product => {
      res.send({ message: "Label was deleted successfully!" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.getProductsCount = async (req, res) => {
  try {

    let productsList = await parseProducts(await Products.findAll({ include: [{ model: Tags, as: 'labels' }] }));

    let labelsList = await Tags.findAll({ where: { deletedAt: null, type: 'products' }}); 
  
  
  
    const counter = { folders: {}, labels: {} };
    foldersList.map(item => {
      if (item.slug === 'starred') {
        counter.folders[item.id] = productsList.filter(product => product.starred && !product.deletedAt).length;
      } else if (item.slug === 'available') {
        counter.folders[item.id] = productsList.filter(product => product.stocks >= 1 && !product.deletedAt).length;
      } else if (item.slug === 'unavailable') {
        counter.folders[item.id] = productsList.filter(product => product.stocks == 0 && !product.deletedAt).length;
      } else if (item.slug === 'trash') {
        counter.folders[item.id] = productsList.filter(product => product.deletedAt).length;
      } else {
        counter.folders[item.id] = productsList.filter(product => product.folder === item.slug).length;
      }
      return null;
    });
    
    labelsList.map(item => {
      counter.labels[item.id] = productsList.filter(product => product.labels.includes(item.id) && !product.deletedAt).length;
      return null;
    });
  




    res.status(200).json(counter);




  } catch(err){
    console.log(err)
    res.status(500).send({ message: err.message });
  }

};




exports.addProductStocks = async (req, res) => {
   const { productId, quantity } = req.body;

  const product = await Products.findByPk(productId)

  await Products.update({ stocks: Number(quantity) + product.stocks  }, { where: { id: productId} });

  await Purchases.create(req.body);

  res.send({message: 'Stocks added Successfully!'})

}

exports.getAllProductOtherAmount = async (req, res) => {

  Other_Amounts.findAll({ where: { deletedAt: null }})
  .then(doc => {
    res.send(doc);
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ message: err.message });
  });

}



exports.addProductOtherAmount = async (req, res) => {
  
  const { name, amount_type, value, isActive, type } = req.body;

  Other_Amounts.create({ name, amount_type, value, isActive, type })
 .then(doc => {
  res.send({message: 'Other Amount added Successfully!', data: doc })
 })
 .catch(err => {
  console.log(err)
  res.status(400).json({message: 'Something went wrong!'})
 })
}

exports.updateProductOtherAmountById = async (req, res) => {
  
  const { id, name, amount_type, value, isActive, type } = req.body;

  Other_Amounts.update({ name, amount_type, value, isActive, type }, { where: { id: id } })
 .then(() => {
  res.send({message: 'Other Amount Updated Successfully!'})
 })
 .catch(err => {
  console.log(err)
  res.status(400).json({message: 'Something went wrong!'})
 })
}

exports.deleteProductOtherAmountById = async (req, res) => {
  const { id } = req.params;  

  Other_Amounts.update({ deleteAt: new Date }, {where: { id } })
 .then(() => {
  res.send({message: 'Other Amount deleted Successfully!'})
 })
 .catch(err => {
  console.log(err)
  res.status(400).json({message: 'Something went wrong!'})
 })
}
