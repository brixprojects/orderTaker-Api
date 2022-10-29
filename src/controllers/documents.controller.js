
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const HTMLGenerator = require('../utils/HTMLGenerator.js')
const axios = require('axios')

exports.createDocuments = async function(req, res){
        const { role, userId} = req;
        const payload = req.body;
        const { key } = payload;
        console.log("DOCUMENTS BODY")
        console.log(req.body)


        let body = await HTMLGenerator.generateHTML(payload);
        let filePath = `${process.cwd()}/uploads/htmlFiles/${key}.html`;
        if(body.code == 200){
          fs.writeFile(filePath, body.html, err => {
            if (err) {
              console.error(err);
            }


          let filename = `${key}.html`;
            let pathName = `htmlFiles/${filename}`;
       

            let dataToFeed = {
              url: `${process.env.FILE_URL}htmlFiles/${filename}`,
              meta: { 
                  filename: filename,
                  pathName: pathName,
                  key,
                  type: 'pdf',
                  userId: userId,
                  role: role,
                  complete: false
              }
          }
     
          console.log('START SEND PAYLOAD to PDF-BOT ::: ')
          ////CALL THE API OF PDF-BOT////
          axios({
              method: 'POST',
              url: process.env.PDF_BOT_URL,
              data: dataToFeed
          })
          .then(doc  => {
              if( doc.status == 201 || doc.status == 200){
                  console.log('@@@@@ SUCCESS: Payload Sent to PDF-BOT')
                  return res.status(200).send({message: 'Generation in progress!', data: dataToFeed})
              }else{
                  res.status(500).send({message: 'Error on Generating PDF.'})
              }
          }).catch(err => {
            console.log(err)
              res.status(500).send({message: 'Error on Generating PDF.'})
          });

          });
        } else {
          res.status(400).json({message: 'Something Went wrong!'})
        }
   
    }
