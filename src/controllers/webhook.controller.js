require('dotenv').config();
const axios = require('axios');
const moment = require('moment');



//Handle Webhook from PDF-BOT;
   exports.handleWebhook = async (request, response, next) => {
    console.log("WEBHOOK BODY")
    console.log(request.body)
    try{

        let signature = request.get('X-PDF-Signature', 'sha1=');
        let body = request.body;
        let { meta: { role, userId, key } } = body;
        let filename =  key + '.pdf';
        let filePath = process.env.PDF_URL + filename;
        console.log('WEBHOOK RECEIVED!!')
        console.log({ ...body, filename, filePath})
        // var key = body.storage.s3.path.key ? body.storage.s3.path.key : body.storage.s3.path.Key;
      
        //     let fileSplit = String(file).split('/');
        //     let filename = fileSplit[fileSplit.length - 1];


        //     request.data = { ...docDetails, ...request.body.meta};


          let users = global.users[role];

        if(users[userId]){
            console.log(users[userId])
            users[userId].forEach(ab => {
                console.log('Sending back to FE... ')
                request.io.to(ab).emit("pdf-webhook", { filename, filePath});
            })
        }
      
    return response.send({message: 'Webhook Done!'})
    }catch(error){
        console.log(error)
        return response.status(400).send({message: 'Webhook Error!'})
    }
}