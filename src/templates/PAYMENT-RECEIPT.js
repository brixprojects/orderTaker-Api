require('dotenv').config();


//HTML template
const template = () => {
    let tmp = {
        head: `
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title> </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <style>
        body {
            background-color: #fff;
            overflow-x: hidden;
        }
        .content-small {
          max-width: 750px;
          margin: auto;
          background: white;
          padding: 20px;
        }
        h3 {
            font-size: 20px;
            font-family: 'Arial';
            font-weight: 600;
            color: white;
            text-align: center;
            padding-left: 10px;
            margin: 0;
           
        }
        .paymenttransaction {
            margin: 0 auto !important;
            max-width: 600px;
            min-width: 400px
        }
       .d-flexsuccess {
            display: flex;
            background-color: #35CC5C;
            padding: 10px;
            justify-content: center;
            align-items: center;
       }
       .d-flexsuccess img {
            width: 20px;
       }
       .paymenttransaction table {
            margin-top: 30px;
       }
       .paymenttransaction  td:last-child{
            font-size: 16px;
            font-family: 'Arial';
            font-weight: 600;
            color: #000;
            padding-left: 20px;
       }
       .paymenttransaction  td:nth-child(1){
            font-size: 16px;
            font-family: 'Arial';
            color: #000;
       }
       hr {
            border-top: 1.5px dashed black;
            margin-top: 30px;
       }
       .receivecopy{
            font-size: 16px;
            font-family: 'Arial';
            color: #000;
            text-align: center;
            width: 400px;
            margin: 20px auto !important;
       }
        </style>`,
        content: `
        <div class="content-small">
        <div class="d-flexsuccess">
            <img src="${process.env.FILE_URL}/assets/icon_check.png">
            <h3>Order Successful</h3>
        </div>
        <div class="paymenttransaction">
            <table>
            <tr>
            <td>Customer Name </td>
            <td>{{name}}</td>
                </tr>
                <tr>
                <td>Order No.</td>
                <td>{{order_no}}</td>
            </tr>
            <tr>
            <td>Order Status</td>
            <td>{{order_status}}</td>
        </tr>
        <tr>
                    <td>Amount Due</td>
                    <td>{{amount_due}}</td>
                </tr>
                <tr>
                    <td>Amount Paid</td>
                    <td>{{amount_paid}}</td>
                </tr>
                <tr>
                <td>Amount Payable</td>
                <td>{{amount_payable}}</td>
            </tr>
                <tr>
                    <td>Order Date & Time</td>
                    <td>{{order_date}}</td>
                </tr>
                <tr>
                    <td>Notes</td>
                    <td>{{notes}}</td>
                </tr>
            </table>
        </div>
        <hr>
        <p class="receivecopy">You will receive a copy of your receipt in your registered e-mail address.</p>
    </div>
  `,
    }
    return tmp
};

module.exports = {template}

