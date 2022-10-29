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
        h2 {
            font-size: 20px;
            font-family: 'Arial';
            font-weight: 600;
        }
        .headertable {
            display: flex;
            justify-content: space-between;
        }
        .headertable table tr td:nth-child(1) , .billto p {
            color: #7C7C7C;
            font-family: 'Arial';
            font-size: 16px;
            font-weight: 500;
            margin: 8px 0px;
        }
        .headertable table tr td:last-child {
            color: #000;
            font-family: 'Arial';
            font-size: 16px;
            font-weight: 700;
            padding-left: 15px;
        }
        .headerlogo {
            display: flex;
            justify-content: baseline;
        }
        .headerlogo img {
            width: 85px;
        }
        .headerlogo .logotext {
            padding-left: 20px;
        }
        .logotext h1 {
            color: #000;
            font-family: 'Arial';
            font-size: 20px;
            font-weight: 600;
        }
        .logotext p {
            color: #000;
            font-family: 'Arial';
            font-size: 16px;
            font-weight: 500;
        }
        .billto h6 {
            color: #000;
            font-family: 'Arial';
            font-size: 16px;
            font-weight: 700;
            margin: 8px 0px;
        }
        .invoicetable {
            margin: 30px -60px;
            padding: 0px 30px
        }
        .invoicetable table {
            width: 100%;
            border-collapse: collapse;
        }
        .invoicetable table tr, .invoicetable table td  {
            padding: 20px 30px;
            color: #000;
            font-family: 'Arial';
            font-size: 12px;
            font-weight: 500;
        }
        .invoicetable table tr:nth-child(1) {
            background-color: #E4F2E9;
        }
        .invoicetable table tr:nth-child(1) td {
            font-weight: 700;
        }
        .invoicetable table tr td:last-child {
            text-align: right;
        }


        .invoicetable table tr td:nth-child(1) {
            text-align: left !important;
        }
        .totaltable {
            display: flex;
            justify-content: space-between;
            padding-right: 20px;
            
        }
        .notescontainer p {
            color: #7C7C7C;
            font-family: 'Arial';
            font-size: 16px;
            font-weight: 500;
            margin: 8px 0px;

        }
        .notescontainer h6 {
            color: #000;
            font-family: 'Arial';
            font-size: 16px;
            margin: 8px 0px;
        }
        .totaltable td {
            color: #000;
            font-family: 'Arial';
            font-size: 16px;
            padding: 6px 10px;
            font-weight: 600;
        }
        .totaltable tr:last-child td {
            font-size: 18px;
            background-color: #E4F2E9;
            padding: 10px;
        }
        .totaltable table {
            border-collapse: collapse;
        }

        .title {
            text-align: right;
        }

        .value {
            text-align: left;
        }

        .center {
            text-align: center;
        }


        </style>`,
        content: ` 
        {{#tables}}
        <div class="content">
        {{#header}}
        <h2>Invoice</h2>
        <div class="headertable">
            <table>
            {{#invoice}}
                <tr>
                    <td>Invoice no.</td>
                    <td>{{invoice_no}}</td>
                </tr>
                <tr>
                    <td>Issued on</td>
                    <td>{{issued_on}}</td>
                </tr>
                <tr>
                    <td>Due date</td>
                    <td>{{due_date}}</td>
                </tr>
                <tr>
                    <td>Ref. Transaction no.</td>
                    <td>{{ref_transaction_no}}</td>
                </tr>
                {{/invoice}}
            </table>
            {{#business}}
            <div class="headerlogo">
                <img src="${process.env.STATIC_FILE_API}/lsgh_logo.png">
                <div class="logotext">
                    <h1>{{name}}</h1>
                    <p>{{address}}</p>
                </div>
            </div>
            {{/business}}
            </div>
            {{#bill_to}}
            <div class="billto">
                <p>Bill to </p>
                <h6>{{fullname}}</h6>
                <h6>{{address}}</h6>
           </div>  
           {{/bill_to}}
        {{/header}}
        <div class="invoicetable">
        <table>
        {{#cols}}
            <tr>
            {{#.}}
                <td>{{title}}</td>
                {{/.}}
            </tr>
            {{/cols}}
            {{#rows}}
            <tr>
            {{#.}}
                <td>
                {{#stringValue}}
                   {{ value }}
                {{/stringValue}}
                </td>
            {{/.}}
            </tr>
            {{/rows}}
        </table>
    </div>
        {{#footer}}
        <div class="totaltable text-font-12">
        <div class="notescontainer">
            <p>Notes:</p>
            <h6>{{notes}}</h6>
        </div>  
        <table>
            <tr>
                <td class="title">Subtotal</td>
                <td class="value">P{{sub_total}}</td>
            </tr>
            <tr>
                <td class="title">Tax</td>
                <td class="value">P{{taxes_total}}</td>
            </tr>
            <tr>
                <td class="title">Discount</td>
                <td class="value">P{{deductibles_total}}</td>
            </tr>
            <tr>
                <td class="title">Surcharge</td>
                <td class="value">P{{surcharges_total}}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Total Amount Due</td>
                <td>P{{total_amount_due}}</td>
            </tr>
        </table>
    </div>
    {{/footer}}
    </div>
    {{/tables}}
        `,
    }
    return tmp
};

module.exports = {template}

