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
          background: white;
        }

        h2 {
            font-size: 20px;
            font-family: 'Arial';
            font-weight: 600;
        }

        th {
            font-size: 7px;
            border: .3px solid #000;
        }

       .invoicelist table td {
            border: .5px solid #000;
            font-family: 'Arial';
            font-size: 7px;
            padding: 1px;

       }
       .invoicelist table tr:nth-child(1) td {
            width: auto;
       }
       .invoicelist table td:nth-child(2), .invoicelist table td:nth-child(3), .invoicelist table td:nth-child(6), .invoicelist table td:nth-child(10), .invoicelist table td:nth-child(11), .invoicelist table td:nth-child(13), .invoicelist table td:nth-child(14) {
            text-align: left;
            word-break: break;
       }
       .invoicelist table tr:nth-child(1) td {
            font-weight: 600;
            text-align: center !important;
       }
       .receivablecontainer {
        width: 350px;
        margin-top: 20px;
        font-size: 11px;
       }
       .d-flex {
            display: flex;
       }
       .receivablecontainer table tr:nth-child(1) {
            font-family: 'Arial';
            font-size: 13px;

            font-weight: 600;
       }
       .receivablecontainer table tr:last-child {
            font-family: 'Arial';
            font-size: 15px;
            font-weight: 600;
       }
       .receivablecontainer table tr td:last-child{
            text-align: right;
       }
       .downloadedcontainer {
            width: 400px;
            margin-top: 30px;
       }
       .downloadedcontainer p {
            font-family: 'Arial';
            font-size: 10px;

       }
       .d-flex {
            display: flex;
            align-items: center;
            justify-content: flex-start;
       }

       table {
            width: 100%;
       }

       .w-50 {
        width: 50px !important;
       }

       .w-100 {
        width: 100px !important;
       }

       .w-150 {
         width: 150px !important;
       }

        </style>`,
        content: ` 
        <div class="content">
        <h2>{{header}}</h2>
        <div class="invoicelist">
            <table class="text-font-12 table">
                <tr>
                    <th>Invoice No.</th>
                    <th>Invoice Date</th>
                    <th>Customer ID</th>
                    <th class="w-100">Customer Name</th>
                    <th>Segment Name</th>
                    <th>Segment ID</th>
                    <th>Reference Transaction No.</th>
                    <th>Due Date</th>
                    <th>Aging Days</th>
                    <th>Invoice Total Amount</th>
                    <th>Remaining Balance</th>
                    <th>Cancelled Date</th>
                    <th>Published Date</th>
                    <th>Invoice Creation Date</th>
                    <th>Invoice Status</th>
                </tr>
                {{#data}}
                <tr>
                    <td>{{invoice_no}}</td>
                    <td>{{invoice_date}}</td>
                    <td>{{customer_id}}</td>
                    <td>{{customer_name}}</td>
                    <td>{{segment_name}}</td>
                    <td>{{segment_id}}</td>
                    <td>{{reference_transaction_no}}</td>
                    <td>{{due_date}}</td>
                    <td>{{aging_days}}</td>
                    <td>{{invoice_total_amount}}</td>
                    <td>{{remaining_balance}}</td>
                    <td>{{cancelled_date}}</td>
                    <td>{{published_date}}</td>
                    <td>{{invoice_creation_date}}</td>
                    <td>{{invoice_status}}</td>
                </tr>
                {{/data}}
            </table>
        </div>
        {{#footer}}
        <div class="receivablecontainer">
            <table>
                <tr>
                    <td>Total Receivables</td>&nbsp;&nbsp;&nbsp;
                    <td>{{total_receivables}}</td>&nbsp;&nbsp;&nbsp;
                </tr>
                <tr>
                    <td>Total Receivables Balance</td>
                    <td>{{total_receivables_balance}}</td>
                </tr>
            </table>
        </div>
        <div class="downloadedcontainer">
            <div class="d-flex">
                <i><p>Downloaded on:</p></i>&nbsp;
                <i><p>{{downloaded_on}}</p></i>&nbsp;
            </div>
            <div class="d-flex">
                <i><p>Downloaded by:</p></i>&nbsp;
                <i><p>{{downloaded_by}}</p></i>&nbsp;
            </div>
        </div>
    </div>
    {{/footer}}
        `,
    }
    return tmp
};

module.exports = {template}
