require('dotenv').config();
const EXPRESS = require('express');
const path = require('path');
const cors = require('cors')
const moment = require('moment-timezone')
const http = require("http");
const socket = require("socket.io");

const app = new EXPRESS()

const db = require('./models');
const authJwt = require("./src/middleware/authJwt");

db.sequelize.sync(
    //  {force: true}
    ).then(() => {
        console.log('DB Connected!')
    }).catch(err => {
        console.log(err)
    });


moment.tz.setDefault('Asia/Manila')

    app.use(cors({
        origin: '*'
    }))


app.use('/api/static', EXPRESS.static(path.join(__dirname, 'uploads')));

app.use('/api/files', EXPRESS.static(path.join("..", "pdf_bot", "uploads")));


app.use(EXPRESS.json({limit: '100mb'}))

app.use(EXPRESS.urlencoded({ extended: false, limit: '100mb' }))

app.get('/api', (req, res) => {
    res.send("Hello World!")
});

const server = http.createServer(app);


// socket cors config
const io = socket(server, {
    cors: {
      origin: '*',
    },
    // path: '/app'
  });
  
  //Serve socket as middleware.
  app.use(function(req, res, next){
    req.io = io;
    next();
  });


global.users = {
  admin: {},
  user: {}
};

io.on('connection', async function(socket){
  //Socket Connecting!
  let { isValid, error, data } = await authJwt.verify(socket.handshake);

  let role = isValid ? data.roles[0] === 'ROLE_SUPER' || data.roles[0] === 'ROLE_ADMIN'  ? 'admin' : 'user'   : null;
  let user_id = isValid ? data.id : null;

  if(isValid) {

        if(user_id){
          if(!global.users[role][user_id]){
            global.users[role][user_id] = []
          }

            global.users[role][user_id].push(socket.id);
              io.to(socket.id).emit("USER_CONNECTED", { user_id: user_id});
          }
  }

  socket.on('disconnect', () => {

      Object.keys(global.users).forEach(ab => {
          Object.entries(global.users[ab]).forEach(([a, b]) =>{
           let ind = b.indexOf(socket.id);
            if(ind !== - 1) {
                global.users[ab][a].splice(ind, 1);
                let cnt = global.users[ab][a].length;
                if(cnt === 0){
                  delete global.users[ab][a];
                }
              }
        });
      })

       
    console.log(`SocketID ${socket.id} is disconnecting!`)
  });
});













// // Register all routes
require('./src/routes/auth.route')(app);
require('./src/routes/user.route')(app);
require('./src/routes/products.route')(app);
require('./src/routes/customers.route')(app);
require('./src/routes/dashboard.route')(app);
require('./src/routes/orders.route')(app);
require('./src/routes/payment.route')(app);
require('./src/routes/expenses.route')(app);
require('./src/routes/documents.route')(app);
  

// require('./src/routes/tags.route')(app);
// require('./src/routes/pricing.route')(app);
// require('./src/routes/order_item.route')(app);
// require('./src/routes/phone.route')(app);
// require('./src/routes/customer.route')(app);

// require('./src/routes/products.route')(app);

// app.use(require('@middlewares/error-handler'))
































let port = process.env.PORT || 3001
server.listen(port, () => console.log(`server is running on port ${port}`))

// module.exports = app
