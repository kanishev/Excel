import {range} from '@/core/util'

export function shouldResize(event){
  return event.target.dataset.resize
}

export function shouldSelect(event) { 
  return event.target.dataset.check
 }

 export function matrix($target, $native){
    const target = $target.id(true) 
    const native = $native.id(true)
    const cols = range(target.col, native.col)
    const rows = range(target.row, native.row)
    return cols.reduce((arr, col)=>{
        rows.forEach(row => arr.push(`${row}:${col}`))
        return arr
    }, [])

 }

 export function nextSelecotor(key, {col, row}, par) {  
  const MIN_VALUE = 0
  switch (key){
      case 'Enter':
      case 'ArrowDown':
          row++
          break
      case 'ArrowUp':
          row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1 
          break    
      case 'ArrowLeft':
          col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1 
          break  
      case 'ArrowRight':
      case 'Tab':
          col++
          break  
 }
  return `[data-id="${row}:${col}"]`
}