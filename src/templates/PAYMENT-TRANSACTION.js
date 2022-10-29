//HTML template
const template = () => {
    let tmp = {
        head: `
        <style>
        .content {
          max-width: 1500px;
          margin: auto;
          background: white;
          padding: 20px;
        }
        h2 {
            font-size: 20px;
            font-family: 'Arial';
            font-weight: 600;
        }
        .paymenttransaction table tr td:nth-child(1){
            font-size: 14px;
            font-family: 'Arial';
            color: #8f8f8f;
        }
        .paymenttransaction table tr td:nth-child(2){
            font-size: 14px;
            font-family: 'Arial';
            color: #000;
            font-weight: 600;
            padding-left: 50px !important;
        }
        .paymenttransaction table td a{
           text-decoration: underline;
           color: #05B9D3;
        }
        .paymenttransaction table td {
            padding: 4px 0px;
        }

        .invoiceNo {
            text-decoration: underline;
            color: #05B9D3;
        }
        .headerlogo {
            position: absolute;
            margin: auto;
            top: 50px;
            right: 50px;
        }
        
        .headerlogo img {
            height: 100px;
            width: auto;
        }
        </style>`,
        content: `
        <div class="content">
        <h2>Payment Transaction </h2>
            <div class="headerlogo">
            <img src="${process.env.STATIC_FILE_API}/lsgh_logo.png">
            </div>
        <div class="paymenttransaction">
            <table>
                <tr>
                    <td>Transaction No.</td>
                    <td>{{transaction_no}}</td>
                </tr>
                <tr>
                    <td>Transaction Date & Time</td>
                    <td>{{transaction_datetime}}</td>
                </tr>
                <tr>
                    <td>Payment Status</td>
                    <td>{{payment_status}}</td>
                </tr>
                <tr>
                    <td>Amount Paid</td>
                    <td>{{amount_paid}}</td>
                </tr>
                <tr>
                    <td>Payment Method</td>
                    <td>{{payment_method}}</td>
                </tr>
                <tr>
                    <td>Reference No.</td>
                    <td>{{reference_no}}</td>
                </tr>
                <tr>
                    <td>Payment Type</td>
                    <td>{{payment_type}}</td>
                </tr>
                <tr>
                    <td>Customer ID</td>
                    <td>{{customer_id}}</td>
                </tr>
                <tr>
                    <td>Customer Name </td>
                    <td>{{customer_name}}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{{address}}</td>
                </tr>
                <tr>
                    <td>Payment Notes</td>
                    <td>{{payment_notes}}</td>
                </tr>
                <tr>
                    <td>Invoice Number(s) </td>
                    <td><a class="invoiceNo">{{invoice_numbers}}<a></td>
                </tr>
            </table>
        </div>
    </div>
        `,
    }
    return tmp
};

module.exports = {template}

