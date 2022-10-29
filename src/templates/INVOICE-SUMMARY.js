// require('dotenv').config();

//HTML template
const template = () => {
    let tmp = {
        head: `
        <style>
        .invoice-box {
            font-size: 10pt;
            line-height: 15px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
        }
    
        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            // border-bottom: solid 1px #ccc;
        }
    
        .invoice-box table td {
            padding: 2px;
            vertical-align:middle;
        }
    
        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }
    
        .invoice-box table tr.top table td {
            padding-bottom: 3px;
        }
    
        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 25px;
            color: #333;
        }
    
        .invoice-box table tr.information table td {
            font-size: 10px;
            padding-bottom: 2px;
        }
    
        .invoice-box table tr.heading td {
            border-top: 2px solid black;
            border-bottom: 2px solid black;

            font-weight: bold;
            font-size:10px;
        }
    
        .invoice-box table tr.details td {
            padding-bottom: 10px;
        }
    
        .invoice-box table tr.item td{
            font-size: 10px;
        }

            
        .invoice-box table tr.item:last-child {
            border-bottom: 2px solid black;
        }
        

        .footer td{
            font-size: 10px;
        }

        
        .footer .totals{
            border-bottom: 1px solid #eee;
        }

        .top_rw {
            margin-bottom: 50px;
        }

        .signatures {
            margin-top: 30px;
        }

        .notes {
            padding-left: 15px;
            padding-top: 15px;
            font-size: 10px;
        }

        .subtotal {
            font-size: 10px;
        }
    


        .subtotal .totals {
            border-top: 3px solid #eee;
            border-bottom: 1px solid #eee;
        }


        .amount-due .totals {
            border-top: 1px solid black;
            border-bottom: 2px solid black;
        }

        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }
            .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }
        
        .rtl {
            direction: rtl;
            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
        .rtl table {
            text-align: right;
        }
        .rtl table tr td:nth-child(2) {
            text-align: left;
        }
        </style>`,
        content: ` 

        <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
        {{#header}}

		<tr class="top_rw">
		   <td  style="flex-grow: 1; text-align: center;">
		      <h2 style="margin-bottom: 0px;">INVOICE</h2>
		   </td>
		</tr>	
        <tr class="top_rw">
        <td style="height:10px;" >
         </td>
    </tr>
            <tr  class="information">
                  <td colspan="3">
                    <table>
                        <tr>
                        <td style="text-align: left; width: 30%;">
                        {{#bill_to}}                    
							<b> BIll TO: </b> <br>
                            {{#name}}&nbsp;{{.}}<br>{{/name}}
                            {{#contact}}&nbsp;{{.}}<br>{{/contact}}
                            {{#email}}&nbsp;{{.}}<br>{{/email}}
                            {{#address}}&nbsp;{{.}}{{/address}}
                            {{/bill_to}}
                            </td>

                            <td style="text-align: left; width: 30%;">
                            {{#ship_to}}                    
                            <b> Ship To: </b> <br>
                            {{#name}}&nbsp;{{.}}<br>{{/name}}
                            {{#contact}}&nbsp;{{.}}<br>{{/contact}}
                            {{#email}}&nbsp;{{.}}<br>{{/email}}
                            {{#address}}&nbsp;{{.}}{{/address}}
                               {{/ship_to}}                    
                               </td>


                               {{#invoice}}                    
                               <td style="text-align: left; width: 30%;">
                            {{#order_no}}<b>INVOICE  #:</b>  {{.}}<br>{{/order_no}}
                            {{#order_date}}<b>INVOICE DATE:</b>  {{.}}<br>{{/order_date}}
                            {{#due_date}}<b>DUE DATE : </b>{{.}}<br>{{/due_date}}
                               </td>
                               {{/invoice}}
                               </tr>
                    </table>
                </td>
            </tr>
            {{/header}}
            <table style="margin-top: 10px;" cellspacing="0px">
            <tr class="heading">
                        <td style="width: 5%; text-align:center;">
                      #
                    </td>
                <td style="width:25%; text-align:left;">
                    ITEM
                </td>
                <td style="width: 15%; text-align:center;">
                QUANTITY
            </td>
                <td style="width: 15%; text-align:center;">
                UOM
                </td>
			
                <td style="width: 15%; text-align:center;">
                    PRICE
                </td>
				 <td style="width: 25%; text-align:right;">
                   TOTAL
                </td>
            </tr>
		
      
       {{#order_items}}
            <tr class="item">
            <td style="width:5%; text-align:center;">
                {{no}}
            </td>
            <td style="width:25%; text-align:left;">
                {{name}} - <i>{{description}}</i>
             </td>
             <td style="width: 15%; text-align:center;">
             {{qty}}
             </td>
             <td style="width: 15%; text-align:center;">
             {{uom}}
             </td>
             <td style="width: 15%; text-align:center;">
                 {{price}}
             </td>
              <td style="width: 25%; text-align:right;">
                <b> {{total}}</b>
             </td>
         </tr>
         {{/order_items}}

         {{#footer}}
         <tr >
         <td style="width: 100%; margin-bottom: 15px;" class="notes" colspan="3">
        
         </td>
         <td class="subtotal" colspan="3">
         <table style="width: 100%">
            <tr>
            <td class="titles" style="width:15%; text-align:right;">
            <b>SUBTOTAL:</b>
            </td>

            <td class="totals" style="width:15%; text-align:right;">
              <b> {{gross_total}}</b>
           </td>
    
            </tr>
            {{#taxes}}
            {{#taxes}}
            <tr>
            <td style="width:15%; text-align:right;">
            <b>TAX:
            </b>
            </td>

            <td  style="width:15%;">
            <div style=" display: flex; flex-direction: row; justify-content: space-between;">
            <i style="text-align: left; width:30%"  >{{description}}</i>
            <b style="width:30%">{{total}}</b>
            <b style="width:30%"></b>
        
            </div>
             </td>
    
            </tr>
            {{/taxes}}
            {{/taxes}}

            {{#discounts}}
            {{#discounts}}
            <tr>
            <td style="width:15%; text-align:right;">
            <i>{{description}}</i>
            </td>
            <td  style="width:15% text-align:right;">

              <b style="width:30%">({{total}})</b>
           </td>
    
            </tr>
            {{/discounts}}
        
            {{/discounts}}

            {{#charges}}
            {{#charges}}
            <tr>
            <td style="width:15%; text-align:right;">
            <i>{{description}}</i>
            </td>
            <td  style="width:15%; text-align:right;">
              <b>({{total}})</b>
           </td>
    
            </tr>
            {{/charges}}
            {{/charges}}



            <tr class="amount-due">
            <td class="titles" style="width:15%; text-align:right;">
            <b>AMOUNT DUE:</b>
            </td>

            <td class="totals" style="width:15%; text-align:right;">
              <b> {{amount_due}}</b>
           </td>
            </tr>
         </table>
         </td>

      </tr>        

         {{/footer}}
         



     
			</table>
			     <table cellspacing="0px" class="notes" >
                 {{#notes}} <tr>
                 <td style="width: 50%; padding-left: 20px; padding-bottom: 10px;" colspan="3" >
                 <b>NOTES:</b>
                 &nbsp;&nbsp;{{.}}
                 </td>
                 </tr>{{/notes}}
					 <tr style="padding-top: 10px;" class="signatures">
			            <td style="width: 30%; text-align: center;">
                        <b> Authorized Signature </b>
                        <br>
                        <br>
                        ...................................
                        <br>
                        <br>
                        <br>
						</td>
                        <td style="width: 30%; text-align: center;">
                        <b> Authorized Signature </b>
                        <br>
                        <br>
                        ...................................
                        <br>
                        <br>
                        <br>
						</td>
						<td style="width: 30%; text-align: center;">
						 	<b> Authorized Signature </b>
							<br>
							<br>
							...................................
							<br>
							<br>
							<br>
						</td>
			        </tr>
			     </table>
        </table>
    </div>
        `,
    }
    return tmp
};

module.exports = {template}

