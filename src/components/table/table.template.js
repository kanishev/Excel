const CODES = {
  A: 65,
  Z: 90
}

function createRow(info,cols){
  return `
  <div class="row">
  <div class="row-info">${info}</div>
  <div class="row-data">${cols}</div>
  </div>`
}

function createColumn(el){
  return `<div class="column">${el}</div>`
}

function createCell(){
  return ` <div class="cell" contenteditable></div>`
}

export function createTable(countRow = 15){
  const nums = CODES.Z - CODES.A + 1
  const row = []

  const cols = new Array(nums)
  .fill('')
  .map(( el, index)=>{
    el = String.fromCharCode(CODES.A + index) 
    return createColumn(el)
  })
  .join('')


  const cell = new Array(nums)
  .fill(createCell()).join('')
  

  row.push(createRow('', cols))
  
  for (let i = 0; i < countRow; i++){
    row.push(createRow(i+1,cell))
    
  }

  return row.join('')
}