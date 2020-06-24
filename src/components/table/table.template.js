  const CODES = {
    A: 65,
    Z: 90
  }

  function createRow(info,cols){
    const resize = info ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${info ? info : ''}
        ${resize}
      </div>
      <div class="row-data">${cols}</div>
    </div>
  `
  }

  function createColumn(el, index){
    return `
      <div class="column" data-type="resizable" data-col="${index}">
        ${el}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `
  }

  function createCell(row){
    return function(_, col){
    return ` <div class="cell" contenteditable data-type="${col}" data-id="${row}:${col}" data-check="cell"></div>`
  }
  }

  export function createTable(countRow = 15){
    const nums = CODES.Z - CODES.A + 1
    const row = []

    const cols = new Array(nums)
    .fill('')
    .map(( el, index)=>{
      el = String.fromCharCode(CODES.A + index) 
      return createColumn(el, index)
    })
    .join('')


    row.push(createRow('', cols))
    
    for (let i = 0; i < countRow; i++){
      
    const cell = new Array(nums)
    .fill('')
    .map(createCell(i))
    .join('')

    row.push(createRow(i+1,cell))
      
    }

    return row.join('')
  }