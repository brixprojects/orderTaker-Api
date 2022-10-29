require('dotenv').config()
var htmlPdf = require('html-pdf-chrome')
var decaySchedule = [
  1000 * 60, // 1 minute
  1000 * 60 * 3, // 3 minutes
  1000 * 60 * 10, // 10 minutes
  1000 * 60 * 30, // 30 minutes
  1000 * 60 * 60 // 1 hour
];
module.exports = {
  api: {
    port: process.env.API_PORT,
    token: process.env.API_TOKEN
  },
  storagePath: "uploads",
  webhook: {
    headerNamespace: 'X-PDF-',
    requestOptions: {

    },
    secret: process.env.WEBHOOK_SECRET,
    url: process.env.WEBHOOK_RECEIVING_API
  },
  ////CONFIG FOR POSTGRES (PDFBOT SERVER)
  // db: pgsql({
  //   // host: process.env.PG_BOT_SERVER_HOST,
  //   // database: process.env.PG_BOT_SERVER_DB,
  //   // username: process.env.PG_BOT_SERVER_USERNAME,
  //   // user: process.env.PG_BOT_SERVER_USERNAME,
  //   // password: process.env.PG_BOT_SERVER_PASSWORD,
  //   // port:  process.env.PG_BOT_SERVER_PORT
  // }),
  storage: {
    // s3: createS3Storage({
    //   bucket: process.env.S3_BUCKET,
    //   accessKeyId: process.env.S3_ACCESS_KEY_ID,
    //   region: process.env.S3_REGION,
    //   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    // })
  },
  queue: {
    // How frequent should pdf-bot retry failed generations?
    // (default: 1 min, 3 min, 10 min, 30 min, 60 min)
    generationRetryStrategy: function(job, retries) {
      return decaySchedule[retries - 1] ? decaySchedule[retries - 1] : 0
    },
    // How many times should pdf-bot try to generate a PDF?
    // (default: 5)
    generationMaxTries: 5,
    // How many generations to run at the same time when using shift:all
    parallelism: 4,
    // How frequent should pdf-bot retry failed webhook pings?
    // (default: 1 min, 3 min, 10 min, 30 min, 60 min)
    webhookRetryStrategy: function(job, retries) {
      return decaySchedule[retries - 1] ? decaySchedule[retries - 1] : 0
    },
    // How many times should pdf-bot try to ping a webhook?
    // (default: 5)
    webhookMaxTries: 5
  },
   generator: {
     // Triggers that specify when the PDF should be generated
    completionTrigger: new htmlPdf.CompletionTrigger.Timer(1000), // waits for 1 sec
     // The port to listen for Chrome (default: 9222)
    // port: 9222
   },
}

