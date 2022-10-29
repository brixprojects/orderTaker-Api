// require('dotenv').config();

//HTML template
const template = () => {
    let tmp = {
        head: `
        <style>
        body {
            background-color: #fff;
        }
        .content {
          background: white;
          padding: 0.5rem;
        }
        h2 {
            font-size: 16px;
            font-family: 'Arial';
            font-weight: 600;
        }
        .paymentransac table {  
            border-collapse: collapse;
        }
       .paymentransac table td {
            border: 1px solid #000;
            font-family: 'Arial';
            font-size: 10px;
            vertical-align: bottom;
            
       }

       .paymentransac table th {
        border: 1px solid #000;
        font-family: 'Arial';
        font-size: 11px;
   }

   .d-flex {
    display: flex;
}
       .paymentransac table tr:nth-child(1) td {
            padding: 20px 0px;
       }
       .paymentransac table td:nth-child(2), .paymentransac table td:nth-child(4), .paymentransac table td:nth-child(7),.paymentransac table td:nth-child(10) {
            text-align: left;
       }
       .paymentransac table tr:nth-child(1) td {
            font-weight: 600;
            padding: 20px 8px;
            text-align: center !important;
       }
       .totalpayment {
            margin-top: 20px;
            font-size: 13px;
       }
       
       .totalpayment table tr:nth-child(1) {
            font-family: 'Arial';
            font-size: 14px;
            margin: 8px 0px;
            font-weight: 600;
       }
       .totalpayment table tr td:last-child{
            padding-left: 15px;
            text-align: right;
       }
       .downloadedcontainer {
            margin-top: 30px;
       }
       .downloadedcontainer p {
            font-family: 'Arial';
            font-size: 12px;
            margin: 4px 3px;

       }

       .footer-flex {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        width: 300px;
       }
       
        </style>`,
        content: ` 
        <div class="content">
        <h2>{{header}}</h2>
        <div class="paymentransac">
        <table>
            <tr>
            <th>Payment Transaction No.</th>
            <th>Payment Date Time</th>
            <th>Invoice Number</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Payment Type</th>
            <th>Total Payment</th>
            <th>Payment Methoh</th>
            <th>Status</th>
            <th>Posting Date</th>
            </tr>
           {{#data}}
           <tr>
           <td>{{payment_transaction_no}}</td>
           <td>{{payment_date_time}}</td>
           <td>{{invoice_number}}</td>
           <td>{{customer_id}}</td>
           <td>{{customer_name}}</td>
           <td>{{payment_type}}</td>
           <td>{{total_payment}}</td>
           <td>{{payment_method}}</td>
           <td>{{status}}</td>
           <td>{{posting_date}}</td>
           </tr>
           {{/data}}
        </table>
    </div>
        {{#footer}}
        <div class="totalpayment">
            <table>
                <tr>
                    <td>Total Payment:</td>
                    <td>{{total_payment}}</td>
                </tr>
            </table>
        </div>
        <div class="downloadedcontainer">
            <div class="d-flex">
                <i><p>Downloaded on:&nbsp;&nbsp;</p></i>
                <i><p>{{downloaded_on}}</p></i>
            </div>
            <div class="d-flex">
                <i><p>Downloaded by:&nbsp;&nbsp;</p></i>
                <i><p>{{downloaded_by}}</p></i>
            </div>
        </div>
    {{/footer}}
    </div>
        `,
    }
    return tmp
};

module.exports = {template}
