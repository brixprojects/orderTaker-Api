exports.generateHTML = async function (payload) {
    let html = ``, response = {}
    const data = payload
    console.log(data.parser);
    let dir = `src/templates/${data.report_type}.js`
    console.log(dir)
    const fs = require("fs")
 

    try{

            if (fs.existsSync(dir)) {
                // file exists
                const {template} = require(`../templates/${data.report_type}.js`);
                

                const { parser } = require('./parser');
                html = await parser(data, template())
                response.code = 200
                response.html = html
              } else {
                console.log("DOES NOT exist:", dir);
                response.code = 400
                response.html = `No Template Available for ${data.report_type}`
              } 

        return response;

    }catch(error){
        console.log("ERROR: HTMLGenerator: ", error)
    }

    
}