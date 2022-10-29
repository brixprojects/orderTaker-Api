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
        }
        h2 {
            color: #000;
            font-size: 15px;
            font-family: Arial;
            font-weight: 600;
        }
        .headertable {
            display: flex;
            justify-content: space-between;
            line-height: 4px;
        }
        .soaheader h3 {
            font-family: Arial;
            font-size: 14px;
            font-weight: 600;
        }

        .soaheader {
            font-family: Arial;
            font-weight: 600;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 300px;
        }

        .headertable table tr td:nth-child(1) , .billto p {
            color: #7C7C7C;
            font-family: 'Arial';
            font-size: 13px;
            font-weight: 500;
            margin: 8px 0px;
        }
        .headertable table tr td:last-child {
            color: #000;
            font-family: 'Arial';
            font-size: 13px;
            font-weight: 700;
            padding-left: 15px;
            text-align: right;
        }
        .headerlogo {
            display: flex;
            justify-content: baseline;

        }
        .headerlogo img {
            width: 85px;
        }
        .headerlogo .logotext {
            padding-left: 14px;
        }
        .logotext h1 {
            color: #000;
            font-family: 'Arial';
            font-size: 14px;
            font-weight: 600;
        }
        .logotext p {
            color: #000;
            font-family: 'Arial';
            font-size: 14px;
            font-weight: 500;
        }
        .soabilltoflex {
            display: flex;
            justify-content: space-between;
            margin-top: 12px;

        }

        .soabillto {
            width: 300px;
        }

        .soabillto p {
            color: #000;
            font-family: 'Arial';
            font-size: 12px;
            font-weight: 500;
            margin: 8px 0px;
        }
        .soabillto h6 {
            color: #000;
            font-family: 'Arial';
            font-size: 11px;
            font-weight: 500;
            text-decoration: underline;
            margin: 8px 0px;
        }
        .customerdetails {
            width: 300px;
        }
        .customerdetails p {
            color: #000;
            font-family: 'Arial';
            font-size: 11px;
            font-weight: 500;
            margin: 8px 0px;
        }
        .customerdetails h4 {
            color: #000;
            font-family: 'Arial';
            font-size: 16px;
            font-weight: 500;
            margin: 8px 0px;
        }
        .soainvoicetable {
            margin: 30px -30px;
            padding: 0px 30px
        }
        .soainvoicetable table {
            width: 100%;
            border-collapse: collapse;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            overflow: hidden;
            text-align: left;
        }

        .soainvoicetable table tr:nth-child(odd) {
            background-color: #e9effb;

        }
        .soainvoicetable table tr, .soainvoicetable table td  {
            padding: 20px 18px;
            color: #000;
            font-family: 'Arial';
            font-size: 10px;
            font-weight: 500;
        }
        .soainvoicetable table tr:nth-child(1) {
            background-color: #1E213F;
            
        }
        .soainvoicetable table tr:nth-child(1) td {
            font-weight: 700;
            color: white;
            font-size: 10px;
            font-family: 'Arial';
            padding: 20px 0px;
            text-align: left !important;
            padding-left: 15px !important;
        }
        .soainvoicetable table tr td:last-child {
            text-align: right;
        }
        .soainvoicetable table tr td:nth-child(1) {
            text-align: left !important;
        }
        .soainvoicetable table tr td:last-child {
            text-align: right !important;
        }
        .soainvoicetable table tr:nth-child(1) td:last-child {
           padding-right: 20px;
        }
        .footer {
            text-align: right !important;
            margin-top: 40px;
        }
        </style>`,
        content: ` 
        <div class="content">
        {{content}}
        <div class="headertable">
        {{#business}}
            <div class="headerlogo">
                <img src="${process.env.STATIC_FILE_API}/lsgh_logo.png">
                <div class="logotext">
                    <h1>{{business}}</h1>
                    <p>{{address}}</p>
                    <p>{{contact_no}}</p>
                </div>
            </div>
            {{/business}}
            <div class="soaheader">
                <h2>Statement of Account</h2>
            {{#header}}
                <h3>as of {{soa_date}}</h3>
            {{/header}}
            </div>
        </div>
        {{#customer}}
        <div class="soabilltoflex">
            <div class="soabillto">
                <h2>{{fullname}}</h2>
                <p>{{address}}</p>
                <h6>{{email_address}}</h6>
            </div>  
            <div class="customerdetails">
                <h4>Customer ID {{id}}</h4>
                <p>TIN no. {{tin_no}}</p>
            </div>  
        </div>
        {{/customer}}
        <div class="soainvoicetable">
            <table>
                <tbody>
                    <tr>
                        <td>Transaction Date</td>
                        <td>Due Date</td>
                        <td>Transaction No.</td>
                        <td>Transaction Type</td>
                        <td>Reference No.</td>
                        <td>Description</td>
                        <td>Amount</td>
                        <td>Balance</td>
                    </tr>
            {{#soa}}

                    <tr>
                        <td>{{transaction_date}}</td>
                        <td>{{due_date}}</td>
                        <td>{{transaction_type}}</td>
                        <td>{{transaction_no}}</td>
                        <td>{{reference_no}}</td>
                        <td>{{description}}</td>
                        <td>{{amount}}</td>
                        {{#balance}}  <td>{{.}}</td>{{/balance}}
                        {{#remaining_balance}}  <td>{{.}}</td>{{/remaining_balance}}

                    </tr>
            {{/soa}}
                </tbody>
            </table>
            <div class="footer">
            <td>
                <td>Balance Due</td>&nbsp&nbsp
                <td>{{balance_due}}</td>
            </td>
            </div>
        </div>  
    </div>
        `,
    }
    return tmp
};

module.exports = {template}

