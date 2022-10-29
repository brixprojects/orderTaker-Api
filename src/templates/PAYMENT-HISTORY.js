// require('dotenv').config();

//HTML template
const template = () => {
    let tmp = {
        head: `
        <style>
        body {
            background-color: #fff;
            overflow-x: hidden;
        }
        .content {
          max-width: 1500px;
          margin: auto;
          background: white;
          padding: 20px;
        }
        .paymenthistorydflex h2 {
            font-size: 20px;
            font-family: 'Arial';
            font-weight: 600;
            margin: 0;
        }
        .paymenthistorydflex {
            display: flex;
        }
        .paymenthistorydflex h3 {
            font-size: 20px;
            font-family: 'Arial';
            font-weight: 600;
            color: #05B9D3;
            text-decoration: underline;
            margin: 0;
            padding-left: 15px;
        }
        .invoicepaymenthistory table:last-child {
            margin-top: 20px;
            width: 100%;
        }
        .invoicepaymenthistory table:first-child {
            margin-top: 20px;
        }
        .invoicepaymentheader tr td {
            padding: 5px 0px;
            font-size: 16px;
            font-family: 'Arial';
            color: #000;
        }
        .invoicepaymentheader tr:nth-child(1) td:nth-child(1) {
            font-size: 16px;
            font-family: 'Arial';
            color: #000;
        }
        .invoicepaymentheader tr td:last-child {
            font-size: 16px;
            font-family: 'Arial';
            color: #8f8f8f;
            padding-left: 30px;
        }
        .invoicepaymenthistory tr:nth-child(3) td:last-child {
            color: #000;
            font-weight: 600;
        }
        .paymenthistorytable {
            border-collapse: collapse;
            border: 1px solid #c7c7c7;
        }
        .paymenthistorytable tr:nth-child(1) {
            background-color: #1E213F;
            text-align: left !important;
        }
        .paymenthistorytable tr:nth-child(1) td {
            color: white;
            font-size: 14px;
            font-family: 'Arial';
            font-weight: 600;
            padding: 30px 0px;
            text-align: left !important;
        }
        .paymenthistorytable tr:nth-child(1) td:nth-child(1) {
            padding-left: 15px !important;
        }
        .paymenthistorytable tr td {
            padding: 30px 0px !important;
            font-size: 14px;
            font-family: 'Arial';
            color: #000;
        }
        table.paymenthistorytable tr td:nth-child(1) {
            padding-left: 30px !important;
        }
        .totalamountpaid {
            margin-top: 30px;
            float: right;
            margin-right: 50px;
        }
        .totalamountpaid td {
            font-size: 20px;
            font-family: 'Arial';
            color: #000;
            font-weight: 600;
        }
        .totalamountpaid td:last-child {
            padding-left: 10px;
        }
        </style>`,
        content: ` 
        <div class="content">
        <div class="paymenthistorydflex">
            <h2>Invoice No. </h2>
            <h3>{{invoice_no}}</h3>
        </div>
        <div class="invoicepaymenthistory">
            <table class="invoicepaymentheader">
                <tr>
                    <td>Student ID</td>
                    <td>{{customer_id}}</td>
                </tr>
                <tr>
                    <td>Student Name </td>
                    <td>{{customer_name}}</td>
                </tr>
                <tr>
                    <td>Invoice Total </td>
                    <td>{{invoice_total_amount}}</td>
                </tr>
                <tr>
                    <td>Amount</td>
                    <td>     </td>
                </tr>
                <tr>
                    <td>Invoice Due Date</td>
                    <td>{{due_date}}</td>
                </tr>
                <tr>
                    <td>Invoice Status</td>
                    <td>{{invoice_status}}</td>
                </tr>
            </table>
            <table class="paymenthistorytable">
                <tr>
                    <td>Payment Date</td>
                    <td>Payment Transaction No.</td>
                    <td>Payment Method</td>
                    <td>Payment Type</td>
                    <td>Payment Status</td>
                    <td>Amount Paid</td>
                    <td></td>
                </tr>
                {{#payments}}
                <tr>
                    <td>{{payment_date}}</td>
                    <td>{{payment_transaction_no}}</td>
                    <td>{{payment_method}}</td>
                    <td>{{payment_type}}</td>
                    <td>{{payment_status}}</td>
                    <td>{{amount_paid}}</td>
                    <td><img src="${process.env.STATIC_FILE_API}/icon_action.png"></td>
                </tr>
                {{/payments}}
            </table>
        </div>
        <div class="totalamountpaid">
            <table>
                <tr>
                    <td>Total Amount Paid: </td>
                    <td>{{total_amount_paid}}</td>
                </tr>
            </table>
        </div>
    </div>
        `,
    }
    return tmp
};

module.exports = {template}

