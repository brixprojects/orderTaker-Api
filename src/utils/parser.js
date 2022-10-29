require('dotenv').config();
const fs = require('fs');
const Mustache = require('mustache');

const SmileBlue = process.env.FILE_URL + '/smile-blue.png';
const SmileGreen = process.env.FILE_URL + '/smile-green.png';
const SmileRed = process.env.FILE_URL + '/smile-red.png';
const SmileViolet = process.env.FILE_URL + '/smile-violet.png';


const StarBlue = process.env.FILE_URL + '/star-blue.png';
const StarGreen = process.env.FILE_URL + '/star-green.png';
const StarRed = process.env.FILE_URL + '/star-red.png';
const StarViolet = process.env.FILE_URL + '/star-violet.png';

function parser(payload, htmlTemp){
    let html2 = htmlTemp;
    let pOptions = payload.page_options ? payload.page_options : payload.pageOptions ? payload.pageOptions : {};
    let tots_cols = 0;
    let options = {
        "max_cols": 0,
        "layer": 0,
        "fix_cols": [],
        "header": false,
        "footer": false,
        "fontSize": "7px", 
        "page_orientation": "portrait",
    }
    if(payload.header){
        let termTitle = payload.header.termTitle ? payload.header.termTitle : 'Quarterly'
        payload.header = {
            ...payload.header, termTitle
        }
    }

    //Create formatted data for html table content.
    if(payload && payload.content){
        let { data, columns } = payload.content;


      //Stp 1: Get max_cols configuration properties.

        if(data && columns){
    //Set Default Options
        let def_cols = columns[columns.length - 1];
        let first_cols = columns[0];

        if(def_cols.length > 20 && first_cols.length > 1 && columns.length > 1){
            options = {
                ...options,
                max_cols: 2,
                fix_cols: [0],
                layer: 0,
                ...pOptions,
            }
        } else {
                   options = { ...options, ...pOptions }
                  

        }


        //2: Populate columns with additional properties.
        let newlogic_col = columns  ? columns.map((c1, index) => {
            let total_cols = 0;
            c1.map((c2, ind) => {
             
                c2.id = `${index}-${ind}`;
                c2.colspan = c2.colspan ? c2.colspan : 1;
                c2.colStart = Number(total_cols) + 1;
                total_cols = c2.colspan ? Number(total_cols + c2.colspan) : Number(total_cols) + 1;
                c2.colEnd = total_cols;
                c2.span = c2.colspan ? c2.colspan : 1;
                c2.layer = index;
                c2.index = ind;
                
                return c2;
            });

            tots_cols = total_cols > tots_cols ? total_cols : tots_cols;
            return c1;
        }) : []

        let baseCols = options.layer !== undefined && options.layer >= 0 ? newlogic_col[options.layer] : newlogic_col[newlogic_col.length - 1];
        

        let comm_range = baseCols.filter((a, index) => {
          return options.fix_cols.find(ab => ab == index) !== undefined }) 
  

          let logic_col = newlogic_col.map((c1, index) => {
            c1.map((c2, ind) => {
                let isComm = comm_range.find(ab => (ab.colStart <= c2.colStart && ab.colEnd >= c2.colStart) && (ab.colStart <= c2.colEnd && ab.colEnd >= c2.colEnd)) !== undefined;
                c2.isCommon = isComm;
                return c2;
            });
            return c1;
        }) 



        //3: Get Regular Columns range and Get All Columns Count.
        let reg_range = baseCols.filter((a, index) => {
                return options.fix_cols.find(ab => ab == index) === undefined }); 

        //Get All Columns Count.        
        let cols_max_length = reg_range.length;

        //4: Get Max Columns per page.
        let max_cols = options.max_cols - options.fix_cols.length;
        

        //5: Divide all columns to max columns per page to get Possible columns per page.
        let cppVal = Math.round(cols_max_length / max_cols);
        let cpp = cppVal == 'Infinity' ? 1 : cppVal;
        let cppArr = [];


        //6: Map pages columns to display.
        for (let i = 0; i <= cpp; i++) {
            let rnd = i + 1;
            let start = Math.ceil(i * max_cols) + 1;
            let end =  Math.ceil(rnd == cpp ? cols_max_length : (rnd * max_cols));


            let col_range = reg_range.filter(a => {return end >= (a.index + 1) && (a.index + 1) >= start})
            
            //Get Columns Start and End per colspans
            let colStart = 0;
            let colEnd = 0;
            for(let cols of col_range){
                if(colStart > 0){
                    colStart = cols.colStart < colStart ? cols.colStart : colStart;
                } else {
                    colStart = cols.colStart
                }
                if(colEnd > 0){
                    colEnd = cols.colEnd > colEnd ? cols.colEnd : colEnd;
                } else {
                    colEnd = cols.colEnd
                }
            }


            let range = {
                start: start,
                end: end,
                page: i,
                colStart,
                colEnd,
                comm_range 
            }
            if(colStart && colEnd){
                cppArr.push(range)
            }
          }


        
          let genTable = (val, rnd) => {
      
           let table = {
                 cols: [],
                 header:   payload.header ? options.header ? payload.header : cppArr[0].page == rnd ? payload.header : false : false,
                 footer:  payload.footer ? options.footer ? payload.footer : cppArr[cppArr.length - 1].page == rnd ? payload.footer : false : false,
                 stringValue: function () {
                     if(typeof this.value === 'object'){
                     const { value, type } = this.value ? this.value : {};
                     if(!value) return "";
                     let val = type === 'Percent' ? value + "%" : value;
                     this.value = ""+val+"";
                     return function (textValue, render) {
                                 return ""+render(textValue)+"";
                     }
                     } else {
     
                     
                     return function (textValue, render) {
                                 return ""+render(textValue)+"";
                     }
                 }
                 }
                }

            let layer = 0
            for(let colRow of logic_col){

                let {colStart, colEnd } = val
               let col = colRow.filter(a => {
                    return (colStart <= a.colStart && colEnd >= a.colStart) && (colStart <= a.colEnd && colEnd >= a.colEnd) || (a.colStart >= colStart && a.colEnd <= colEnd)
                });

            let comm = logic_col[layer].filter(ab => {return ab.isCommon});
          

             if(col.length > 0){
                table.cols.push([...comm, ...col]);
             } else {
                table.cols.push(col);
             }

             layer++   

            table.rows = getRows(table.cols, data)
            }
           return table;
          }


          //7: Generate Table data and writeOutput.
          let generated = cppArr.map(a => {
         let resTable = genTable(a, a.page);  
         return resTable
    });



       let rows = data ? getRows(logic_col, data) : [];

        // writeOutput(rows)
        let newTables = max_cols > 0 ? generated : [[{
            cols: logic_col,
            rows,
            header: payload.header ? payload.header : false,
            footer: payload.footer ? payload.footer : false
            
           }]];


            payload.content = {
                ...payload.content,
                cols: logic_col,
                rows,
                tables: newTables,
                header: payload.header ? payload.header : false,
                footer: payload.footer ? payload.footer : false,
                stringValue: function () {
                    if(typeof this.value !== 'string'){
                    const { value, type } = this.value ? this.value : {};
                    if(!value) return "";
                    let val = type === 'Percent' ? value + "%" : value;
                    this.value = ""+val+"";
                    return function (textValue, render) {
                                return ""+render(textValue)+"";
                    }
                    } else {
    
                    
                    return function (textValue, render) {
                                return ""+render(textValue)+"";
                    }
                }
                }
            }

        } else {
            // options.page_orientation = 'portrait';
            payload.content = {
                header: payload.header,
                footer: payload.footer,
                ...payload.content,
            }
        }

    }


    console.log('PAYLOAD >>>>>>')

    console.log(payload)
    

    //Map Html template object and find matching object with data on payload object
    //Insert Data to html template using Mustache.
    if(!Object.keys(htmlTemp) || (Object.keys(htmlTemp) &&  Object.keys(htmlTemp).length === 0)) return html2;
    Object.keys(htmlTemp).map(el => {
  

        if(html2[el] && payload[el]){
            for (const [key, value] of Object.entries(payload[el])) {
                   if(payload[el] && htmlTemp[el]){
                       html2[el] = Mustache.render(htmlTemp[el], payload[el]);
                }
              }
    }
    })
	

    options = {...options, ...pOptions}

    options.fontSize = tots_cols > 40 ? '6px' : options.fontSize; 
    // options.page_size = tots_cols > 40 ? 'letter' : options.page_size; 



   //Formatted Html Output
    let html = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>${payload.key ? payload.key : ''}</title>
    <link rel="stylesheet" type="text/css" href="${process.env.FILE_URL}/styles.css" >
    ${html2 && html2.head ? html2.head : ''}
  
    <style>
    .smile-blue {
        background-image: url("${SmileBlue}");
        }

    .smile-red {
        background-image: url("${SmileRed}");
    }

    .smile-violet {
        background-image: url("${SmileViolet}");
    }

    .smile-green {
        background-image: url("${SmileGreen}");
    }


    .star-blue {
        background-image: url("${StarBlue}");
        }

    .star-red {
        background-image: url("${StarRed}");
    }

    .star-violet {
        background-image: url("${StarViolet}");
    }

    .star-green {
        background-image: url("${StarGreen}");
    }   
     
    


        .text-font-12 {
            font-size: ${options.fontSize ? options.fontSize : '10px'} !important;
        }
                

        .page-headers {
            display: none;
        }
        

        .page-head { 
            display: flex; 
        }



        @media print
        {
            .text-font-12 {
                font-size: ${options.fontSize ? `${(Number(String(options.fontSize).replace('px', '')) * .80)}pt` : '7.5pt'} !important;
            }

            .page-break  { 
                page-break-after:always;
            }

            @page {
                size: ${options.page_size ? options.page_size : ''}  ${options.page_orientation ? options.page_orientation : 'landscape'} ;
                padding: 0;
                // margin: 0 ;
                width: 100%;
                }

                .page-headers { 
                    display: ${options.header  ? 'flex' : 'none' };
                }

               .page-head {
                display: ${!options.header  ? 'flex' : 'none' };
            }
        }


    </style>
  </head>
   <body>
        ${html2 && html2.content ? html2.content  : ''}
    </body>
    </html>
    `
    return html
}

function getRows(columns, rows){
 
  // font and color related
  //1: Map rows values with conditions.
        //Identify if the value is array.
            //if array. get 1st value of array as the value content, 2nd value for styling.
            //if string. retain the string value as is
            //add Assets folder for Icons path.
            //Create css classes for icon rendering.
            


  let resRows = rows ? rows.map(doc => {
        let row = [];
      
      
        let pushRows = (val) => {
            if(Array.isArray(val.value)){
                let {value } = val;
                row.push({value: value[0], class: value[1], style: value[2]});
              } else {
                row.push({...val, value: typeof val.value === 'number' ? String(val.value) : val.value});
              }
        }

        // if(Array.isArray(a.field)){
        //     a.field.forEach(ab => {
        //       return row.push({ value: doc[ab], colspan: a.colspan / a.field.length, align: a.align});
        //     })
        //   } else {
        //     return row.push({ value: doc[a.field], colspan: a.colspan, align: a.align});
        //   }


        columns[columns.length - 1].map(a => {
            if(Array.isArray(a.field)){
              a.field.forEach(ab => {
                return pushRows({ value: doc[ab], colspan: a.colspan / a.field.length, field: a.field});
              });
            } else {

              return pushRows({value: doc[a.field], colspan: a.colspan, field: a.field });
            }
        })
        return  row;
    }) : [];


    return resRows
}





module.exports = { parser }
